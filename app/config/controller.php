<?php 

Class Controller
{
	protected function view($view,$data = []){
		if(file_exists("../app/views/". $view .".php"))
 		{
 			include "../app/views/". $view .".php";
 		}else{
 			header('HTTP/1.1 403 Forbidden');
			echo "Access Denied";
			exit(); 
 		}
	} 

	protected function loadModel($model){
		if(file_exists("../app/models/". $model .".php")){
 			include "../app/models/". $model .".php";
 			return $model = new $model();
 		}
 		return false;
	}
}