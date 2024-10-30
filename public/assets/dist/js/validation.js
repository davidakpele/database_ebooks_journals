
import auth from '../../js/class/validate'

$(document).ready(function() {
    $("#clearPasswordText").click(function () {
        const password = document.querySelector('.userPassword');
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        // toggle the eye slash icon
        if (type === 'password') {
          this.classList.remove('fa-eye');
          this.classList.add('fa-eye-slash');
        } else {
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
     
     
     //  validate
     $('.auth-form').submit(function (e) {
        e.preventDefault()
        const email = document.querySelector('.email');
        const password = document.querySelector('.userPassword');
    
        var UserEmail = email.value.trim();
        const myAuthObject = new auth(UserEmail);
        if (email.value.trim() == "") {
             email.focus()
             $('.base_error_msg_container').show();
             $('#alert__message').show().html("<span>Provide your email address.*</span>");
             return false;
         } else if (email.value.trim() !="" || email.value.trim() !=null) {
            if (myAuthObject.regex() === 303) {
                $('#alert__message').empty()
                $('.base_error_msg_container').show();
                $('#alert__message').show().html("Invalid Email Address..! Please Enter A Valid Email Address.");
                email.focus()
                return false;
            }
        }
         if (password.value.trim() == "") {
            password.focus()
            $('#alert__message').empty()
            $('.base_error_msg_container').show();
            $('#alert__message').show().html("<span>Provide your password.*</span>");
            return false;
        }
        if (email.value.trim() != "" || email.value.trim() != null && password.value.trim() != "" && password.value.trim() != null) {
            $('.loader').show()
            $(".text").text("Processing...");
            myAuthObject.login({ "email": email.value.trim(), "password": password.value.trim() })
        }
     })
});