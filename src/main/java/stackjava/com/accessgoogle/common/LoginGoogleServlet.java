package stackjava.com.accessgoogle.common;
import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import home.service.sql;
import stackjava.com.accessgoogle.common.GooglePojo;
import stackjava.com.accessgoogle.common.GoogleUtils;
@WebServlet("/login_google")
public class LoginGoogleServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;
//  public LoginGoogleServlet() {
  //  super();
  //}
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    String code = request.getParameter("code");
    if (code == null || code.isEmpty()) {

    } else {
      String accessToken = GoogleUtils.getToken(code);
      GooglePojo googlePojo = GoogleUtils.getUserInfo(accessToken);
      request.setAttribute("id", googlePojo.getId());
      request.setAttribute("name", googlePojo.getName());
      request.setAttribute("email", googlePojo.getEmail());      try {
    	  insert_email(googlePojo.getEmail());
      } catch (SQLException e) {
    	  e.printStackTrace();
      }
      HttpSession session = request.getSession();
	  	sql obj1 = new sql();
	  	try {
	  		session.setAttribute("id", obj1.get_id_from_email(googlePojo.getEmail()) - 1);
	  	} catch (SQLException e) {
	  		// TODO Auto-generated catch block
	  		e.printStackTrace();
	  	}
	  	response.sendRedirect("/Singer_Vote/servlet_vote");
    }
  }
  public void insert_email(String email) throws SQLException {
	  sql obj = new sql();
	  if (obj.check_email_exist(email)) {
		  return;
	  }
	  else {
		  obj.insert_new_email(email);
	  }
  }
}
