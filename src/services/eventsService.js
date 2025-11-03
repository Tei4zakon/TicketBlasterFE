import axios from "../api/axios.js";

export const eventsService = {
  async fetchEventById(eventId) {
    try {
      const response = await axios.get(`/api/events/find/${eventId}`);
      return response;
    } catch (error) {
      console.error(`[EVENTS_SERVICE] Failed to fetch event by ID: ${eventId}`, error);
      throw error;
    }
  },

  async fetchEvents(filters = {}) {
    try {
      const response = await axios.get("/api/events", { params: filters });
      return response;
    } catch (error) {
      console.error(`[EVENTS_SERVICE] Failed to fetch events`, error);
      throw error;
    }
  },

  async fetchEventsByType(eventType, limit = null) {
    try {
      const params = { type: eventType };
      if (limit) params.limit = limit;
      
      const response = await axios.get("/api/events/type", { params });
      return response;
    } catch (error) {
      console.error(`[EVENTS_SERVICE] Failed to fetch ${eventType} events`, error);
      throw error;
    }
  },

  async fetchEventsByLocation(city) {
    try {
      const response = await axios.get(`/api/events/city/${city}`);
      return response;
    } catch (error) {
      console.error(`[EVENTS_SERVICE] Failed to fetch events for city: ${city}`, error);
      throw error;
    }
  },

  async fetchUpcomingEvents(limit = 1) {
    try {
      const response = await axios.get("/api/events/soonest", { params: { limit } });
      return response;
    } catch (error) {
      console.error(`[EVENTS_SERVICE] Failed to fetch upcoming events`, error);
      throw error;
    }
  },

  async searchEvents(searchQuery) {
    try {
      const response = await axios.get(`/api/events?search=${searchQuery}`);
      return response;
    } catch (error) {
      console.error(`[EVENTS_SERVICE] Failed to search events with query: ${searchQuery}`, error);
      throw error;
    }
  },

  async createEvent(eventData, token) {
    try {
      const response = await axios.post("/api/events", eventData, {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[EVENTS_SERVICE] Failed to create event`, error);
      throw error;
    }
  },

  async updateEvent(eventId, eventData, token) {
    try {
      const response = await axios.put(`/api/events/${eventId}`, eventData, {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[EVENTS_SERVICE] Failed to update event ID: ${eventId}`, error);
      throw error;
    }
  },

  async deleteEvent(eventId, token) {
    try {
      const response = await axios.delete(`/api/events/${eventId}`, {
        headers: { "auth-token": token }
      });
      return response;
    } catch (error) {
      console.error(`[EVENTS_SERVICE] Failed to delete event ID: ${eventId}`, error);
      throw error;
    }
  }
};