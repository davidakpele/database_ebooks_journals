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

    private $GettingRepository;
    private $StoreRepository;

    public function __construct() {
       $this->StoreRepository = @$this->loadModel('Store');
       $this->GettingRepository = @$this->loadModel('Getting');
    }

    
    public function index(){
        if (RequestHandler::isRequestMethod('GET')) {
            $getcategories = $this->GettingRepository->_selectCategories();
            $getbookshalves = $this->GettingRepository->_selectBookshelves();
            $data=['cat'=>$getcategories, 'book'=>$getbookshalves];
            $this->view("form", $data);
        }else if(RequestHandler::isRequestMethod('POST')) {
            // Decode the JSON data from the 'data' field
            $jsonData = json_decode($_POST['data'], true);
            $issues = $jsonData['issues'];

            // Step 1: Validate and sanitize static fields
            $categorieid = isset($_POST['categorieid']) ? htmlspecialchars($_POST['categorieid']) : '';
            $bookshelvesid = isset($_POST['bookshelvesid']) ? htmlspecialchars($_POST['bookshelvesid']) : '';
            $journal_name = isset($_POST['journal_name']) ? htmlspecialchars($_POST['journal_name']) : '';
            
            // Check required fields
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

            // Step 2: Handle file upload validation and saving
            if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
                $photo = $_FILES['file'];
                $nameArray = explode('.', $photo['name']);
                $fileExt = strtolower(end($nameArray));
                $allowedExts = ['png', 'jpeg', 'jpg', 'svg'];
                $allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
                $imgType = $photo['type'];
                $tmpLoc = $photo['tmp_name'];
                $fileSize = $photo['size'];

                // Validate file type and size
                if (!in_array($fileExt, $allowedExts) || !in_array($imgType, $allowedMimeTypes)) {
                    $errors['file'] = "Only PNG, JPEG, JPG, and SVG files are allowed.";
                }
                if ($fileSize > 50000000) {
                    $errors['file'] = "File size exceeds the 50MB limit.";
                }

                // Define upload path if no errors
                if (empty($errors['file'])) {
                    $uploadName = uniqid() . '.' . $fileExt;
                    $folder = 'assets/images/journals/' . filter_var($bookshelvesid, FILTER_SANITIZE_STRING);
                    $uploadPath = $folder . '/' . $uploadName;

                    // Create folder if it doesn't exist
                    if (!file_exists($folder)) {
                        mkdir($folder, 0777, true);
                    }
                }
            } else {
                $errors['file'] = "File upload failed.";
            }

            // Step 3: Process dynamic issues and articles (using the decoded JSON)
            $issueIndex = 0;
            while (isset($jsonData["issueDate$issueIndex"])) {
                $issue = [
                    'date' => filter_var($jsonData["issueDate$issueIndex"], FILTER_SANITIZE_STRING),
                    'title' => filter_var($jsonData["issueTitle$issueIndex"], FILTER_SANITIZE_STRING),
                    'volume' => filter_var($jsonData["issueVolume$issueIndex"], FILTER_SANITIZE_STRING),
                    'articles' => []
                ];

                // Process articles within each issue
                $articleIndex = 0;
                while (isset($jsonData["author{$issueIndex}-$articleIndex"])) {
                    $article = [
                        'author' => filter_var($jsonData["author{$issueIndex}-$articleIndex"], FILTER_SANITIZE_STRING),
                        'apiWebInContextLink' => filter_var($jsonData["apiWebInContextLink{$issueIndex}-$articleIndex"], FILTER_SANITIZE_URL),
                        'date' => filter_var($jsonData["date{$issueIndex}-$articleIndex"], FILTER_SANITIZE_STRING),
                        'openAccess' => filter_var($jsonData["openAccess{$issueIndex}-$articleIndex"], FILTER_VALIDATE_BOOLEAN),
                        'title' => filter_var($jsonData["title{$issueIndex}-$articleIndex"], FILTER_SANITIZE_STRING)
                    ];
                    $issue['articles'][] = $article;
                    $articleIndex++;
                }
                $issues[] = $issue;
                $issueIndex++;
            }

            // Step 4: Final validation check and save data if no errors
            if (empty($errors)) {
                // Save data to repository
                if ($this->StoreRepository->save_journal($categorieid, $bookshelvesid, $journal_name, $issues, $imgType, $uploadPath)) {
                    echo 'Uploaded Successfully'; 

                    // Move the uploaded file to its destination 
                    move_uploaded_file($tmpLoc, $uploadPath);
                } else {
                    echo 'Error saving journal data.';
                }
            } else {
                // Output validation errors
                echo "There were errors in your form:";
                print_r($errors);
            }
        }


    }
}
