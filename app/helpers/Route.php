<?php

function redirect($url=''){
	
   if (!defined('ROOT')) {
        define('ROOT', '/'); 
    }

    if (!empty($url)) {
        header('Location: ' . ROOT . $url);
        exit(); 
    }
}

function crypto_rand_secure($min, $max){
	$range = $max - $min;
	if ($range < 1) return $min; 
		$log = ceil(log($range, 2));
		$bytes = (int) ($log / 8) + 1; 
		$bits = (int) $log + 1; 
		$filter = (int) (1 << $bits) - 1; 
	do {
		$rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
		$rnd = $rnd & $filter; 
	} while ($rnd > $range);
	return $min + $rnd;
}

function dnd($data){
	echo "<pre>";
	print_r($data);
	echo "</pre>";
	die();
}