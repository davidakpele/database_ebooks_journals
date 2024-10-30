<?php

class Application {
    protected $controller = 'HomeController';
    protected $method = 'index';
    protected $params = [];

    public function __construct() {
        $this->parseUrl();

        if (file_exists('../app/controllers/' . $this->controller . '.php')) {
            require_once '../app/controllers/' . $this->controller . '.php';
            $this->controller = new $this->controller();
        } else {
            /** 
			 * If Controller not found 
			 * echo "Controller not found.";
			 * But i prefer to redirect users to home page instead of black page with echo "Controller not found"
			*/
			
			redirect('index');
            
        }

        if (method_exists($this->controller, $this->method)) {
            call_user_func_array([$this->controller, $this->method], $this->params);
        } else {
            // Method not found, you can set a default or error method
            
			// echo "Method not found.";
            // return;
			
			// OR redirect users to page

			redirect('index');
        }
    }

    public function parseUrl() {
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);

            $this->controller = isset($url[0]) ? ucfirst($url[0]) . 'Controller' : 'HomeController';
            $this->method = isset($url[1]) ? $url[1] : 'index';
            unset($url[0], $url[1]);

            $this->params = $url ? array_values($url) : [];
        }
    }
}

?>