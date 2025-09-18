import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";
import { CAR_STATUS, ROLES } from "./schema";

// Get all cars
export const getAllCars = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cars").collect();
  },
});

// Get available cars
export const getAvailableCars = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("cars")
      .withIndex("by_status", (q) => q.eq("status", CAR_STATUS.AVAILABLE))
      .collect();
  },
});

// Get car by ID
export const getCarById = query({
  args: { carId: v.id("cars") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.carId);
  },
});

// Add new car (admin only)
export const addCar = mutation({
  args: {
    make: v.string(),
    model: v.string(),
    year: v.number(),
    color: v.string(),
    licensePlate: v.string(),
    pricePerHour: v.number(),
    pricePerDay: v.number(),
    location: v.string(),
    imageUrl: v.optional(v.string()),
    features: v.array(v.string()),
    fuelType: v.string(),
    transmission: v.string(),
    seats: v.number(),
    mileage: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== ROLES.ADMIN) {
      throw new Error("Unauthorized: Admin access required");
    }

    return await ctx.db.insert("cars", {
      ...args,
      status: CAR_STATUS.AVAILABLE,
    });
  },
});

// Update car status (admin only)
export const updateCarStatus = mutation({
  args: {
    carId: v.id("cars"),
    status: v.union(
      v.literal(CAR_STATUS.AVAILABLE),
      v.literal(CAR_STATUS.RENTED),
      v.literal(CAR_STATUS.MAINTENANCE),
      v.literal(CAR_STATUS.OUT_OF_SERVICE),
    ),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== ROLES.ADMIN) {
      throw new Error("Unauthorized: Admin access required");
    }

    await ctx.db.patch(args.carId, {
      status: args.status,
    });
  },
});

// Get cars by status (admin only)
export const getCarsByStatus = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user || user.role !== ROLES.ADMIN) {
      throw new Error("Unauthorized: Admin access required");
    }

    const cars = await ctx.db.query("cars").collect();
    
    return {
      available: cars.filter(car => car.status === CAR_STATUS.AVAILABLE).length,
      rented: cars.filter(car => car.status === CAR_STATUS.RENTED).length,
      maintenance: cars.filter(car => car.status === CAR_STATUS.MAINTENANCE).length,
      outOfService: cars.filter(car => car.status === CAR_STATUS.OUT_OF_SERVICE).length,
      total: cars.length,
      cars: cars,
    };
  },
});
