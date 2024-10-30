<?php 

require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR."config.php";
require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR."database.php";
require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR."controller.php";
require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR."app.php";
require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR."Mailer.php";
require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."helpers".DIRECTORY_SEPARATOR."Route.php";
require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."helpers".DIRECTORY_SEPARATOR."RequestHandler.php";
require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."helpers".DIRECTORY_SEPARATOR."RequestException.php";
require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."auth".DIRECTORY_SEPARATOR."UserSessionManager.php";
require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."services".DIRECTORY_SEPARATOR."JwtService.php";
require_once "..".DIRECTORY_SEPARATOR."app".DIRECTORY_SEPARATOR."services".DIRECTORY_SEPARATOR."SecurityFilterChain.php";
require_once '..'.DIRECTORY_SEPARATOR.'vendor'.DIRECTORY_SEPARATOR.'autoload.php';
require_once  '..'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'helpers'.DIRECTORY_SEPARATOR.'middleware'.DIRECTORY_SEPARATOR.'AuthSecurity.php';