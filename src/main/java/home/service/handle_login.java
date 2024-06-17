package home.service;

import java.sql.SQLException;

import util.encrypt_password;

public class handle_login {
	public boolean flag_login_email;
	public boolean flag_login_password;
	public void function_handle_login_email(String email, String password) throws SQLException {
		sql obj_sql = new sql();
		if (obj_sql.check_email_exist(email) == true) { // yêu cầu email tồn tại.
			flag_login_email = true;
		}
		else {
			flag_login_email = false;
		}
	}
	public void function_handle_login_password(String email, String password) throws SQLException {
		sql obj_sql = new sql();
		encrypt_password obj = new encrypt_password();
		String password_value = obj.ecrypt_to_SHA1(password);
		String Exact_password = obj_sql.get_password_from_email(email);
		if (password_value.equals(Exact_password)) {
			flag_login_password = true;
		}
		else {
			flag_login_password = false;
		}
	}
}
