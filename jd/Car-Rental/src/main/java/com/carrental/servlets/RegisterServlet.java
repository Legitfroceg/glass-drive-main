package com.carrental.servlets;

import com.carrental.util.DBUtil;
import com.google.gson.Gson;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Map;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;

/**
 * Servlet implementation class RegisterServlet
 */
@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public RegisterServlet() {
        super();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Optional: return 405 Method Not Allowed for GET
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
            Map<String, String> userData = gson.fromJson(reader, Map.class);

            String email = userData.get("email");
            String password = userData.get("password");
            String name = userData.get("name");
            String role = userData.getOrDefault("role", "user");

            if (email == null || password == null) {
                out.print("{\"status\":\"fail\",\"message\":\"Email and password required\"}");
                return;
            }

            if (!role.equals("admin") && !role.equals("user")) role = "user";

            String sql = "INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, password);
            ps.setString(3, name);
            ps.setString(4, role);

            int result = ps.executeUpdate();
            if (result > 0) {
                out.print("{\"status\":\"success\",\"message\":\"User registered\"}");
            } else {
                out.print("{\"status\":\"fail\",\"message\":\"Registration failed\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.print("{\"status\":\"error\",\"message\":\"Server error\"}");
        }
    }
}
