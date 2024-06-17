package vote.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import vote.service.sql;
@WebServlet("/servlet_vote")
public class controller_before_vote_page extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println(req.getSession().getAttribute("id"));
		sql obj = new sql();
		ArrayList<ArrayList<String>> names_links_imgs = new ArrayList<ArrayList<String>>();
		try {
			names_links_imgs = obj.get_data();
			System.out.println("nguyentandung");
		} catch (SQLException e) {
			System.out.println("lỗi get data in controller before vote page");
			e.printStackTrace();
		}
		req.setAttribute("data", names_links_imgs);
		RequestDispatcher dispatcher = req.getRequestDispatcher("/jsp_css_javascript/vote/vote.jsp");
		dispatcher.forward(req, resp);
	}
}
