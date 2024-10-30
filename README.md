# CDLPHUB Assignment Code Structure
##Open Source MVC Framework Project: Automated Email Notification System with Cron Jobs

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
## Table of Contents
* **Introduction**
* **Quick Start**
* **Folder Structure**
* **Core Components**
* **Validation**
* **Template Rendering**
* **Controller, View and model**
* **Challenges Faced**
* **Contributing**
## Introduction

> MVCFramework is an open-source MVC framework built in PHP. This framework includes robust form handling and validation mechanisms.

## Quick Start

1. Clone the repo: git clone **https://github.com/davidakpele/emailschedule**
2. Install dependencies using Composer: **composer install**
3. Set up your web server to point to the **public **directory.

## Folder Structure
```
/assignment/:.
├───app
│   ├───auth
│   ├───config
│   ├───controllers
│   ├───db
│   ├───helpers
│   ├───models
│   └───views
│       └───auth
├───logs
├───public
│   └───assets
│       ├───css
│       ├───fontawesome
│       │   ├───css
│       │   ├───js
│       │   ├───less
│       │   ├───metadata
│       │   ├───scss
│       │   ├───sprites
│       │   ├───svgs
│       │   │   ├───brands       
│       │   │   ├───regular
│       │   │   └───solid  
│       │   └───webfonts
│       ├───fonts
│       │   └───icomoon
│       │       ├───demo-files
│       │       └───fonts
│       ├───images
│       └───js
└───vendor
    ├───composer
    └───phpmailer
        └───phpmailer
            ├───.github
            │   ├───actions
            │   │   └───build-docs
            │   ├───ISSUE_TEMPLATE
            │   └───workflows
            ├───.phan
            ├───docs
            ├───examples
            │   └───images
            ├───language
            ├───src
            └───test
                ├───Fixtures
                │   ├───FileIsAccessibleTest
                │   └───LocalizationTest
                ├───Language
                ├───OAuth
                ├───PHPMailer
                ├───POP3
                └───Security
```
## Core Components
**app.php**
```php

<?php
class Application {
    // Default controller and method
    protected $controller = 'HomeController'; 
    protected $method = 'index'; 
    protected $params = []; // Parameters for methods

    // Constructor method that initializes the application
    public function __construct() {
        // Parse the URL to get controller, method, and parameters
        $this->parseUrl();

        // Check if the controller file exists
        if (file_exists('../app/controllers/' . $this->controller . '.php')) {
            // Include the controller file
            require_once '../app/controllers/' . $this->controller . '.php';
            // Instantiate the controller
            $this->controller = new $this->controller();
        } else {
            // redirect users to home page
            redirect('index');
        }

        // Check if the method exists in the controller
        if (method_exists($this->controller, $this->method)) {
            // Call the method with parameters
            call_user_func_array([$this->controller, $this->method], $this->params);
        } else {
            // redirect users to home page
            redirect('index');
        }
    }

    // Method to parse the URL
    public function parseUrl() {
        // Check if 'url' is set in the GET request
        if (isset($_GET['url'])) {
            // Trim the trailing slash
            $url = rtrim($_GET['url'], '/');
            // Sanitize the URL
            $url = filter_var($url, FILTER_SANITIZE_URL);
            // Split the URL into an array
            $url = explode('/', $url);

            // Set the controller from the URL, or default to 'HomeController'
            $this->controller = isset($url[0]) ? ucfirst($url[0]) . 'Controller' : 'HomeController';
            // Set the method from the URL, or default to 'index'
            $this->method = isset($url[1]) ? $url[1] : 'index';
            // Remove the controller and method from the URL array
            unset($url[0], $url[1]);

            // Rebase the array and assign remaining values as parameters
            $this->params = $url ? array_values($url) : [];
        }
    }
}

```	
## Controller.php
```php
<?php 
class Controller
{
    // Method to load a view
    protected function view($view, $data = []){
        // Check if the view file exists
        if(file_exists("../app/views/". $view .".php")) {
            // Include the view file
            include "../app/views/". $view .".php";
        } else {
            // If the view file doesn't exist, include an error view
            include "../app/views/DeniedAccess.php";
        }
    } 

    // Method to load a model
    protected function loadModel($model){
        // Check if the model file exists
        if(file_exists("../app/models/". $model .".php")) {
            // Include the model file
            include "../app/models/". $model .".php";
            // Instantiate and return the model object
            return $model = new $model();
        }
        // If the model file doesn't exist, return false
        return false;
    }
}
```
## SchedulerController Class

