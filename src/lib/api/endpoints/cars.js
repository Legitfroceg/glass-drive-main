import { apiClient } from '../apiClient';


// JSDoc typedefs for Car and CarStats
/**
 * @typedef {Object} Car
 * @property {string} _id
 * @property {string} make
 * @property {string} model
 * @property {number} year
 * @property {string} color
 * @property {string} licensePlate
 * @property {'available'|'rented'|'maintenance'|'out_of_service'} status
 * @property {number} pricePerHour
 * @property {number} pricePerDay
 * @property {string} location
 * @property {string} [imageUrl]
 * @property {string[]} features
 * @property {string} fuelType
 * @property {string} transmission
 * @property {number} seats
 * @property {number} mileage
 */
/**
 * @typedef {Object} CarStats
 * @property {number} total
 * @property {number} available
 * @property {number} rented
 * @property {number} maintenance
 * @property {number} outOfService
 * @property {Car[]} cars
 */

export const carsApi = {
  getAvailable: async () => {
    return apiClient.get('/cars/available');
  },

  getStats: async () => {
    return apiClient.get('/cars/stats');
  },

  add: async (carData) => {
    return apiClient.post('/cars', carData);
  },

  updateStatus: async (carId, status) => {
    return apiClient.patch(`/cars/${carId}/status`, { status });
  },

  seedTestData: async () => {
    return apiClient.post('/admin/seed');
  },
};
