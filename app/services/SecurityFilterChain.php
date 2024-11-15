<?php
namespace SecurityFilterChainBlock;

use JwtToken\JwtService;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use  Session\UserSessionManager;
use Exception\RequestException;
use App\Helpers\Model\Repository\Injection\Repository;

/**
 *
 * @return boolean 
 * 
 */


final class SecurityFilterChain 
{
    private $param;
    private $msg_block;
    private $responses;
    private $jwtKey;
    private $UserRepository;

    public function __construct() {
        @$this->jwtKey = PRIVATE_KEY;
        $this->UserRepository = Repository::loadModel('User');

        if (!$this->UserRepository) {
            // Handle error if model could not be loaded
            throw new \Exception("Repository class 'User Repository' could not be loaded.");
        }
    }   

    public function protectedChainblock(){
        // check if user is authenticated
        if (!$this->isAuthenticated()) {
            header('HTTP/1.1 401 Unauthorized');
            http_response_code(401);
            $responses = [];
            $responses['messsage']='Unauthorized Access.';
        }else{
            return $this->isValidToken();
        }
    }

    public function isAuthenticated(){
        try {
           $isLog = new UserSessionManager();
            if ($isLog->authCheck()) {
                return true;
            }else{
                $error = new RequestException();
                $error ->error_log_auth();
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function isValidToken(){
        // check for Bearer token in the header
        $headers = apache_request_headers();
        if (isset($_SERVER['HTTP_AUTHORIZATION']) || !empty($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
            $token = str_replace('Bearer ', '', $authHeader); 
            return $this->verifyToken($token);
        }elseif(isset($_SESSION['jwtauth'])){
            $token= $_SESSION['jwtauth'];
            return $this->verifyToken($token);
        }else{
            if (!isset($headers['Authorization']) || !isValidToken($headers['Authorization'])) {
                http_response_code(403);
                $responses['messsage']='Forbidden Access.';
            }
            return $responses;
        }
         
   
    }

    public function verifyToken($token){
        try {
            $tokenClass= new JwtService();
            $jwt_decoded_token = $tokenClass::decodeToken($token);
            if (isset($jwt_decoded_token['data']['decoded']['message']) || array_key_exists('message', $jwt_decoded_token['data']['decoded'])) {
                header('HTTP/1.1 401 Unauthorized');
                $error_response = array(
                    "status" => http_response_code(401),
                    "title" => "Authentication Error",
                    "details" => "Invalid Token: " . $jwt_decoded_token['data']['decoded']['message'],
                );
                echo json_encode($error_response, JSON_PRETTY_PRINT);
                exit();
            }else{
                $user_encoded_email = $jwt_decoded_token['data']['decoded']['payload']->sub;
                $user_encoded_id = $jwt_decoded_token['data']['decoded']['payload']->group->id;
                $user_encoded_package_id = $jwt_decoded_token['data']['decoded']['payload']->group->package;
                
                $verifyUser = $this->UserRepository->verifyUserAccount($user_encoded_email, $user_encoded_id, $user_encoded_package_id);
                if ($verifyUser) {
                    return true; // Token is valid, user is verified
                } else {
                    header('HTTP/1.1 401 Unauthorized');
                    $error_response = array(
                        "status" => http_response_code(401),
                        "title" => "Authentication Error",
                        "details" => "Unauthorized",
                    );
                    echo json_encode($error_response, JSON_PRETTY_PRINT);
                    exit();
                }
            }
        } catch (Exception $e) {
            // If any error occurs (e.g., JWT signature verification fails), return a 401 error
            header('HTTP/1.1 401 Unauthorized');
            $error_response = array(
                "status" => http_response_code(401),
                "title" => "Authentication Error",
                "details" => "Invalid Token: " . $e->getMessage(),
            );
            echo json_encode($error_response, JSON_PRETTY_PRINT);
            exit();
        }
    }
}
