<?php
use Request\RequestHandler;
use Exception\RequestException;
use Session\UserSessionManager;
use Custom\Mailer;
use JwtToken\JwtService;
use Api\api;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
use \SecurityFilterChainBlock\UrlFilterChain;


final class FormController extends Controller
{

    private $repository;

    public function __construct() {
       @$this->repository = @$this->loadModel('Getting');
    }

    
    public function index(){
        
        if (RequestHandler::isRequestMethod('GET')) {
            $getcategories = $this->repository->_selectCategories();
            $getbookshalves = $this->repository->_selectBookshelves();
            $data=['cat'=>$getcategories, 'book'=>$getbookshalves];
            $this->view("form", $data);
        }else if (RequestHandler::isRequestMethod('POST')) {
            // 1. Validate and sanitize static fields
            $categorieid = isset($_POST['categorieid']) ? htmlspecialchars($_POST['categorieid']) : '';
            $bookshelvesid = isset($_POST['bookshelvesid']) ? htmlspecialchars($_POST['bookshelvesid']) : '';
            $journal_name = isset($_POST['journal_name']) ? htmlspecialchars($_POST['journal_name']) : '';

            // Validation (e.g., check if fields are empty)
            $errors = [];
            if (empty($categorieid)) {
                $errors['categorieid'] = "Category is required.";
            }
            if (empty($bookshelvesid)) {
                $errors['bookshelvesid'] = "Bookshelf is required.";
            }
            if (empty($journal_name)) {
                $errors['journal_name'] = "Journal name is required.";
            }

            // 2. Validate and process uploaded file (if any)
            if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
                $photo = $_FILES['file'];
                $name = $photo['name'];
                $nameArray = explode('.', $name);
                $fileExt = strtolower(end($nameArray)); // Get the file extension and convert it to lowercase

                // Allowed file extensions
                $allowedExts = ['png', 'jpeg', 'jpg', 'svg'];
                
                // Allowed MIME types
                $allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];

                // MIME type from the uploaded file
                $imgType = $photo['type'];

                // Temp location of the file
                $tmpLoc = $photo['tmp_name'];   
                $fileSize = $photo['size']; 

                // Form data
                $bookshelvesid = $_POST['bookshelvesid'];
                $categorieid = $_POST['categorieid'];
                $journal_name = $_POST['journal_name'];

                // Check if required fields are empty
                if (empty($bookshelvesid) || empty($categorieid) || empty($journal_name)) {
                    echo "All fields are required.";
                    return false;
                }

                // Check if the file type is allowed
                if (!in_array($fileExt, $allowedExts) || !in_array($imgType, $allowedMimeTypes)) {
                    echo "Only PNG, JPEG, JPG, and SVG files are allowed.";
                    return false;
                }

                // Ensure the file size is within the limit (example: 50MB)
                if ($fileSize > 50000000) {
                    echo "Your file is too large. Maximum file size is 50MB.";
                    return false;
                }

                // Define the upload path
                $uploadName = uniqid() . '.' . $fileExt;
                $uploadPath = 'assets/images/journals/' . trim(filter_var($bookshelvesid, FILTER_SANITIZE_STRING)) . '/' . $uploadName; 
                $dbpath = 'assets/images/journals/' . trim(filter_var($bookshelvesid, FILTER_SANITIZE_STRING)) . '/' . $uploadName;
                $folder = 'assets/images/journals/' . trim(filter_var($bookshelvesid, FILTER_SANITIZE_STRING));

                // Check if the folder exists, if not, create it
                if (!file_exists($folder)) {
                    mkdir($folder, 0777, true);
                }
                move_uploaded_file($tmpLoc,$dbpath);
                
            } else {
                $errors['file'] = "File upload failed.";
            }

