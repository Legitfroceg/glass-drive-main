
import { apiClient } from '../apiClient';

// JSDoc typedef for User
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} [name]
 * @property {'admin'|'user'} role
 */


export const authApi = {
  // OTP methods (deprecated)
  requestOtp: async (email) => {
    return apiClient.post('/auth/otp/request', { email });
  },

  verifyOtp: async (email, code) => {
    return apiClient.post('/auth/otp/verify', { email, code });
  },

  // Username/password login
  login: async (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },

  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  },

  signOut: async () => {
    return apiClient.post('/auth/signout');
  },

  initializeUser: async () => {
    return apiClient.post('/users/initialize');
  },
};
