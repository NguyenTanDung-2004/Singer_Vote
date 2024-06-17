package home.controller;

import java.io.IOException; 
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import home.service.handle_signup;

@WebServlet("/servlet_signup")
public class servlet_signup extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String email = (String)req.getParameter("email");
		String password = (String)req.getParameter("password");
		String response_value = "";
		if (password == null) {
			handle_signup obj = new handle_signup();
			try {
				response_value = obj.all_email(email);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			send_response(resp, response_value);
			return;
		}
		else {
			handle_signup obj = new handle_signup();
			try {
				obj.all_password(email, password);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			send_response(resp, "sign_up_successfully");
		}
	}
	public void send_response(HttpServletResponse resp, String response_value) throws IOException {
		Gson gson = new Gson();
		String value = gson.toJson(response_value);
	    resp.setCharacterEncoding("UTF-8");
	    resp.getWriter().write(value);
	}
}
