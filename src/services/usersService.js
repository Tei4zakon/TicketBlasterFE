import axios from "../api/axios.js";

export const usersService = {
  async fetchUsers(token) {
    try {
      const response = await axios.get("/api/users", {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[USERS_SERVICE] Failed to fetch users`, error);
      throw error;
    }
  },

  async fetchUserById(userId, token) {
    try {
      const response = await axios.get(`/api/users/${userId}`, {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[USERS_SERVICE] Failed to fetch user by ID: ${userId}`, error);
      throw error;
    }
  },

  async updateUserById(userId, userData, token) {
    try {
      const response = await axios.put(`/api/users/${userId}`, userData, {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[USERS_SERVICE] Failed to update user ID: ${userId}`, error);
      throw error;
    }
  },

  async deleteUserById(userId, deleted, token) {
    try {
      const response = await axios.patch(
        `/api/users/delete/${userId}`,
        { deleted },
        {
          headers: { "auth-token": token }
        }
      );
      return response;
    } catch (error) {
      console.error(`[USERS_SERVICE] Failed to ${deleted ? 'delete' : 'restore'} user ID: ${userId}`, error);
      throw error;
    }
  },

  async changeUserRoleById(userId, admin, token) {
    try {
      const response = await axios.patch(
        `/api/users/role/${userId}`,
        { admin },
        {
          headers: { "auth-token": token }
        }
      );
      return response;
    } catch (error) {
      console.error(`[USERS_SERVICE] Failed to change role for user ID: ${userId}`, error);
      throw error;
    }
  }
};