```php
<?php
use Request\RequestHandler;
use Exception\RequestException;
use Session\UserSessionManager;
use Custom\Mailer;

class SchedulerController extends Controller
{
    private $repository;
    private $schedule;
    private $session;

    public function __construct() {
       $this->session= new UserSessionManager();
       $this->repository = $this->loadModel('User');
       $this->schedule = $this->loadModel('Schedule');
    }

    public function send() {
        $response = [];
        $pendingEmails = $this->schedule->getPendingEmails();
        $requestException = new RequestException();
        
        $requestHandler = new RequestHandler($requestException);

        // Handle POST request
        if ($requestHandler->isRequestMethod('POST')) {
            foreach ($pendingEmails as $email) {
                $mail = new Mailer();
                $emailId = $email['id'];
                if ($mail->sendEmail($email['recipient_email'], $email['subject'], $email['body'])) {
                    // Optional 
                    $logDir = 'C:/xampp/htdocs/assignment/logs/';
                    $logFile = $logDir . 'task_log.txt';

                    // Check if the directory exists, if not create it
                    if (!is_dir($logDir)) {
                        mkdir($logDir, 0777, true); 
                    }

                    // Log the date and time to task_log.txt
                    file_put_contents($logFile, "Task triggered at: " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);
                    // Mark the email as 'sent' if successful
                    $this->schedule->updateEmailStatus($emailId, 'sent');
                    $response= array('status'=>'success','message' =>"Email sent successfully.");
                    http_response_code(200);
                } else {
                    // Retry logic for failed emails
                    $attempts = $email['attempts'] + 1;
                    if ($attempts >= 3) {
                        $this->schedule->updateEmailStatus($emailId, 'failed');
                        $response= array('status'=>'error','message' =>"Fail to send Email.");
                        http_response_code(400);
                    } else {
                        // Increment the attempts count
                        $this->schedule->updateAttempt($attempts, $emailId);
                    }
                    
                }
            }
            echo json_encode($response);
        }else{
            $response= array('status'=>'error','message' =>"Method not allowed.");
            http_response_code(405);
        }
    }
}

```
## Controller and Rendering View

### HomeController 

- To display Default or Home page

```php

<?php

use Request\RequestHandler;
use Exception\RequestException;
use Session\UserSessionManager;
use Custom\Mailer;

final class HomeController extends Controller
{
    private $repository;
    private $schedule;
    private $session;

    public function __construct() {
       $this->session= new UserSessionManager();
       $this->repository = $this->loadModel('User');
       $this->schedule = $this->loadModel('Schedule');
    }

    public function index(){
        $requestException = new RequestException();
        $authClass= new UserSessionManager;
        $requestHandler = new RequestHandler($requestException);

        // Handle POST request
        if ($requestHandler->isRequestMethod('POST')) {
            $postRequest = $requestHandler->handleRequest('POST');
            $response = array();
            if (isset($postRequest['error'])) {
                // Handle CORS or validation errors
                echo json_encode(['error' => $postRequest['error']]);
            } else {
                // Sanitize input fields
                $recipientEmail = $requestHandler->sanitizeField($postRequest['recipient']);
                $subject = $requestHandler->sanitizeField($postRequest['subject'], FILTER_SANITIZE_STRING);
                $body = $requestHandler->sanitizeField($postRequest['body'], FILTER_SANITIZE_STRING);
                $schedule_time = $requestHandler->sanitizeField($postRequest['scheduleTime']);
                
                if (empty($recipientEmail) || $recipientEmail ==null) {
                    $response= array('status'=>'error','message' =>"Email address is require.");
                    http_response_code(400);
                }else if (!filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)) {
                    $response = array('status' => 'error', 'message' => "Invalid email address.");
                    http_response_code(400);
                }
                
                if (empty($subject) || $subject ==null) {
                    $response= array('status'=>'error','message' =>"Subject is require.");
                    http_response_code(400);
                }
                
                if (empty($body) || $body ==null) {
                    $response= array('status'=>'error','message' =>"Email body is require.");
                    http_response_code(400);
                }
                
                if (empty($schedule_time) || $schedule_time ==null) {
                    $response= array('status'=>'error','message' =>"Schedule time is require.");
                    http_response_code(400);
                }
                if (!empty($recipientEmail) && !empty($subject) && !empty($body) && !empty($schedule_time)) {
                    $user_id = $_SESSION['id'];
                    if ($this->schedule->createSchedule($recipientEmail, $subject, $body, $schedule_time, $user_id)) {
                        $response= array('status'=>'success','message' =>"Email scheduled successfully!");
                        http_response_code(200);
                    }else{
                        $response= array('status'=>'error','message' =>"Error scheduling email.");
                        http_response_code(400);
                    }
                }
               echo json_encode($response);
            }
        } else {
           if (!$authClass->authCheck()) {
                redirect('auth/login');
            }else{
                $data = array(
                    'page_title'=>'Default',
                    'session'=>true,
                    'username'=>(isset($_SESSION['username'])?$_SESSION['username']:''),
                    'userId'=>(isset($_SESSION['id'])?$_SESSION['id']:''),
                );
                $this->view("index", $data); 
            } 
        }
        
              
    }

}
```

