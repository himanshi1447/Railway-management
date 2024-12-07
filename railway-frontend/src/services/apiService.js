// src/services/apiService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";

const apiService = {
  // Authentication Endpoints
  register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
  login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),

  // Train Endpoints
  getTrainAvailability: (source, destination) =>
    axios.get(
      `${API_URL}/trains/availability?source=${source}&destination=${destination}`
    ),

  // Booking Endpoints
  bookSeat: (bookingData, token) =>
    axios.post(`${API_URL}/bookings/book`, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getUserBookings: (token) =>
    axios.get(`${API_URL}/bookings/my-bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default apiService;
