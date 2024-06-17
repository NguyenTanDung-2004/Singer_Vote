package home.service;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class sql {
	public boolean check_email_exist(String email) throws SQLException {
		create_connect_available obj = new create_connect_available();
		obj.connect_to_database();
		Statement statement = obj.con.createStatement();
		String query = "select * from account \r\n"
				+ "where account.email = '" + email + "'";
        ResultSet resultSet = statement.executeQuery(query);
        // Hiển thị dữ liệu trong console
        while (resultSet.next()) {
            return true;
        }
		return false;
	}
	public int get_max_id() throws SQLException {
		create_connect_available obj = new create_connect_available();
		obj.connect_to_database();
		Statement statement = obj.con.createStatement();
		String query = "select max(id) from account";
        ResultSet resultSet = statement.executeQuery(query);
        // Hiển thị dữ liệu trong console
        while (resultSet.next()) {
            return resultSet.getInt(1);
        }
        return 0;
	}
	public void insert_new_email(String email) {
		create_connect_available obj = new create_connect_available();
		obj.connect_to_database();
		sql obj_sql = new sql();
		String query = "insert into account (id, email) values (?, ?)";
        try (PreparedStatement preparedStatement = obj.con.prepareStatement(query)) {
            // Thiết lập giá trị cho các tham số
            preparedStatement.setInt(1, obj_sql.get_max_id() + 1);
            preparedStatement.setString(2, email);
            // Thực hiện truy vấn INSERT
            int rowsAffected = preparedStatement.executeUpdate();

            if (rowsAffected > 0) {
                System.out.println("insert new email successfully");
            } else {
                System.out.println("insert new email fail");
            }
        }
		catch(Exception e )
		{
		System.out.println(e);
		}

	}
	public void update_password_img_userName_code(int id, String update_value, String column_name) {
		create_connect_available obj = new create_connect_available();
		obj.connect_to_database();
		String query = "update account "
				+ "set account." + column_name + " = '" + update_value + "' "
				+ "where account.id = " + id
				;
				
        try (PreparedStatement preparedStatement = obj.con.prepareStatement(query)) {

            // Thực hiện truy vấn INSERT
            int rowsAffected = preparedStatement.executeUpdate();

            if (rowsAffected > 0) {
                System.out.println("update data successfully");
            } else {
                System.out.println("update data fail");
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

	}
	public int get_id_from_email(String email) throws SQLException {
		create_connect_available obj = new create_connect_available();
		obj.connect_to_database();
		Statement statement = obj.con.createStatement();
		String query = "select account.id from account "
				+ "where account.email = '" + email + "'";
        ResultSet resultSet = statement.executeQuery(query);
        // Hiển thị dữ liệu trong console
        while (resultSet.next()) {
            return resultSet.getInt(1);
        }
        return -1;
	}
	public String get_code(String email) throws SQLException {
		create_connect_available obj = new create_connect_available();
		obj.connect_to_database();
		Statement statement = obj.con.createStatement();
		String query = "select account.code from account "
				+ "where account.email = '" + email + "'";
        ResultSet resultSet = statement.executeQuery(query);
        // Hiển thị dữ liệu trong console
        while (resultSet.next()) {
            return resultSet.getString(1);
        }
        return "";
	}
	public String get_password_from_email(String email) throws SQLException {
		create_connect_available obj = new create_connect_available();
		obj.connect_to_database();
		Statement statement = obj.con.createStatement();
		String query = "select account.password from account "
				+ "where account.email = '" + email + "'";
        ResultSet resultSet = statement.executeQuery(query);
        // Hiển thị dữ liệu trong console
        while (resultSet.next()) {
            return resultSet.getString(1);
        }
        return "";
	}
	public static void main(String args[]) {
		sql obj = new sql();
		try {
			System.out.println(obj.get_id_from_email("1234"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
