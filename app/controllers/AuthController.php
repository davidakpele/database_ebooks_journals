<?php 

use Request\RequestHandler;
use Exception\RequestException;
use Session\UserSessionManager;
use Custom\Mailer;
use JwtToken\JwtService;
use Api\api;
use \SecurityFilterChainBlock\UrlFilterChain;

final class AuthController extends Controller
{
    private $repository;
    private $session;

    public function __construct() {
        $this->session= new UserSessionManager();
        $this->repository = $this->loadModel('Getting');
    }

    public function login() {
        $requestException = new RequestException();
        $requestHandler = new RequestHandler($requestException);
        if ($requestHandler->isRequestMethod('POST')) {
            $postRequest = $requestHandler->handleRequest('POST');
            $response = array();
            if (isset($postRequest['error'])) {
                echo json_encode(['error' => $postRequest['error']]);
            } else {
                $email = $requestHandler->sanitizeField($postRequest['email'], FILTER_SANITIZE_STRING);
                $password = $requestHandler->sanitizeField($postRequest['password'], FILTER_SANITIZE_STRING);
                if (empty($email)) {
                    $response= array('status'=>'error','message' =>"Email address is require.");
                    http_response_code(400);
                }else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $response = array('status' => 'error', 'message' => "Invalid email address.");
                    http_response_code(400);
                }
                if (!empty($response['status']) && $response['status'] == 'error') {
                    echo json_encode($response);
                    die();
                }
                if (empty($password)) {
                    $response= array('status'=>'error','message' =>"Password is require.");
                    http_response_code(400);
                }
                if (!empty($response['status']) && $response['status'] == 'error') {
                    echo json_encode($response);
                    die();
                }
                $getinfo = $this->repository->LoginAuth($email, $password);
                if ($getinfo == false) {
                    $response= array('status'=>'error','message' =>"Invalid credentials provided..!");
                    http_response_code(400);
                }else{
                    $authClass= new JwtService();
                    $this->session->set('userId', $getinfo->user_id);
                    $this->session->set('registered_institution_token', $getinfo->user_token); 
                    $this->session->set('packageId', $getinfo->package_id);
                    $this->session->set('session_token', $getinfo->user_token);
                    $this->session->set('institution_email', $getinfo->institution_email);

                    $id = $getinfo->user_id;
                    $email = $getinfo->institution_email;
                    $package = $getinfo->package_id;
                    $getJwtToken = $authClass::createTokenByUserDetails($id, $email, $package);
                    
                    $_SESSION['jwtauth']= json_decode($getJwtToken)->token; 
                    
                   $response= array('status'=>'success','message' =>"Login successful.",
                        'token'=>json_decode($getJwtToken)->token,
                        'acessToken'=>$getinfo->user_token,
                        'id'=>$getinfo->user_id,    
                    );
                    http_response_code(200);
                }
            }
            echo json_encode($response);
        }else if(RequestHandler::isRequestMethod('GET')) {
            // Verify if the user is authenticated
            if (!$this->session->authCheck()) {
                $data = array("page_title" => 'Login');
                $this->view("auth/login", $data);
            } else {
                redirect('index'); 
            }
        }
    }
  

    public function logout(){
        if ($this->session->destroy()) {
            $response = array("status"=>"success", "message"=>"Logout User Successful");
            echo json_encode($response);
            http_response_code(200);
        } else {
            redirect('Default'); 
        }
    }
}
