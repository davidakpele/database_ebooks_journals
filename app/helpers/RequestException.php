<?php

namespace Exception;

final class RequestException {
    
    public function validata_api_request_header(){
        header("Access-Control-Allow-Methods: *");
        header("Access-Control-Allow-Headers: *");
        header("Content-Type: application/json");
        header("Access-Control-Max-Age: 3600");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

        if ($_SERVER['REQUEST_METHOD']=='OPTIONS') {
            header('HTTP/1.1 401 Unauthorized');
            error_log_auth();
        }else{
            return true;
        }
    }


    public function error_log_auth(){
        header('HTTP/1.1 401 Unauthorized');
        $response=
        [ 
            "status"=> http_response_code(401),
            "title"=> "Authentication Error",
            "details"=> "Something went wrong with authentication to your SkyBase library.",
            "code"=> "generic_authentication_error"
        ];
        echo json_encode($response, JSON_PRETTY_PRINT);
    }


    public function CorsHeader(){
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }

        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

            exit(0);
        }
        return true;
    }

    
}
