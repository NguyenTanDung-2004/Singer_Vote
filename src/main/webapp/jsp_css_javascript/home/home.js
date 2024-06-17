// xử lí các sự kiện hiển thị các box.
    // lấy ra 3 box.
    var login_box = document.querySelector("body .login");
    var signup_box = document.querySelector("body .signup");
    var forgot_box = document.querySelector("body .forgot");
    // lấy ra blur.
    var blur = document.querySelector("body .blur");
    // hàm tắt toàn bộ các box.
    function turn_off_all_box(){
        login_box.style.top = "-700px";
        signup_box.style.scale = "0";
        forgot_box.style.scale = "0";
        blur.style.display = "none";
        flag_eye_signup = 0;
        flag_eye_forgot = 0;
        flag_eye_login = 0;
        flag_forgot = 0;
        flag_signup = 0;
        change_placeholder(input_in_forgot, "Your Email:");
        change_placeholder(input_in_signup, "Your Email:");
        input_in_forgot.type = "text";
        input_in_signup.type = "text";
        eye_in_forgot.style.display = "none";
        eye_in_forgot.classList.add("fa-eye-slash");
        eye_in_forgot.classList.remove("fa-eye");
        eye_in_signup.style.display = "none";
        eye_in_signup.classList.add("fa-eye-slash");
        eye_in_signup.classList.remove("fa-eye");
        eye_in_login.classList.remove("fa-eye");
        eye_in_login.classList.add("fa-eye-slash");
        var text_successfull = document.querySelector("body .signup .successfull");
        text_successfull.style.display = "none";
        flag_continue_password_1 = 0;
        var text_successfull1 = document.querySelector("body .forgot .successfull");
        text_successfull1.style.display = "none";
    }
    function turn_on_login(){
        login_box.style.top = "0px";
        blur.style.display = "block";
    }
    function turn_on_signup_forgot(box){
        box.style.scale = "1";
        blur.style.display = "block";
    }
    // lấy ra các nút chuyển đổi.
    var button_login_header = document.querySelector("body .header button");
    // thêm sự kiện cho login_header
    button_login_header.addEventListener("click", () => 
        {
            turn_on_login();
        }
    )
    var button_signup_in_login = document.querySelector("body .login .button .text .p2");
    button_signup_in_login.addEventListener("click", () => 
        {
            turn_off_all_box();
            turn_on_signup_forgot(signup_box);
        }
    )
    var button_login_in_signup = document.querySelector("body .signup .button .text .p2");
    button_login_in_signup.addEventListener("click", () => 
        {
            turn_off_all_box();
            turn_on_login();
        }
    )
    var button_forgot_in_login = document.querySelector("body .login .input p");
    button_forgot_in_login.addEventListener("click", () => 
        {
            turn_off_all_box();
            turn_on_signup_forgot(forgot_box);
        }
    )
    var button_login_in_forgot = document.querySelector("body .forgot .button .text .p2");
    button_login_in_forgot.addEventListener("click", () => 
        {
            turn_off_all_box();
            turn_on_login();
        }
    )
    // nhấn 
    var button_close_box = document.querySelectorAll("body .fa-xmark");
    for (var i = 0; i < button_close_box.length; i++){
        button_close_box[i].addEventListener("click", () => 
            {
                turn_off_all_box();
            }
        )
    }
// xử lí việc sai dữ liệu cho thẻ input
    function error_data_for_input(input){
        input.style.border = "1px solid red";
    }
    // xử lí khi focus vào input
    function focus_for_input(input){
        input.addEventListener('focus', function() {
            // Thực hiện các hành động khi thẻ input không còn được focus
            input.style.border = "1px solid #1d9bf0";
        });
    }
