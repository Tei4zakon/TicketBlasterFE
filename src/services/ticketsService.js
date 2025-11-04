import axios from "../api/axios.js";

export const ticketsService = {
  async fetchUserTickets(userId, isPurchased) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/tickets/${userId}/${isPurchased}`, {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[TICKETS_SERVICE] Failed to fetch tickets for user: ${userId}`, error);
      throw error;
    }
  },

  async addTicketToCart(ticketData) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/tickets/cart-item", ticketData, {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[TICKETS_SERVICE] Failed to add tickets to cart for user: ${ticketData.user}`, error);
      throw error;
    }
  },

  async purchaseUserTickets(userId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`/api/tickets/purchase-ticket/${userId}`, {}, {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[TICKETS_SERVICE] Failed to purchase tickets for user: ${userId}`, error);
      throw error;
    }
  },

  async removeCartItem(ticketId) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/api/tickets/delete/${ticketId}`, {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[TICKETS_SERVICE] Failed to remove cart item ID: ${ticketId}`, error);
      throw error;
    }
  },

  async fetchTicketHistory(userId, searchQuery = "") {
    try {
      const token = localStorage.getItem("token");
      const searchParam = searchQuery.trim() ? `?search=${encodeURIComponent(searchQuery)}` : '';
      const response = await axios.get(`/api/tickets/history/${userId}${searchParam}`, {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[TICKETS_SERVICE] Failed to fetch ticket history for user: ${userId}`, error);
      throw error;
    }
  }
};