<?php

namespace App\Helpers\Model\Repository\Injection;

class Repository
{
    public static function loadModel($model) {
        $modelPath = "../app/models/" . $model . ".php";

        if (file_exists($modelPath)) {
            include_once $modelPath;
            return new $model();
        }

        return false; 
    }
}