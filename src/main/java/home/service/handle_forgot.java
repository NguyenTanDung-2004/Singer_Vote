package home.service;

import java.sql.SQLException;

public class handle_forgot {
	public boolean flag_email;
	public boolean new_and_confirm;
	public String function_handle_forgot_email(String email) throws SQLException {
		sql obj_sql = new sql();
		if (obj_sql.check_email_exist(email) == true) { // yêu cầu email phải tồn tại.
			send_code(email);
			return "email_exact";
		}
		else {
			return "email_error";
		}
	}
	public String check_email(String email) {
		Handel_Email obj = new Handel_Email();
		if (obj.check_email(email) == true) {
			return "email_exact";
		}
		else {
			return "email_error";
		}
	}
	public void send_code(String email) throws SQLException {
		Handel_Email obj = new Handel_Email();
		obj.send_code(email);
	}
	public void check_new_and_confirm(String new_password, String confirm_password) {
		if (new_password.equals(confirm_password)) {
			new_and_confirm = true;
		}
		else {
			new_and_confirm = false;
		}
	}
	public String all_email(String email) throws SQLException {
		String value_response = "";
		value_response = check_email(email);
		if (value_response.equals("email_exact")) {
			return function_handle_forgot_email(email);
		}
		else {
			return value_response;
		}
	}
}
