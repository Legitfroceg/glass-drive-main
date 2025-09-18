import { authApi } from '../api/endpoints/auth';
import { carsApi } from '../api/endpoints/cars';
import { bookingsApi } from '../api/endpoints/bookings';

export const restDataSource = {
  signInEmailOtp: async (email) => {
    await authApi.requestOtp(email);
  },

  verifyEmailOtp: async (email, code) => {
    await authApi.verifyOtp(email, code);
  },

  signOut: async () => {
    await authApi.signOut();
  },

  getCurrentUser: async () => {
    try {
      return await authApi.getCurrentUser();
    } catch (error) {
      return null;
    }
  },

  initializeUser: async () => {
    return await authApi.initializeUser();
  },

  getAvailableCars: async () => {
    return await carsApi.getAvailable();
  },

  getCarStats: async () => {
    return await carsApi.getStats();
  },

  addCar: async (carData) => {
    const result = await carsApi.add(carData);
    return result._id;
  },

  updateCarStatus: async (carId, status) => {
    await carsApi.updateStatus(carId, status);
  },

  seedTestData: async () => {
    return await carsApi.seedTestData();
  },

  getUserBookings: async () => {
    return await bookingsApi.getUserBookings();
  },

  getAllBookings: async () => {
    return await bookingsApi.getAllBookings();
  },

  createBooking: async (bookingData) => {
    return await bookingsApi.create(bookingData);
  },
};
