
import { apiClient } from '../apiClient';
// JSDoc typedefs for Booking and CreateBookingData
/**
 * @typedef {Object} Booking
 * @property {string} _id
 * @property {string} userId
 * @property {string} carId
 * @property {number} startDate
 * @property {number} endDate
 * @property {'pending'|'confirmed'|'active'|'completed'|'cancelled'} status
 * @property {number} totalAmount
 * @property {string} pickupLocation
 * @property {string} dropoffLocation
 * @property {string} [notes]
 * @property {Object} [car]
 * @property {Object} [user]
 */
/**
 * @typedef {Object} CreateBookingData
 * @property {string} carId
 * @property {number} startDate
 * @property {number} endDate
 * @property {string} pickupLocation
 * @property {string} dropoffLocation
 * @property {string} [notes]
 */

export const bookingsApi = {
  getUserBookings: async () => {
    return apiClient.get('/bookings/me');
  },

  getAllBookings: async () => {
    return apiClient.get('/bookings');
  },

  create: async (bookingData) => {
    const result = await apiClient.post('/bookings', bookingData);
    return result.id;
  },
};
