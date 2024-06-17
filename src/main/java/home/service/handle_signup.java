package home.service;

import java.sql.SQLException;

import util.encrypt_password;

public class handle_signup {
	public boolean flag_email;
	public void function_handle_signup_email(String email) throws SQLException {
		sql obj_sql = new sql();
		if(obj_sql.check_email_exist(email) == false) { // yêu cầu email phải không tồn tại.
			flag_email = true;
		}
		else {
			flag_email = false;
		}
	}
	public void function_handle_signup_password(String email, String password) throws SQLException {
		sql obj_sql = new sql();
		encrypt_password obj_encrypt_password = new encrypt_password();
		String password_value = obj_encrypt_password.ecrypt_to_SHA1(password);
		obj_sql.update_password_img_userName_code(obj_sql.get_id_from_email(email), password_value, "password");
	}
	public void function_send_email(String email) {
		Handel_Email obj = new Handel_Email();
		obj.send_notify_when_signup(email);
	}
	public boolean function_check_email_exist_on_internet(String email) {
		Handel_Email obj = new Handel_Email();
		return obj.check_email(email);
	}
	public String all_email(String email) throws SQLException {
		// kiểm tra email tồn tại trên internet.
		if (function_check_email_exist_on_internet(email) == false) {
			return "email_error";
		}
		// kiểm tra email trong database.
		function_handle_signup_email(email);
		if (flag_email == true) {
			return "email_exact";
		}
		else {
			return "email_error";
		}
	}
	public void all_password(String email, String password) throws SQLException {
		sql obj = new sql();
		obj.insert_new_email(email);
		function_handle_signup_password(email, password);
	}
}
