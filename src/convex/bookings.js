import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";
import { BOOKING_STATUS, CAR_STATUS } from "./schema";

// Create booking
export const createBooking = mutation({
  args: {
    carId: v.id("cars"),
    startDate: v.number(),
    endDate: v.number(),
    pickupLocation: v.string(),
    dropoffLocation: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("User must be authenticated");
    }

    // Check if car is available
    const car = await ctx.db.get(args.carId);
    if (!car || car.status !== CAR_STATUS.AVAILABLE) {
      throw new Error("Car is not available for booking");
    }

    // Calculate total amount (simplified calculation)
    const hours = (args.endDate - args.startDate) / (1000 * 60 * 60);
    const days = Math.ceil(hours / 24);
    const totalAmount = days > 1 ? days * car.pricePerDay : hours * car.pricePerHour;

    // Create booking
    const bookingId = await ctx.db.insert("bookings", {
      userId: user._id,
      carId: args.carId,
      startDate: args.startDate,
      endDate: args.endDate,
      status: BOOKING_STATUS.PENDING,
      totalAmount,
      pickupLocation: args.pickupLocation,
      dropoffLocation: args.dropoffLocation,
      notes: args.notes,
    });

    // Update car status to rented
    await ctx.db.patch(args.carId, {
      status: CAR_STATUS.RENTED,
    });

    return bookingId;
  },
});

// Get user bookings
export const getUserBookings = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }

    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    // Get car details for each booking
    const bookingsWithCars = await Promise.all(
      bookings.map(async (booking) => {
        const car = await ctx.db.get(booking.carId);
        return { ...booking, car };
      })
    );

    return bookingsWithCars;
  },
});

// Get all bookings (admin only)
export const getAllBookings = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    const bookings = await ctx.db.query("bookings").collect();
    
    // Get user and car details for each booking
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const car = await ctx.db.get(booking.carId);
        const bookingUser = await ctx.db.get(booking.userId);
        return { ...booking, car, user: bookingUser };
      })
    );

    return bookingsWithDetails;
  },
});
