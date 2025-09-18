package com.carrental.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;

@WebServlet("/auth/signout")
public class SignOutServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Invalidate the session if it exists
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // Clear JSESSIONID cookie for all paths
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("JSESSIONID".equals(cookie.getName())) {
                    cookie.setValue("");
                    cookie.setPath("/"); // match root path
                    cookie.setMaxAge(0); // expire immediately
                    cookie.setHttpOnly(true);
                    cookie.setSecure(false); // change to true if using HTTPS
                    response.addCookie(cookie);
                }
            }
        }

        response.setContentType("application/json");
        response.getWriter().write("{\"success\":true,\"message\":\"Signed out successfully\"}");
    }
}
