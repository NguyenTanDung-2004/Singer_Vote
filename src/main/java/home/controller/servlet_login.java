package home.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import home.service.handle_login;
import home.service.sql;
@WebServlet("/servlet_login")
public class servlet_login extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String email = (String)req.getParameter("email");
		String password = (String)req.getParameter("password");
		String response_value = "first value";
		handle_login obj = new handle_login();
		// kiểm tra email
		try {
			obj.function_handle_login_email(email, password);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (obj.flag_login_email == false) {
			response_value = "email_error";
			send_response(resp, response_value);
			return;
		}
		// kiểm tra password
		try {
			obj.function_handle_login_password(email, password);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if (obj.flag_login_password == false) {
			response_value = "password_error";
			send_response(resp, response_value);
			return;
		}
		// cho nó vào.
		send_response(resp, "login successfully!");
		HttpSession session = req.getSession();
		sql obj1 = new sql();
		try {
			session.setAttribute("id", obj1.get_id_from_email(email) - 1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	public void send_response(HttpServletResponse resp, String response_value) throws IOException {
		Gson gson = new Gson();
		String value = gson.toJson(response_value);
	    resp.setCharacterEncoding("UTF-8");
	    resp.getWriter().write(value);
	}
}
