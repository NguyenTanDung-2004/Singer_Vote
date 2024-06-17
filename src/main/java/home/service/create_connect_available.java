package home.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.microsoft.sqlserver.jdbc.SQLServerDriver;

public class create_connect_available {
	public Connection con;
	public void connect_to_database()
	{
		try {
			DriverManager.registerDriver(new SQLServerDriver());
			String url = "jdbc:sqlserver://localhost:1433;databaseName=singer_vote;user=sa;password=12345;trustServerCertificate = true;";
			con = DriverManager.getConnection(url);
			System.out.println("connect database successfully");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void main(String args[]) {
		create_connect_available obj = new create_connect_available();
		obj.connect_to_database();
	}

}
