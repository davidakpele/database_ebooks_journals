<?php
namespace App\middleware\Security;

final class AuthSecurity 
{
    /**
     * Checks if the request contains a valid Bearer token in the Authorization header.
     *
     * @return string|bool The token string if valid, false otherwise.
     */
    public function checkBearerToken()
    {
        // Check if the Authorization header is set in the request
        $authHeader = $this->getAuthorizationHeader();

        // Validate the Authorization header format and check if it starts with "Bearer "
        if (!empty($authHeader) && preg_match('/^Bearer\s(\S+)$/', $authHeader, $matches)) {
            // Return the token value if found
            return true;
        }

        // Return false if no valid Bearer token is found
        return false;
    }

    /**
     * Get the Authorization header from the request.
     *
     * @return string|null The Authorization header if present, null otherwise.
     */
    private function getAuthorizationHeader()
    {
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            return $_SERVER['HTTP_AUTHORIZATION'];
        } elseif (function_exists('apache_request_headers')) {
            $headers = apache_request_headers();
            if (isset($headers['Authorization'])) {
                return $headers['Authorization'];
            }
        }

        return null;
    }
}