## AuthController 

- responsible to rendering view and handling register validation & authentications

```php
<?php 

use Request\RequestHandler;
use Exception\RequestException;
use Session\UserSessionManager;
use Custom\Mailer;

final class AuthController extends Controller
{
    private $repository;
    private $session;

    public function __construct() {
       $this->session= new UserSessionManager();
       $this->repository = $this->loadModel('User');
    }

    public function login() {
        // Create an instance of RequestException
        $requestException = new RequestException();

        // Handle POST request
        if (RequestHandler::isRequestMethod('POST')) {
            
            // Handle CORS Headers
            if ($requestException->CorsHeader()) {
                $response = array();
                // Validate API request headers
                if (!$requestException->validata_api_request_header()) {
                    // Log error if headers are invalid
                    $response['error'] = $requestException->error_log_auth();
                } else {
                    // Process the login
                    $jsonString = file_get_contents("php://input");
                    $postRequest = json_decode($jsonString, true);
                    
                    $username = strip_tags(trim(filter_var($postRequest["username"], FILTER_SANITIZE_STRING)));
                    $password = strip_tags(trim(filter_var($postRequest["password"], FILTER_SANITIZE_STRING)));
                    if (empty($username)) {
                        $response= array('status'=>'error','message' =>"Username is require.");
                        http_response_code(400);
                    }

                    if (empty($password)) {
                        $response= array('status'=>'error','message' =>"Password is require.");
                        http_response_code(400);
                    }

                    if (!empty($username) && !empty($password)) {
                        $user = $this->repository->process_login($username, $password);
                        // Check if login was successful
                        if (!$user) {
                            $response= array('status'=>'error','message' =>"Invalid credentials provided..!");
                            http_response_code(400);
                        } else {

                            $this->session->set('id', $user->id);
                            $this->session->set('username', $user->username); 
                            $this->session->set('email', $user->email);
                                
                            $response['message'] = 'Login successful!';
                            http_response_code(200);
                        }
                    }
                }
                echo json_encode($response);
            }
        }

        // Handle GET request
        elseif (RequestHandler::isRequestMethod('GET')) {
            // Verify if the user is authenticated
            if (!$this->session->authCheck()) {
                $data = array("page_title" => 'Login');
                $this->view("auth/login", $data);
            } else {
                redirect('index'); 
            }
        }
    }

    public function register(){
        $requestException = new RequestException();
        if (RequestHandler::isRequestMethod('POST')) {
            if ($requestException->CorsHeader()) {
                $response = array();
                if (!$requestException->validata_api_request_header()) {
                    $response['error'] = $requestException->error_log_auth();
                } else {
                    $jsonString = file_get_contents("php://input");
                    $postRequest = json_decode($jsonString, true);
                    
                    $email = strip_tags(trim(filter_var($postRequest["email"], FILTER_VALIDATE_EMAIL)));
                    $username = strip_tags(trim(filter_var($postRequest["username"], FILTER_SANITIZE_STRING)));
                    $mobile = strip_tags(trim(filter_var($postRequest["mobile"], FILTER_SANITIZE_STRING)));
                    $password = strip_tags(trim(filter_var($postRequest["password"], FILTER_SANITIZE_STRING)));
                    $mobile = strip_tags(trim(filter_var($postRequest["mobile"], FILTER_SANITIZE_STRING)));
                    
                    if (empty($email) || $email ==null) {
                        $response= array('status'=>'error','message' =>"Email address is require.");
                        http_response_code(400);
                    }else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                        $response = array('status' => 'error', 'message' => "Invalid email address.");
                        http_response_code(400);
                    }else if($this->repository->verifyEmail($email)){
                        $response= array('status'=>'error','message' =>"Email already been useed by another user.!");
                        http_response_code(400); 
                    }
                     // Stop further execution if there's an error with the email
                    if (!empty($response['status']) && $response['status'] == 'error') {
                        echo json_encode($response);
                        die();
                    }
                    if (empty($username) || $username ==null) {
                        $response= array('status'=>'error','message' =>"Username is require.");
                        http_response_code(400);
                    }else if($this->repository->verifyUsername($username)){
                        $response= array('status'=>'error','message' =>"Username already been useed by another user.!");
                        http_response_code(400); 
                    }

                    // Stop further execution if there's an error with the username
                    if (!empty($response['status']) && $response['status'] == 'error') {
                        echo json_encode($response);
                        die(); 
                    }

                    if (empty($mobile) || $mobile ==null) {
                        $response= array('status'=>'error','message' =>"Mobiel number is require.");
                        http_response_code(400);
                    }

                    if (empty($password) || $password ==null) {
                        $response= array('status'=>'error','message' =>"Password is require.");
                        http_response_code(400);
                    }
                    else{
                        if (!empty($email) && !empty($username) && !empty($password)) {
                            $hash_password = password_hash($password, PASSWORD_ARGON2ID);
                            if (!$this->repository->process_registration($email, $username, $mobile, $hash_password)) {
                                $response= array('status'=>'success','message' =>"Something went wrong.");
                                http_response_code(400);
                            } else {
                                $response['message'] = 'Account successfully created.!';
                                http_response_code(200);
                            }
                        }
                    }
                }
                echo json_encode($response);
            }
        }

        // Handle GET request
        elseif (RequestHandler::isRequestMethod('GET')) {
            // Verify if the user is authenticated
            if (!$this->session->authCheck()) {
                $data = array("page_title" => 'Login');
                $this->view("auth/register", $data);
            } else {
                redirect('Default');  // Redirect to some page if already authenticated
            }
        }
    }
  
    public function logout(){
        if ($this->session->destroy()) {
            redirect('auth/login'); 
        } else {
            redirect('Default'); 
        }
    }
}

```

