<?php

namespace Session;

class UserSessionManager{
    public static function authCheck():bool{
        if (isset($_SESSION['registered_institution_token']) && isset($_SESSION['userId']) && isset($_SESSION['packageId'])) {
            return true;
        } else {
            return false;
        }
    }

    
    public function set($key, $value){
        $_SESSION[$key] = $value;
    }

    public function destroy():bool {
        if (session_status() == PHP_SESSION_ACTIVE) {
            session_unset();
            session_destroy();
            return true;
        }else{
            return false;
        }
    }


}