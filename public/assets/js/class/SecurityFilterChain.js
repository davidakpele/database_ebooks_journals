class SecurityFilterChain{
    
    getCookie(name) {
      // Encode the cookie name to handle special characters
      const nameEQ = encodeURIComponent(name) + "=";
      const cookies = document.cookie.split(';');
      
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            
            // Trim leading whitespace
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            
            // Check if the cookie starts with the name
            if (cookie.indexOf(nameEQ) === 0) {
                // Return the cookie value
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
      // Return null if the cookie is not found
      return null;
    }
}

// Export the class, so it can be imported in other files
export default SecurityFilterChain;