## Challenges Faced
- **Controller Setup:** Developing a simple and reusable controllers from config/app.php file.
- **Form Validation:** Developing a robust validation mechanism that was both flexible and reusable posed a significant challenge.
- **URL Parsing:** Ensuring accurate and secure URL parsing to handle controller and method routing without exposing vulnerabilities.

#Please NOTE
### .env file include **Configuration settings**
```env
> DB_TYPE= mysql
> DB_NAME=cronjobs
> DB_HOST=localhost
> DB_USER=root
> DB_PASS=''
> DB_CHARSET=binary
> API_SECURITY_KEY= 
```
- A database was included in this project to give context to the project Recon List.
- The /core/database.php class file defines some database functions you might need. Some of the functions are as follows:
```note
- **execute();**  to insert, update, delete, truncate data in a table
- **fetch_array()** to fetch data associate array
- **single()** to fetch single row from a table
- **rowCount()** to count row in a table and lastly we have
- **query()** Allows us to write queries
- **bind()** this is use to Bind values
```

## Summary

> If you want to create additional view page or UI page and you have the file inside a sub folder, Use the HomeController class or create the method. example, say you want to create aboutUs page or view, Go to the HomeController class and create about() method,

``` 
public function about(){
    $this->view("subfolde_name/about)
}

```

