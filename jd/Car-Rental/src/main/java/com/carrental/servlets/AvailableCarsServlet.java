package com.carrental.servlets;

import com.carrental.util.DBUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Servlet to fetch available cars
 */
@WebServlet("/cars/available")
public class AvailableCarsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public AvailableCarsServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try (Connection con = DBUtil.getConnection()) {
            String sql = "SELECT id, make, model, year, price_per_hour, status, image_url FROM cars WHERE status='available'";
            PreparedStatement ps = con.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();

            StringBuilder sb = new StringBuilder();
            sb.append("[");
            while (rs.next()) {
                sb.append("{");
                sb.append("\"id\":").append(rs.getInt("id")).append(",");
                sb.append("\"make\":\"").append(rs.getString("make")).append("\",");
                sb.append("\"model\":\"").append(rs.getString("model")).append("\",");
                sb.append("\"year\":").append(rs.getInt("year")).append(",");
                sb.append("\"price_per_hour\":").append(rs.getDouble("price_per_hour")).append(",");
                sb.append("\"status\":\"").append(rs.getString("status")).append("\",");
                sb.append("\"image_url\":\"").append(rs.getString("image_url")).append("\"");
                sb.append("},");
            }
            if (sb.charAt(sb.length() - 1) == ',') sb.deleteCharAt(sb.length() - 1);
            sb.append("]");
            out.print(sb.toString());

        } catch (Exception e) {
            e.printStackTrace();
            out.print("{\"status\":\"error\",\"message\":\"Server error\"}");
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
