package backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class TestDriver {
    public static void main(String[] args) {

        try {
            Class.forName("com.mysql.jdbc.Driver").getDeclaredConstructor().newInstance();
            System.out.println("successfully loaded.");
        } catch (Exception e) {
            System.out.println("Unable to load driver.");
            e.printStackTrace();
        }
        try {
            Connection c = DriverManager.getConnection("jdbc:mysql://localhost/project157a", "root",
                    "123456");

            Statement stm = c.createStatement();
            String sql = "CREATE TABLE USER" +
                    "(id INTEGER not NULL," +
                    "first VARCHAR(255)," +
                    "last  VARCHAR(255)," +
                    "age  INTEGER," +
                    "PRIMARY KEY (id))";
            stm.executeLargeUpdate(sql);
            System.out.println("Created table in the database");

        } catch (SQLException ex) {
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("Error:" + ex.getErrorCode());
        }
    }

}
