<?php

final class User 
{
    private $_connect_db;
    public function __construct(){
        $this->_connect_db = new Database;
    }

    /** @noinspection PhpVoidFunctionResultUsedInspection */
    public function verifyUserAccount($user_encoded_email, $user_encoded_id, $user_encoded_package_id){
        $this->_connect_db->query(/** @lang text */ 'SELECT u.user_id, u.institution_email, s.user_id AS UserSubsciberId, s.package_id FROM users u 
        INNER JOIN user_subscription s ON u.user_id=s.user_id WHERE s.package_id =:user_encoded_package_id AND u.institution_email=:user_encoded_email AND u.user_id =:user_encoded_id');
        // Bind the values
        $this->_connect_db->bind(':user_encoded_id', $user_encoded_id);
        $this->_connect_db->bind(':user_encoded_email', $user_encoded_email);
        $this->_connect_db->bind(':user_encoded_package_id', $user_encoded_package_id);
        $row = $this->_connect_db->single();
        if(!empty($row)){
            return true;
        }else{
            return false;
        }
    }
}