// xử lí sự kiện nhấp continue cho cả signup và forgot
    function change_placeholder(input, text){
        input.placeholder = text;
        input.value = "";
    }
    function change_type_input(input, text){
        input.type = text;
    }
    function display_eye(eye){
        eye.style.display = "block";
    }
    // lấy ra hai continue của signup và forgot.
    var button_continue_in_signup = document.querySelector("body .signup .button button");
    var button_continue_in_forgot = document.querySelector("body .forgot .button button")
    // lấy ra hai input của signup và forgot.
    var input_in_signup = document.querySelector("body .signup .input input");
    var input_in_forgot = document.querySelector("body .forgot .input input");
    // lấy ra hai eye của signup và forgot.
    var eye_in_signup = document.querySelector("#eye_signup");
    var eye_in_forgot = document.querySelector("#eye_forgot");
    // tạo biến để biết rằng đang ở đâu trong signup.
    var flag_signup = 0;
    // tạo ra hai biến để lưu giá trị của email và password trong signup.
    var email_signup;
    var password_signup;
    // tạo ra một biến có tác dụng ngăn chặn add tài khoản hai lần.
    var flag_continue_password_1 = 0;
    button_continue_in_signup.addEventListener("click", () => 
        {
            if (check_null(input_in_signup)){
                if (flag_signup == 0){
                    email_signup = input_in_signup.value;
                    send_request_button_continue_email_in_signup();
                }
                else{
                    if (flag_continue_password_1 == 0){
						send_request_button_continue_password_in_signup();
					}
                }
            }
            else{
                error_data_for_input(input_in_signup);
                focus_for_input(input_in_signup);
            }
        }
    )
    var flag_forgot = 0;
    // tạo hai biến để lưu new password và confirm password.
    var new_password;
    var confirm_password;
    // tạo biến để lưu email.
    var email;
    // tạo biến lưu trữ code.
    var code;
    button_continue_in_forgot.addEventListener("click", () => 
        {
            button_continue_in_forgot.innerHTML = "Processing...";
            if (flag_forgot == 0){
                if (check_null(input_in_forgot)){
					send_request_button_continue_email_in_forgot()
				}
				else{
					error_data_for_input(input_in_forgot);
                	focus_for_input(input_in_forgot);
                	button_continue_in_forgot.innerHTML = "Continue";
				}
            }
            else if (flag_forgot == 1){
                if (check_null(input_in_forgot)){
					new_password = input_in_forgot.value;
					change_placeholder(input_in_forgot, "Confirm Password:");
	                display_eye(eye_in_forgot);
	                flag_forgot++;
	                change_type_input(input_in_forgot, "password");
	                input_in_forgot.type = "password";
	                eye_in_forgot.classList.remove("fa-eye");
	                eye_in_forgot.classList.add("fa-eye-slash");
	                flag_eye_forgot++;
	                button_continue_in_forgot.innerHTML = "Continue";
				}
				else{
					error_data_for_input(input_in_forgot);
                	focus_for_input(input_in_forgot);
                	button_continue_in_forgot.innerHTML = "Continue";
				}
            }
            else if (flag_forgot == 2){
                if (check_null(input_in_forgot)){
					confirm_password = input_in_forgot.value;
					if (confirm_password == new_password){
						change_placeholder(input_in_forgot, "Code:");
		                eye_in_forgot.style.display = "none";
		                flag_forgot++;
		                change_type_input(input_in_forgot, "text");
		                input_in_forgot.type = "text";
		                flag_eye_forgot = 0;
		                button_continue_in_forgot.innerHTML = "Continue";
					}
					else{
						error_data_for_input(input_in_forgot);
	                	focus_for_input(input_in_forgot);
	                	button_continue_in_forgot.innerHTML = "Continue";
					}
				}
				else{
					error_data_for_input(input_in_forgot);
                	focus_for_input(input_in_forgot);
                	button_continue_in_forgot.innerHTML = "Continue";
				}
                
            }
            else if (flag_forgot == 3){
				if(check_null(input_in_forgot)){
					code = input_in_forgot.value;
					send_request_check_code()
				}
				else{
					error_data_for_input(input_in_forgot);
                	focus_for_input(input_in_forgot);
                	button_continue_in_forgot.innerHTML = "Continue";
				}
			}
        }
    )
// xử lí sự kiện eye của input.
    var eye_in_login = document.querySelector("#eye_login")
    var flag_eye_signup = 0;
    var flag_eye_forgot = 0;
    var flag_eye_login = 0;
    eye_in_login.addEventListener("click", () => 
        {
            var input_in_login = document.querySelector('body .login .input div input');
            if (flag_eye_login == 0){
                input_in_login.type = "text";
                eye_in_login.classList.remove("fa-eye-slash");
                eye_in_login.classList.add("fa-eye");
                flag_eye_login = 1;
            }
            else{
                input_in_login.type = "password";
                eye_in_login.classList.remove("fa-eye");
                eye_in_login.classList.add("fa-eye-slash");
                flag_eye_login = 0;
            }
        }
    )
    eye_in_signup.addEventListener("click", () => 
        {
            if (flag_eye_signup == 0){
                input_in_signup.type = "text";
                eye_in_signup.classList.remove("fa-eye-slash");
                eye_in_signup.classList.add("fa-eye");
                flag_eye_signup = 1;
            }
            else{
                input_in_signup.type = "password";
                eye_in_signup.classList.remove("fa-eye");
                eye_in_signup.classList.add("fa-eye-slash");
                flag_eye_signup = 0;
            }
        }
    )
    eye_in_forgot.addEventListener("click", () => 
        {
            if (flag_eye_forgot == 0){
                input_in_forgot.type = "text";
                eye_in_forgot.classList.remove("fa-eye-slash");
                eye_in_forgot.classList.add("fa-eye");
                flag_eye_forgot = 1;
            }
            else{
                input_in_forgot.type = "password";
                eye_in_forgot.classList.remove("fa-eye");
                eye_in_forgot.classList.add("fa-eye-slash");
                flag_eye_forgot = 0;
            }
        }
    )   
    // continue with google
    var button_continue_with_google = document.querySelector("body .login .button .google");
    button_continue_with_google.addEventListener("click", () =>
    	{
			console.log("nguyentandung");
			var a = document.querySelector("#a_continue_google")
			var url = a.getAttribute("href"); // Lấy đường dẫn từ thuộc tính href của liên kết
    		window.open(url, "_blank");
		}
    )