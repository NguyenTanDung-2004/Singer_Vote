package communicate_with_contract;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.google.gson.Gson;
@WebServlet("/communicate")
public class communicate extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		CloseableHttpClient httpClient = HttpClients.createDefault();
        String action = (String)req.getParameter("action");
        if (action.equals("get_number_vote_of_singer")) {
        	HttpPost request = new HttpPost("http://localhost:3000/get_number_vote_of_singer");
        	String id_singer = (String)req.getParameter("id_singer");
        	String requestData = "{\"address\": " + "\"" + data_address.set_address_for_user.addresses[(int) req.getSession().getAttribute("id")] + "\", \"id\": " + id_singer + "}";

            // Đặt dữ liệu vào phần thân của yêu cầu
            StringEntity requestBody = new StringEntity(requestData);
            request.setEntity(requestBody);
            request.setHeader("Content-type", "application/json");
            String[] array;
            try (CloseableHttpResponse response = httpClient.execute(request)) {
                System.out.println("Response status: " + response.getStatusLine());
                String responseBody = EntityUtils.toString(response.getEntity());
                System.out.println(responseBody);
                responseBody = responseBody.replace("[", "");
                responseBody = responseBody.replace("]", "");
                array = responseBody.split(",");
                System.out.println(array.length);
            }
            send_response(resp, array);
            httpClient.close();
        	return;
        }
        if (action.equals("vote")) {
        	
        	HttpPost request = new HttpPost("http://localhost:3000/vote_singer");
        	String id_singer = (String)req.getParameter("id_singer");
        	String requestData = "{\"address\": " + "\"" + data_address.set_address_for_user.addresses[(int) req.getSession().getAttribute("id")] + "\", \"id\": " + id_singer + "}";

            // Đặt dữ liệu vào phần thân của yêu cầu
            StringEntity requestBody = new StringEntity(requestData);
            request.setEntity(requestBody);
            request.setHeader("Content-type", "application/json");
            String responseBody = "";
            try (CloseableHttpResponse response = httpClient.execute(request)) {
                System.out.println("Response status: " + response.getStatusLine());
                responseBody = EntityUtils.toString(response.getEntity());
                System.out.println(responseBody);
            }
            send_response(resp, responseBody);
            httpClient.close();
        	return;
        }
        if (action.equals("list_singer")) {
        	HttpPost request = new HttpPost("http://localhost:3000/list_singer");
        	String id_singer = (String)req.getParameter("id_singer");
        	String requestData = "{\"address\": " + "\"" + data_address.set_address_for_user.addresses[(int) req.getSession().getAttribute("id")] + "\", \"id\": " + id_singer + "}";

            // Đặt dữ liệu vào phần thân của yêu cầu
            StringEntity requestBody = new StringEntity(requestData);
            request.setEntity(requestBody);
            request.setHeader("Content-type", "application/json");
            String responseBody = "";
            try (CloseableHttpResponse response = httpClient.execute(request)) {
                System.out.println("Response status: " + response.getStatusLine());
                responseBody = EntityUtils.toString(response.getEntity());
                System.out.println(responseBody);
            }
            send_response(resp, responseBody);
            httpClient.close();
        	return;
        }
        if (action.equals("remove")) {
        	HttpPost request = new HttpPost("http://localhost:3000/remove");
        	String id_singer = (String)req.getParameter("id_singer");
        	String requestData = "{\"address\": " + "\"" + data_address.set_address_for_user.addresses[(int) req.getSession().getAttribute("id")] + "\", \"id\": " + id_singer + "}";

            // Đặt dữ liệu vào phần thân của yêu cầu
            StringEntity requestBody = new StringEntity(requestData);
            request.setEntity(requestBody);
            request.setHeader("Content-type", "application/json");
            String responseBody = "";
            try (CloseableHttpResponse response = httpClient.execute(request)) {
                System.out.println("Response status: " + response.getStatusLine());
                responseBody = EntityUtils.toString(response.getEntity());
                System.out.println(responseBody);
            }
            send_response(resp, responseBody);
            httpClient.close();
        	return;
        }
        if (action.equals("claim_top3")) {
        	HttpPost request = new HttpPost("http://localhost:3000/claim_top3");
        	String id_singer = (String)req.getParameter("id_singer");
        	String requestData = "{\"address\": " + "\"" + data_address.set_address_for_user.addresses[(int) req.getSession().getAttribute("id")] + "\", \"id\": " + id_singer + "}";

            // Đặt dữ liệu vào phần thân của yêu cầu
            StringEntity requestBody = new StringEntity(requestData);
            request.setEntity(requestBody);
            request.setHeader("Content-type", "application/json");
            String responseBody = "";
            try (CloseableHttpResponse response = httpClient.execute(request)) {
                System.out.println("Response status: " + response.getStatusLine());
                responseBody = EntityUtils.toString(response.getEntity());
                System.out.println(responseBody);
            }
            send_response(resp, responseBody);
            httpClient.close();
        	return;
        }
	}
	public void send_response(HttpServletResponse resp, String response_value) throws IOException {
		Gson gson = new Gson();
		String value = gson.toJson(response_value);
	    resp.setCharacterEncoding("UTF-8");
	    resp.getWriter().write(value);
	}
	public void send_response(HttpServletResponse resp, String[] response_value) throws IOException {
		Gson gson = new Gson();
		String value = gson.toJson(response_value);
	    resp.setCharacterEncoding("UTF-8");
	    resp.getWriter().write(value);
	}
}
