<?php
namespace SecurityFilterChainBlock;

use JwtToken\JwtService;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use  Session\UserSessionManager;
use Exception\RequestException;

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

    public function __construct() {
       @$this->jwtKey = PRIVATE_KEY;
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
        $decoded = JWT::decode($token, new Key($this->jwtKey, 'HS256'));
        if (http_response_code() == 200) {
            header('HTTP/1.1 200 OK');
            $responses['data']=[
                'status'=>'202',
                'token'=>$token
            ];
            return $responses;
        }else{
            $authClass= new JwtService();
            $getJwtToken = $authClass::createTokenByUserDetails();
            $newtoken= json_decode($getJwtToken)->token; 
            header('HTTP/1.1 200 Reset Content');
            $responses['data']=[
                'status'=>'205',
                'token'=>$newtoken
            ];
            return $responses;
        }
    }
}
