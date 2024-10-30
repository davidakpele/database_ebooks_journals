<?php
namespace Request;

class RequestHandler 
{
  protected $requestException;

  public function __construct($requestException) {
    $this->requestException = $requestException;
  }

  public static function isRequestMethod($method){
    return $_SERVER['REQUEST_METHOD']=== strtoupper($method);
  } 


  /**
   * Handles incoming request with CORS and validation
  */
  public function handleRequest($method, $cors = true) {
    if (self::isRequestMethod($method)) {
      if ($cors && !$this->requestException->CorsHeader()) {
          return ['error' => 'CORS headers failed'];
      }
      
      if (!$this->requestException->validata_api_request_header()) {
          return ['error' => $this->requestException->error_log_auth()];
      }
      
      return $this->getJsonInput();
    }
      
    return ['error' => 'Invalid request method'];
  }

  /**
  * Get and decode the JSON input from the request
  */
  private function getJsonInput() {
    $jsonString = file_get_contents("php://input");
    return json_decode($jsonString, true);
  }

  /**
   * Sanitize a specific field from the request
  */
  public function sanitizeField($field, $filter = FILTER_SANITIZE_STRING) {
    return strip_tags(trim(filter_var($field, $filter)));
  }
}
