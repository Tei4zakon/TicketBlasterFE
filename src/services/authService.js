import axios from "../api/axios.js";

const AUTH_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register", 
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password"
};

export const authService = {
  async loginUser(credentials) {
    try {
      const response = await axios.post(
        AUTH_ENDPOINTS.LOGIN,
        JSON.stringify(credentials),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.error(`[AUTH_SERVICE] Login failed for: ${credentials.email}`, error);
      throw error;
    }
  },

  async registerUser(userData) {
    try {
      const response = await axios.post(
        AUTH_ENDPOINTS.REGISTER,
        JSON.stringify(userData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.error(`[AUTH_SERVICE] Registration failed for: ${userData.email}`, error);
      throw error;
    }
  },

  async requestPasswordReset(email) {
    try {
      const response = await axios.post(
        AUTH_ENDPOINTS.FORGOT_PASSWORD,
        JSON.stringify({ email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.error(`[AUTH_SERVICE] Password reset request failed for: ${email}`, error);
      throw error;
    }
  },

  async resetUserPassword(resetData) {
    try {
      const response = await axios.post(
        AUTH_ENDPOINTS.RESET_PASSWORD,
        JSON.stringify(resetData),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.error(`[AUTH_SERVICE] Password reset failed`, error);
      throw error;
    }
  }
};