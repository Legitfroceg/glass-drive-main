import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

// Car status enum
export const CAR_STATUS = {
  AVAILABLE: "available",
  RENTED: "rented",
  MAINTENANCE: "maintenance",
  OUT_OF_SERVICE: "out_of_service",
} as const;

export const carStatusValidator = v.union(
  v.literal(CAR_STATUS.AVAILABLE),
  v.literal(CAR_STATUS.RENTED),
  v.literal(CAR_STATUS.MAINTENANCE),
  v.literal(CAR_STATUS.OUT_OF_SERVICE),
);
export type CarStatus = Infer<typeof carStatusValidator>;

// Booking status enum
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const bookingStatusValidator = v.union(
  v.literal(BOOKING_STATUS.PENDING),
  v.literal(BOOKING_STATUS.CONFIRMED),
  v.literal(BOOKING_STATUS.ACTIVE),
  v.literal(BOOKING_STATUS.COMPLETED),
  v.literal(BOOKING_STATUS.CANCELLED),
);
export type BookingStatus = Infer<typeof bookingStatusValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
      phone: v.optional(v.string()),
      address: v.optional(v.string()),
      driverLicense: v.optional(v.string()),
    })
      .index("email", ["email"]) // index for the email. do not remove or modify
      // Add index to query by role
      .index("by_role", ["role"]),

    // Cars table
    cars: defineTable({
      make: v.string(),
      model: v.string(),
      year: v.number(),
      color: v.string(),
      licensePlate: v.string(),
      status: carStatusValidator,
      pricePerHour: v.number(),
      pricePerDay: v.number(),
      location: v.string(),
      imageUrl: v.optional(v.string()),
      features: v.array(v.string()),
      fuelType: v.string(),
      transmission: v.string(),
      seats: v.number(),
      mileage: v.number(),
    })
      .index("by_status", ["status"])
      .index("by_location", ["location"])
      .index("by_make_model", ["make", "model"]),

    // Bookings table
    bookings: defineTable({
      userId: v.id("users"),
      carId: v.id("cars"),
      startDate: v.number(),
      endDate: v.number(),
      status: bookingStatusValidator,
      totalAmount: v.number(),
      pickupLocation: v.string(),
      dropoffLocation: v.string(),
      notes: v.optional(v.string()),
    })
      .index("by_user", ["userId"])
      .index("by_car", ["carId"])
      .index("by_status", ["status"])
      .index("by_start_date", ["startDate"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;