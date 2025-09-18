
// JSDoc typedef for DataSource
/**
 * @typedef {Object} DataSource
 * @property {function(string): Promise<void>} signInEmailOtp
 * @property {function(string, string): Promise<void>} verifyEmailOtp
 * @property {function(): Promise<void>} signOut
 * @property {function(): Promise<Object|null>} getCurrentUser
 * @property {function(): Promise<Object>} initializeUser
 * @property {function(): Promise<Array>} getAvailableCars
 * @property {function(): Promise<Object>} getCarStats
 * @property {function(Object): Promise<string>} addCar
 * @property {function(string, string): Promise<void>} updateCarStatus
 * @property {function(): Promise<Object>} seedTestData
 * @property {function(): Promise<Array>} getUserBookings
 * @property {function(): Promise<Array>} getAllBookings
 * @property {function(Object): Promise<string>} createBooking
 */
