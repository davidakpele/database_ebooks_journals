<?php

class Config {
    private $envFile;
    private $protocol;

    public function __construct() {
        $this->envFile = __DIR__ . DIRECTORY_SEPARATOR . '../.env';
        $this->protocol = $this->detectProtocol();
        $this->loadEnv();
        $this->setDatabaseVariables();
        $this->setAppVariables();
        $this->setPaths();
        $this->setErrorReporting();
    }

    // Detect HTTP or HTTPS protocol
    private function detectProtocol() {
        return isset($_SERVER["HTTPS"]) ? 'https' : 'http';
    }

    // Load the environment variables from the .env file
    private function loadEnv() {
        if (file_exists($this->envFile)) {
            $envVariables = parse_ini_file($this->envFile);
            foreach ($envVariables as $key => $value) {
                putenv("$key=$value");
                $_ENV[$key] = $value;
                $_SERVER[$key] = $value;
            }
        } else {
            die('.env file not found.');
        }
    }

    // Set database variables using environment variables
    private function setDatabaseVariables() {
        define('DB_TYPE', getenv('DB_TYPE'));
        define('DB_NAME', getenv('DB_NAME')); 
        define('DB_USER', getenv('DB_USER'));
        define('DB_PASS', getenv('DB_PASS'));
        define('DB_HOST', getenv('DB_HOST'));
        define('DB_CHARSET', getenv('DB_CHARSET'));
    }

    // Set general application constants like title, developer name, etc.
    private function setAppVariables() {
        define('PROTOCAL', $this->protocol); 
        define('PRIVATE_KEY', getenv('API_SECURITY_KEY'));
    }

    // Set the ROOT and ASSETS paths
    private function setPaths() {
        $path = str_replace("\\", "/", $this->protocol . "://" . $_SERVER['SERVER_NAME'] . __DIR__ . DIRECTORY_SEPARATOR);
        $path = str_replace($_SERVER['DOCUMENT_ROOT'], "", $path);
        define('ROOT', str_replace("app/config/", "", $path));
        define('ASSETS', str_replace("app/config", "public/assets", $path));
        define("APP_TITLE", getenv('App_Name'));
    }

    // Set error reporting based on the DEBUG constant
    private function setErrorReporting() {
        define('DEBUG', true); 
        
        if (DEBUG) {
            ini_set("display_errors", 1);
        } else {
            ini_set("display_errors", 0);
        }
    }
}
