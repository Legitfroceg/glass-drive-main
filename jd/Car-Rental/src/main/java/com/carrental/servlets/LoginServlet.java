package com.carrental.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;

import com.carrental.util.DBUtil;
import com.google.gson.Gson;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public LoginServlet() {
        super();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Optional: return 405 Method Not Allowed if GET is not supported
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
        PrintWriter out = response.getWriter();
        out.print("{\"status\":\"fail\",\"message\":\"GET method not supported\"}");
    }

    @SuppressWarnings("unchecked")
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try (BufferedReader reader = request.getReader(); Connection con = DBUtil.getConnection()) {
            Gson gson = new Gson();
            Map<String, String> loginData = gson.fromJson(reader, Map.class);

            String email = loginData.get("email");
            String password = loginData.get("password");

            if (email == null || password == null) {
                out.print("{\"status\":\"fail\",\"message\":\"Email and password required\"}");
                return;
            }

            String sql = "SELECT * FROM users WHERE email=? AND password=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                out.print("{\"status\":\"success\",\"user\":\"" + rs.getString("name") + "\",\"role\":\"" + rs.getString("role") + "\"}");
            } else {
                out.print("{\"status\":\"fail\",\"message\":\"Invalid credentials\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.print("{\"status\":\"error\",\"message\":\"Server error\"}");
        }
    }
}
