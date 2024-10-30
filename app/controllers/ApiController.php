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
use SecurityFilterChainBlock\SecurityFilterChain;
use \App\middleware\Security\AuthSecurity;

final class ApiController extends Controller
{
    private $repository;
    private $_store_sql_model_data;
    private $_delete_sql_model_data;
    private $jwtClassInt;
    private $jwtKey;
   
    public function __construct() {
       $this->repository = $this->loadModel('Getting');
       $this->_store_sql_model_data = $this->loadModel('Store');
       $this->_delete_sql_model_data = $this->loadModel('Delete');
       $this->jwtClassInt= new JwtService();
       $this->jwtKey = PRIVATE_KEY;
    }

    public function collect(){
        $requestException = new RequestException();
        $response = array();
        if ($requestException->CorsHeader()) {
            $security_check = new AuthSecurity();
            if($security_check->checkBearerToken() || $security_check->checkBearerToken() ==true){
                $authClass= new UserSessionManager();
                if($authClass->authCheck()){
                    if (RequestHandler::isRequestMethod('GET')) {
                        $jwt  = new JwtService();
                        if (isset($_GET['action']) && isset($_GET['v1'])) {
                            $action = $_GET['action'];
                            if ($action=='getAllResult'){
                                
                            }else if ($action=='package_items') {
                                $id= $_SESSION['packageId'];
                                $response['_items']= $this->repository->get_user_subcribed_subjects($id);
                                echo json_encode($response);
                                http_response_code(200);
                            }elseif ($action == 'search') {
                                $search_data = strip_tags(filter_var($_GET['query'], FILTER_SANITIZE_STRING));
                                $getSearch_request_data=$this->repository->get_search($search_data);
                                if($getSearch_request_data !=""){
                                    $data = ['data'=>$getSearch_request_data, 'inc'=>true];
                                    $this->view("components/apiHeader", $data);
                                }else {
                                    $response = array("status"=>"error","inc"=>false, "data"=>$search_data, "message"=>'No matches for '.$search_data.' ');
                                    echo json_encode($response);
                                    http_response_code(404);
                                }
                            }elseif ($action == 'subjects' && isset($_GET['filter']) && $_GET['filter']=='subjectsOnly') {
                                $data_request = strip_tags(trim(filter_var($_GET['query'], FILTER_SANITIZE_STRING)));
                                $search_post_data = $this->repository->getsubjects($data_request);
                                if($search_post_data != ""){
                                    $data = ['data'=>$search_post_data];
                                    $this->view("components/apiHeader", $data);
                                }
                            }elseif ($action == 'journals' && isset($_GET['filter']) && $_GET['filter']=='journalsOnly') {
                                $data_request = strip_tags(trim(filter_var($_GET['query'], FILTER_SANITIZE_STRING)));
                                $search_post_data = $this->repository->getjournals($data_request);
                                if($search_post_data != ""){
                                    $data = ['data'=>$search_post_data];
                                    $this->view("components/apiHeader", $data);
                                }
                            }elseif ($action == 'getCategoryListOnparent' && isset($_GET['getCategoryList']) && isset($_GET['library']) && isset($_GET['subject'])) {
                                $lib = $_GET['library'];
                                $id=strip_tags(trim(filter_var($_GET['subject'], FILTER_SANITIZE_STRING)));
                                $get_categories_List_Result = $this->repository->get_subject_info($id);
                                if (!empty($get_categories_List_Result)) {
                                    $response['data'] = $get_categories_List_Result;
                                    $response['status']= http_response_code(200);
                                }else {
                                    $response['status']= http_response_code(403);
                                }
                                echo json_encode($response);
                            }elseif ($action == 'getCategoryListOnparentChild' && isset($_GET['getbookcaseList']) && isset($_GET['library']) && isset($_GET['subject']) && isset($_GET['bookcases'])) {
                                $id = strip_tags(trim(filter_var($_GET['bookcases'], FILTER_SANITIZE_STRING)));
                                $cat_id = strip_tags(trim(filter_var($_GET['bookcases'], FILTER_SANITIZE_STRING)));
                                $get_bookshalvesinfo = $this->repository->get_bookshalves_info($cat_id, $id);
                                if (!empty($get_bookshalvesinfo)) {
                                    $response['data'] = $get_bookshalvesinfo;
                                    $response['status']= http_response_code(200);
                                }else {
                                    $response['status']= http_response_code(403);
                                }
                                echo json_encode($response);
                            }elseif (isset($_GET['getall']) && $_GET['getall'] && isset($_GET['token']) && !isset($_GET['getcraft'])) {
                                if (is_numeric($_GET['library']) && is_numeric($_GET['subject']) ) {
                                    $package= (trim((int)$_GET['library']));
                                    $subject= (trim((int)$_GET['subject']));
                                    $page = isset($_GET['page']) ? $_GET['page'] : 1;
                                    $itemsPerPage = 50;
                                    $offset = ($page - 1) * $itemsPerPage;
                                    $get_bookshalvesinfo = $this->repository->get_all_journal_by_category($package, $subject, $offset, $itemsPerPage);
                                    $activate_bookcases_sidebar = true;
                                    if (!empty($get_bookshalvesinfo)) {
                                        $response['status']=http_response_code(200);
                                        $response['_items']=$get_bookshalvesinfo;
                                        echo json_encode($response);
                                    }
                                }
                            }elseif (isset($_GET['getbookcases']) && isset($_GET['library']) && isset($_GET['subject']) && isset($_GET['bookcases']) && !isset($_GET['bookshelves'])) {
                                $package= (trim((int)$_GET['library']));
                                $subject= (trim((int)$_GET['subject']));
                                $page = isset($_GET['page']) ? $_GET['page'] : 1;
                                $itemsPerPage = 50;
                                $offset = ($page - 1) * $itemsPerPage;
                                $category_as_bookcases=$_GET['bookcases'];
                                $get_bookshalvesinfo = $this->repository->get_journal_on_bookcase($package, $subject, $category_as_bookcases, $offset, $itemsPerPage);
                                $activate_bookcases_sidebar = true;
                                if (!empty($get_bookshalvesinfo)) {
                                    $response['status']=http_response_code(200);
                                    $response['_items']=$get_bookshalvesinfo;
                                    echo json_encode($response);
                                }
                            }elseif (isset($_GET['getcraft']) && isset($_GET['bookcases']) && isset($_GET['bookshelves']) && $_GET['getcraft'] ==true && !isset($_GET['getall'])) {
                                $page = isset($_GET['page']) ? $_GET['page'] : 1;
                                $itemsPerPage = 50;
                                $package= (trim((int)$_GET['library']));
                                $subject= (trim((int)$_GET['subject']));
                                $offset = ($page - 1) * $itemsPerPage;
                                $bookshelvesid= $_GET['bookshelves'];
                                $category_as_bookcases=$_GET['bookcases'];
                                $get_bookshalvesinfo = $this->repository->get_journal_on_bookshelves($package, $subject, $category_as_bookcases, $bookshelvesid, $offset, $itemsPerPage);
                                $activate_bookcases_sidebar = true;
                                if (!empty($get_bookshalvesinfo)) {
                                    $response['status']=http_response_code(200);
                                    $response['_items']=$get_bookshalvesinfo;
                                    echo json_encode($response);
                                }
                            }else if ($action== 'getAllJournal' && isset($_GET['getall']) && $_GET['getall'] && isset($_GET['token']) && !isset($_GET['getcraft'])) {
                                if (is_numeric($_GET['library']) && is_numeric($_GET['subject']) ) {
                                    $page = isset($_GET['page']) ? $_GET['page'] : 1;
                                    $itemsPerPage = 50;
                                    $offset = ($page - 1) * $itemsPerPage;
                                    $get_bookshalvesinfo = $this->repository->get_all_journal_by_category($formattedUid,$formattedUuid, $package, $subject, $offset, $itemsPerPage);
                                    $activate_bookcases_sidebar = true;
                                    if (!empty($get_bookshalvesinfo)) {
                                        $response['status']=http_response_code(200);
                                        $response['_items']=$get_bookshalvesinfo;
                                        echo json_encode($response);
                                    }
                                }
                            }
                        }else {
                            $response = array("status"=>"error", "message"=>"Bad Request");
                            echo json_encode($response);
                            http_response_code(400);
                        }
                    }else if (RequestHandler::isRequestMethod('POST')) {
                        die("Post");
                    }else{
                        $response = array("status"=>"error", "message"=>"Method Not Allowed");
                        echo json_encode($response);
                        http_response_code(405);
                    }
                }else{
                    $requestException->error_log_auth();  
                }
            }else{
                $requestException->error_log_auth(); 
            }
        }
    }

    public function isValidUserToken(){
        $requestException = new RequestException();
        $requestHandler = new RequestHandler($requestException);
        if (isset($_SERVER['HTTP_AUTHORIZATION']) || !empty($_SERVER['HTTP_AUTHORIZATION'])) {
            try {
                $authHeader = $_SERVER['HTTP_AUTHORIZATION'];

                $jwt_post = $_SESSION['jwtauth'];

                $decoded = JWT::decode($jwt_post, new Key($this->jwtKey, 'HS256'));
                $iss = $decoded->email;
                $aud = $decoded->package;
                $iat = $decoded->subscription_token;
                $nbf = $decoded->exp;

                if ($this->repository->isVerifyAuthUser($iss, $aud, $iat)) {
                    return true;
                }else {
                    $requestException->error_log_auth();
                }
            } catch (\Exception $e) {
                $requestException->error_log_auth();
            }
        }else {
            $requestException->error_log_auth();
        }
        
    }

    public function returning_page($response){
        switch ($response['inc']) {
            case false:
                break;
            default:
                $data = ['result' => $response];
                break;
        }
        echo json_encode($response);
    }
}
