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
 * Servlet to fetch bookings for the current user
 */
@WebServlet("/bookings/me")
public class MyBookingsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public MyBookingsServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // For now, using a dummy user id
        int userId = 1; // Change this if you implement authentication

        try (Connection con = DBUtil.getConnection()) {
            String sql = "SELECT b.id, c.make, c.model, b.start_time, b.end_time, b.status " +
                         "FROM bookings b " +
                         "JOIN cars c ON b.car_id = c.id " +
                         "WHERE b.user_id=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();

            StringBuilder sb = new StringBuilder();
            sb.append("[");
            while (rs.next()) {
                sb.append("{");
                sb.append("\"id\":").append(rs.getInt("id")).append(",");
                sb.append("\"car_make\":\"").append(rs.getString("make")).append("\",");
                sb.append("\"car_model\":\"").append(rs.getString("model")).append("\",");
                sb.append("\"start_time\":\"").append(rs.getString("start_time")).append("\",");
                sb.append("\"end_time\":\"").append(rs.getString("end_time")).append("\",");
                sb.append("\"status\":\"").append(rs.getString("status")).append("\"");
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
