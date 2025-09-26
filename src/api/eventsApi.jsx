import { api } from "../config/properties.jsx";
import axios from "axios";

export const getEvents = async () => {
    try {
      const res = await axios.get(`${api.localRoute}/`); 
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
