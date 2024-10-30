<?php

use Request\RequestHandler;
use Exception\RequestException;
use Session\UserSessionManager;
use Custom\Mailer;
use JwtToken\JwtService;

final class HomeController extends Controller
{
    private $repository;
    private $session;
    private $jwt;

    public function __construct() {
        $this->jwt= new JwtService();
        $this->session= new UserSessionManager();
        $this->repository = $this->loadModel('Getting');
    }

    public function index(){
        if (!$this->session->authCheck()) {
            redirect('auth/login');
        }else{
            $token = $this->jwt->getToken();
            //get 'user subscription id'
            $id= $_SESSION['packageId'];
            $_get_avaliable_subject= $this->repository->get_user_subcribed_subjects($id);
            $data =
            [
                'auth'=>($authenticateUser ?? ''),
                '_token'=>$token,
                'data'=> $_get_avaliable_subject,
            ];
            $this->view("index", $data); 
        } 
    }

    
}