            // 3. Process dynamic issues and articles
            $issues = [];
            $issueIndex = 0;
            while (isset($_POST["issueDate$issueIndex"])) {
                $issue = [
                    'date' => htmlspecialchars($_POST["issueDate$issueIndex"]),
                    'title' => htmlspecialchars($_POST["issueTitle$issueIndex"]),
                    'volume' => htmlspecialchars($_POST["issueVolume$issueIndex"]),
                    'articles' => []
                ];

                // Process articles within each issue
                $articleIndex = 0;
                while (isset($_POST["author{$issueIndex}-$articleIndex"])) {
                    $article = [
                        'author' => htmlspecialchars($_POST["author{$issueIndex}-$articleIndex"]),
                        'apiWebInContextLink' => htmlspecialchars($_POST["apiWebInContextLink{$issueIndex}-$articleIndex"]),
                        'date' => htmlspecialchars($_POST["date{$issueIndex}-$articleIndex"]),
                        'openAccess' => htmlspecialchars($_POST["openAccess{$issueIndex}-$articleIndex"]),
                        'title' => htmlspecialchars($_POST["title{$issueIndex}-$articleIndex"])
                    ];
                    $issue['articles'][] = $article;
                    $articleIndex++;
                }

                $issues[] = $issue;
                $issueIndex++;
            }

            // 4. Final validation check and response
            if (empty($errors)) {
                if ($this->repository->save_journal($categorieid, $bookshelvesid, $journal_name, $issues, $imgType, $uploadPath)) {
                    echo 'Uploaded Successfully';
                } 
            } else {
                // Return validation errors
                echo "There were errors in your form:";
                print_r($errors);
            }
        }
        

        
        //     if (is_uploaded_file($_FILES['file']['tmp_name']) && empty($_POST['journal_name'])){
        //         if((isset($_FILES['file']['name']) != '')){
               
        //             $photo = $_FILES['file'];
        //             $name = $photo['name'];
        //             $nameArray = explode('.', $name);
        //             $fileName = $nameArray[0];
        //             $fileExt = $nameArray[1];
        //             $mime = explode('/', $photo['type']);
        //             $mimeType = $mime[0];
        //             $imgType = $photo['type'];
        //             $mimeExt = $mime[1];
        //             $tmpLoc = $photo['tmp_name'];   
        //             $fileSize = $photo['size']; 
        //             //to specify what file type we want to upload, i.e [png, jpeg, jpg, svg]
        //             $bookshelvesid=$_POST['bookshelvesid'];
        //             $categorieid=$_POST['categorieid'];
        //             $journal_name=$_POST['journal_name'];
        //             if (empty($bookshelvesid) || empty($categorieid) || empty($journal_name)) {
        //                 echo "All feilds requireds.*";
        //                 return false;
        //             }
        //             $uploadName = uniqid().'.'.$fileExt;
        //             $uploadPath = 'assets/images/journals/'.trim(filter_var($_POST['bookshelvesid'], FILTER_SANITIZE_STRING)).'/'.$uploadName; 
        //             $dbpath     = 'assets/images/journals/'.trim(filter_var($_POST['bookshelvesid'], FILTER_SANITIZE_STRING)).'/'.$uploadName;
        //             $folder = 'assets/images/journals/'.trim(filter_var($_POST['bookshelvesid'], FILTER_SANITIZE_STRING));
        //             if ($fileSize > 90000000000000) {
        //                 $response['status'] = 300;
        //                 $response['errormsg'] = '<b>ERROR:</b>Your file was larger than 50kb in file size.';
        //             }elseif ($fileSize < 90000000000000 ) {
        //                 if(!file_exists($folder)){
        //                     mkdir($folder,077,true);
        //                 }
        //                 move_uploaded_file($tmpLoc,$dbpath);
        //                 if ($this->repository->__saveLogoChanges($bookshelvesid,$categorieid,$journal_name,$imgType,$uploadPath)) {
        //                     echo 'Uploaded Successfully';
        //                 } 
        //             }
        //         }
        // }else{
        //     echo "Please provide journal name or description and select a valid image.";
        //     return false;
        // }
        
        
    
    }
}
