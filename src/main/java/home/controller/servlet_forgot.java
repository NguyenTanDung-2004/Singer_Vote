package home.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import home.service.handle_forgot;
import home.service.sql;

@WebServlet("/servlet_forgot")
public class servlet_forgot extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		 String email = (String)req.getParameter("email");
		 String password = (String)req.getParameter("password");
		 String code = (String)req.getParameter("code");
		 if (password == null && code == null) {
			 handle_forgot obj = new handle_forgot();
			 String response_value = "";
			 try {
				response_value = obj.all_email(email);
			 } catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				
			 }
			 send_response(resp, response_value);
			 return;
		 }
		 if (password == null && code != null) {
			 sql obj = new sql();
			 try {
				String code_exact = obj.get_code(email);
				if (code.equals(code_exact)) {
					send_response(resp, "code_exact");
				}
				else {
					send_response(resp, "code_error");
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			 return;
		 }
		 if (password != null) {
			 sql obj = new sql();
			 try {
				obj.update_password_img_userName_code(obj.get_id_from_email(email), password, "password");
			 } catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			 }
			 send_response(resp, "update thanh cong");
		 }
	}
	public void send_response(HttpServletResponse resp, String response_value) throws IOException {
		Gson gson = new Gson();
		String value = gson.toJson(response_value);
	    resp.setCharacterEncoding("UTF-8");
	    resp.getWriter().write(value);
	}
}
