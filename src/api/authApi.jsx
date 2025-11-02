import { api } from "../config/properties";
import axios from 'axios';

export const LogInUser = (email, password) => {
  const data = { email, password };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json,text/plain,*/*",
    },
  };

  return axios
    .post(`${api.localRoute}/login`, data, config)
    .catch((err) => Promise.reject(err));
};
