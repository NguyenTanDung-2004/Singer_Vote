package home.service;

import java.sql.SQLException;
import java.util.Properties;
import java.util.Random;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Handel_Email {
	public boolean check_email(String email) {
		String to = email;
		final String username = "tandungnguyen918@gmail.com";
	    final String password = "oese kloq vtgv mxii";
        // Cấu hình properties cho session
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com"); // Thay đổi nếu sử dụng email provider khác
        props.put("mail.smtp.port", "587"); // Thay đổi nếu sử dụng cổng khác

        // Tạo đối tượng Session với thông tin xác thực
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Tạo đối tượng MimeMessage
            Message message = new MimeMessage(session);
            
            // Đặt thông tin người gửi (email A)
            message.setFrom(new InternetAddress(username));
            
            // Đặt thông tin người nhận (email B)
            

            // Gửi email
            	message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
                
                // Đặt chủ đề của email
                message.setSubject("Subject of the email");
                
                // Đặt nội dung của email
                message.setText("Hello, this is the content of the email.");
            	 Transport.send(message);

            System.out.println("Email exits on internet");
            return true;

        } catch (MessagingException e) {
           System.out.println("email is not exits on internet");
           return false;
        }
	}
	
	public String create_code() {
		Random rd = new Random();
		int x1 = rd.nextInt(9 - 1 + 1) + 1;
		int x2 = rd.nextInt(9 - 0 + 1) + 0;
		int x3 = rd.nextInt(9 - 0 + 1) + 0;
		int x4 = rd.nextInt(9 - 0 + 1) + 0;
		return ("" + x1) + x2 + x3 + x4;
	}
	public void send_code(String email) throws SQLException {
		String to = email;
		final String username = "tandungnguyen918@gmail.com";
	    final String password = "oese kloq vtgv mxii";
        // Cấu hình properties cho session
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com"); // Thay đổi nếu sử dụng email provider khác
        props.put("mail.smtp.port", "587"); // Thay đổi nếu sử dụng cổng khác

        // Tạo đối tượng Session với thông tin xác thực
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Tạo đối tượng MimeMessage
            Message message = new MimeMessage(session);
            
            // Đặt thông tin người gửi (email A)
            message.setFrom(new InternetAddress(username));
            
            // Đặt thông tin người nhận (email B)
            

            // Gửi email
        	message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            
            // Đặt chủ đề của email
            message.setSubject("This code to reset your password in Singer Vote webapp.");
            
            // Đặt nội dung của email
            String code = create_code();
            message.setText("Your code: " + code);
            Transport.send(message);
            sql obj = new sql();
            int id = -1;
            id = obj.get_id_from_email(email);
            obj.update_password_img_userName_code(id, code, "code");
            System.out.println("send code successfully");

        } catch (MessagingException e) {
           System.out.println("send code fail");
        }
	}
	public void send_notify_when_signup(String email){
		String to = email;
		final String username = "tandungnguyen918@gmail.com";
	    final String password = "oese kloq vtgv mxii";
        // Cấu hình properties cho session
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com"); // Thay đổi nếu sử dụng email provider khác
        props.put("mail.smtp.port", "587"); // Thay đổi nếu sử dụng cổng khác

        // Tạo đối tượng Session với thông tin xác thực
        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            // Tạo đối tượng MimeMessage
            Message message = new MimeMessage(session);
            
            // Đặt thông tin người gửi (email A)
            message.setFrom(new InternetAddress(username));
            
            // Đặt thông tin người nhận (email B)
            

            // Gửi email
        	message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            
            // Đặt chủ đề của email
            message.setSubject("Your email is used to signup Singer Vote webapp.");
            
            message.setText("If not you, please check again.");
            Transport.send(message);
            System.out.println("send code successfully");

        } catch (MessagingException e) {
           System.out.println("send code fail");
        }
	}
	public static void main(String args[]) {
		Handel_Email obj = new Handel_Email();
		try {
			obj.send_code("nguyentandungchichcho123@gmail.com");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
