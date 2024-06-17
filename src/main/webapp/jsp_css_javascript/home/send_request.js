/**
 * 
 */

// xử lí login
        // lấy ra button_login trong login.
        var login_in_login = document.querySelector("body .login .button button");
        // lấy ra hai thẻ input trong login.
        var inputs_in_login = document.querySelectorAll("body .login .input input");
        // tạo hai biến lưu trữ giá trị email và password trong login.
        var email_in_login;
        var password_in_login;
        login_in_login.addEventListener("click", () => 
            {
                login_in_login.innerHTML = "Processing..."
                email_in_login = inputs_in_login[0].value;
                password_in_login = inputs_in_login[1].value;
                check_null_when_click_login_in_login();
                if (null_when_click_login_in_login == 0){
                    send_request_button_login_in_login();
                }
                else{
					login_in_login.innerHTML = "Login Now";
					null_when_click_login_in_login = 0;
					return;
				}
            }
        )
        // kiểm tra một thẻ có null hay không.
        function check_null(input){
            if (input.value == ""){
                return false;
            }
            else{
                return true;
            }
        }
        // kiểm tra thẻ null và hiển thị lỗi khi nhấn login in login.
        var null_when_click_login_in_login = 0;
        function check_null_when_click_login_in_login(){
            if (check_null(inputs_in_login[0]) == false){
                error_data_for_input(inputs_in_login[0]);
                focus_for_input(inputs_in_login[0]);
                null_when_click_login_in_login = 1;
                login_in_login.innerHTML = 'Login Now'
            }
            if (check_null(inputs_in_login[1]) == false){
                error_data_for_input(inputs_in_login[1]);
                focus_for_input(inputs_in_login[1]);
                null_when_click_login_in_login = 1;
                login_in_login.innerHTML = 'Login Now'
            }
        }
        // send request của login đên server
        function send_request_button_login_in_login() {
            var http = new XMLHttpRequest();
            http.open("GET", "http://localhost:8080/Singer_Vote/servlet_login?email=" + email_in_login + "&password=" + password_in_login, true);
            http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
            http.send();
            http.onload = function() {
                var response_value = JSON.parse(http.responseText);
                console.log(response_value);
                if (response_value == "password_error"){
					error_data_for_input(inputs_in_login[1]);
					login_in_login.innerHTML = "Login Now";
				}
				if (response_value == "email_error"){
					error_data_for_input(inputs_in_login[0]);
					login_in_login.innerHTML = "Login Now";
				}
				else{
					login_in_login.innerHTML = "Login Now";
                	window.location="http://localhost:8080/Singer_Vote/servlet_vote";
				}
            }
        }


// xử lí signup
        function send_request_button_continue_email_in_signup(){
            var http = new XMLHttpRequest();
            button_continue_in_signup.innerHTML = "Processing...";
            http.open("GET", "http://localhost:8080/Singer_Vote/servlet_signup?email=" + input_in_signup.value, true);
            http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
            http.send();
            http.onload = function() {
                var response_value = JSON.parse(http.responseText);
                if (response_value == "email_error"){
                    error_data_for_input(input_in_signup);
                    focus_for_input(input_in_signup);
                }
                else{
                    change_placeholder(input_in_signup, "Your Password:");
                    display_eye(eye_in_signup);
                    change_type_input(input_in_signup, "password");
                    flag_signup = 1;
                }
                button_continue_in_signup.innerHTML = "Continue";
            }
        }
        function send_request_button_continue_password_in_signup(){
            button_continue_in_signup.innerHTML = "Processing...";
            var http = new XMLHttpRequest();
            http.open("GET", "http://localhost:8080/Singer_Vote/servlet_signup?password=" + input_in_signup.value + "&email=" + email_signup, true);
            http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
            http.send();
            http.onload = function() {
                var response_value = JSON.parse(http.responseText);
               	var text_successfull = document.querySelector("body .signup .successfull");
               	text_successfull.style.display = "block";
                button_continue_in_signup.innerHTML = "Continue";
                flag_continue_password_1 = 1;
            }
        }

// xử lí forgot
		function send_request_button_continue_email_in_forgot(){
			button_continue_in_forgot.innerHTML = "Processing...";
            var http = new XMLHttpRequest();
            http.open("GET", "http://localhost:8080/Singer_Vote/servlet_forgot?email=" + input_in_forgot.value, true);
            http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
            http.send();
            http.onload = function() {
                var response_value = JSON.parse(http.responseText);
                if (response_value == "email_error"){
					error_data_for_input(input_in_forgot);
                    focus_for_input(input_in_forgot);
				}
				else{
					email = input_in_forgot.value;
					change_placeholder(input_in_forgot, "New Password:");
	                display_eye(eye_in_forgot);
	                flag_forgot++;
	                change_type_input(input_in_forgot, "password");
				}
				button_continue_in_forgot.innerHTML = "Continue";
            }
		}
		function send_request_button_continue_update_new_password_in_forgot(){
			button_continue_in_forgot.innerHTML = "Processing...";
            var http = new XMLHttpRequest();
            http.open("GET", "http://localhost:8080/Singer_Vote/servlet_forgot?email=" + input_in_forgot.value, true);
            http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
            http.send();
            http.onload = function() {
                var response_value = JSON.parse(http.responseText);
                console.log(response_value);
                if (response_value == "email_error"){
					error_data_for_input(input_in_forgot);
                    focus_for_input(input_in_forgot);
				}
				else{
					change_placeholder(input_in_forgot, "New Password:");
	                display_eye(eye_in_forgot);
	                flag_forgot++;
	                change_type_input(input_in_forgot, "password");
	                new_password = input_in_forgot.value;
				}
				button_continue_in_forgot.innerHTML = "Continue";
            }
		}
		function send_request_check_code(){
			button_continue_in_forgot.innerHTML = "Processing...";
            var http = new XMLHttpRequest();
            http.open("GET", "http://localhost:8080/Singer_Vote/servlet_forgot?code=" + code + "&email=" + email, true);
            http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
            http.send();
            http.onload = function() {
                var response_value = JSON.parse(http.responseText);
                console.log(response_value);
                if (response_value == "code_error"){
					error_data_for_input(input_in_forgot);
                    focus_for_input(input_in_forgot);
                    button_continue_in_forgot.innerHTML = "Continue";
				}
				else{
					update_password();
				}
            }
		}
		function update_password(){
			button_continue_in_forgot.innerHTML = "Processing...";
            var http = new XMLHttpRequest();
            http.open("GET", "http://localhost:8080/Singer_Vote/servlet_forgot?email=" + email+ "&password=" + new_password, true);
            http.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
            http.send();
            http.onload = function() {
                var response_value = JSON.parse(http.responseText);
                console.log(response_value);
                button_continue_in_forgot.innerHTML = "Continue";
                var text_successfull = document.querySelector("body .forgot .successfull");
               	text_successfull.style.display = "block";
            }
		}
		