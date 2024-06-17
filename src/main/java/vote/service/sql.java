package vote.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.microsoft.sqlserver.jdbc.SQLServerDriver;

import home.service.create_connect_available;

public class sql {
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
	public ArrayList<ArrayList<String>> get_data() throws SQLException {
		ArrayList<ArrayList<String>> names_links_imgs = new ArrayList<ArrayList<String>>();
		connect_to_database();
		Statement statement = con.createStatement();
		String query = "select * from singer";
        ResultSet resultSet = statement.executeQuery(query);
        // Hiển thị dữ liệu trong console
        while (resultSet.next()) {
            ArrayList<String> list = new ArrayList<>();
            list.add(resultSet.getString(2));
            list.add(resultSet.getString(3));
            list.add(resultSet.getString(4));
            names_links_imgs.add(list);
        }
        return names_links_imgs;
	}
}
