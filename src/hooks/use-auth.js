import { useEffect, useState, useCallback } from "react";
import { authApi } from '@/lib/api/endpoints/auth';
import { apiClient } from '@/lib/api/apiClient'; // make sure this exists

export function useAuth() {
  const [state, setState] = useState({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const checkAuth = useCallback(async () => {
    try {
      const user = await authApi.getCurrentUser();
      setState({
        isLoading: false,
        isAuthenticated: true,
        user,
      });
    } catch (error) {
      setState({
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signIn = useCallback(async (provider, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');
    if (!email || !password) throw new Error('Email and password required');
    await authApi.login(email, password);
    await checkAuth();
  }, [checkAuth]);

  const signOut = useCallback(async () => {
    try {
      // Use the Vite proxy path, not the full /Car-Rental
      await apiClient.post("/car-rental/auth/signout");

      // Clear local client-side tokens if any (optional)
      localStorage.removeItem("token"); 
      sessionStorage.removeItem("token");

      // Force reload to login page
      window.location.href = "/auth";
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  }, []);

  return {
    ...state,
    signIn,
    signOut,
  };
}
