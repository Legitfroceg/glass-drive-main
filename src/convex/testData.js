import { mutation } from "./_generated/server";
import { CAR_STATUS } from "./schema";

export const seedTestData = mutation({
  args: {},
  handler: async (ctx) => {
    // Add test cars
    const cars = [
      {
        make: "Tesla",
        model: "Model 3",
        year: 2023,
        color: "Pearl White",
        licensePlate: "TSL-001",
        status: CAR_STATUS.AVAILABLE,
        pricePerHour: 25,
        pricePerDay: 180,
        location: "Downtown",
        imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
        features: ["Autopilot", "Premium Audio", "Glass Roof", "Heated Seats"],
        fuelType: "Electric",
        transmission: "Automatic",
        seats: 5,
        mileage: 15000,
      },
      {
        make: "BMW",
        model: "X5",
        year: 2022,
        color: "Space Gray",
        licensePlate: "BMW-002",
        status: CAR_STATUS.AVAILABLE,
        pricePerHour: 35,
        pricePerDay: 250,
        location: "Airport",
        imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        features: ["Leather Seats", "Navigation", "Sunroof", "Premium Sound"],
        fuelType: "Gasoline",
        transmission: "Automatic",
        seats: 7,
        mileage: 25000,
      },
      {
        make: "Mercedes",
        model: "C-Class",
        year: 2023,
        color: "Obsidian Black",
        licensePlate: "MER-003",
        status: CAR_STATUS.RENTED,
        pricePerHour: 30,
        pricePerDay: 220,
        location: "City Center",
        imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
        features: ["AMG Package", "Wireless Charging", "Ambient Lighting"],
        fuelType: "Gasoline",
        transmission: "Automatic",
        seats: 5,
        mileage: 12000,
      },
      {
        make: "Audi",
        model: "Q7",
        year: 2022,
        color: "Glacier White",
        licensePlate: "AUD-004",
        status: CAR_STATUS.MAINTENANCE,
        pricePerHour: 40,
        pricePerDay: 280,
        location: "Suburbs",
        imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
        features: ["Quattro AWD", "Virtual Cockpit", "Bang & Olufsen Audio"],
        fuelType: "Gasoline",
        transmission: "Automatic",
        seats: 7,
        mileage: 30000,
      },
    ];

    for (const car of cars) {
      await ctx.db.insert("cars", car);
    }

    return { message: "Test data seeded successfully", carsAdded: cars.length };
  },
});