> Same goes if the view file is directly inside the views folder without subfolder like views/auth/login.php, But if you want to have controller over the controller, example having url like "auth/login" or "user/profile" this you need to create Controllers for them, AuthController.php and UserController.php, inside AuthController class you have login() method and inside UserController class you have profile() method.


# PROJECT SETUP

## 1
> Download, unzip or clone the project file, base folder name is "assigment" but if you wish to change the name, NOTE-> when you change base name from "assignment" to "NEW_BASE_FOLDER_NAME" open the project file, go to public/.htaccess and look for "RewriteBase /assignment/public" and change from "assignment" to "NEW_BASE_FOLDER_NAME".

## 2
> Database is MySQL and DB name is "cronjobs", if you want to make any changes, go to "baseFolder/app/.env" file and change "DB_NAME=cronjobs" to your new db name, if not please create DB named "cronjobs" then import the SQL TABLES from "baseFolder/app/db/cronjobs.sql file.


## 3
> To enable Mailer, make sure you have composer installed in your system. To install Composer, the PHP dependency manager, follow these steps based on your operating system.

## Steps to Install Composer on Windows:

1. Download the Composer-Setup.exe file:
    * **Visit the official Composer website: https://getcomposer.org/download/.
    * **Under Windows Installer, click on Composer-Setup.exe to download the installer.
2. Run the Installer:
    * **Double-click the downloaded Composer-Setup.exe file to run it.
    * **During the installation process, you’ll be asked to select the path to your php.exe. For XAMPP users, this is usually located at:

```sh
C:\xampp\php\php.exe
```

* **If you're using WAMP, the path is typically:

```sh
C:\wamp64\bin\php\phpX.X.X\php.exe
```
* **Select the appropriate php.exe file, then proceed with the installation.

3. Complete the Installation:
    * ** Finish the installation and make sure to check the box for Add Composer to PATH so you can use Composer from any command line or terminal.
4. Verify the Installation:
    * **Open Command Prompt (cmd) and run the following command to verify that Composer was installed successfully:

```sh
composer --version
```

5. Install phpmailer

    * **Locate your project base folder in cmd or bash and run the following command:

```sh
composer require phpmailer/phpmailer
```

- Upon successful the php mailer installation, users can sign-up, sign-in and set up email notification. 

> User Registration, Login and Logout, with the following urls

1. Access Registration Page: http://localhost/assignment/auth/register
2. Access Loign Page: http://localhost/assignment/auth/login
3. Access Logout endpoint: http://localhost/assignment/auth/logout

- Up one successful sign-up, and login, page will automatically redirect users to home page where they can schedule email notifications.

## HOW TO SET UP CRONTAB

- Crontab is for linux and unfortunately i use windows and i was able to achieve the same result with windows Task Schedule.

- SET UP TASK SCHEDULE ON WINDOWS TO RUN PHP SCRIPT

    1. Open Task Scheduler
        * ** Open Task Scheduler on Windows by typing Task Scheduler into the search bar and selecting the result.
    2.  Create a New Task
        * ** In the Task Scheduler, click on Create Task in the right panel.
    3. General Settings
        * ** Name: Give your task a name, e.g., SendScheduledEmails.
        * ** Security options: Choose Run whether user is logged on or not if you want it to run even when you’re logged out.
        * ** Check 'Do not store password. This task will only have access to local computer resourses.'
    4. Trigger
        * ** Go to the Triggers tab and click New.
        * ** Set how often you want the task to run (e.g., every 5 minutes, daily, etc.).
        ### Example for every 5 minutes:
        - Begin the task: On a schedule
        - Settings: Select Daily
        - Recur every: 1 day
        - Repeat task every: 5 minutes, for a duration of: 1 day (or set how long you want it to run)
        - Click OK to save.
    5. Action
        * ** Go to the Actions tab and click New.
        * ** Action: Start a program.
        * ** Program/script: Click Browse and navigate to your php.exe file (e.g., C:\Windows\System32\curl.exe).
        * ** Add arguments (optional): Add the path to your PHP script, for example: 

```sh
-X POST http://localhost/assignment/scheduler/send
``` 
* ** Click OK to save.
    6. Save and Test the Task
        * ** Click OK to save the task.

> Remember inside this "SchedulerController class" we send() method.