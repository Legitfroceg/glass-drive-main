import { getAuthUserId } from "@convex-dev/auth/server";
import { query, QueryCtx } from "./_generated/server";
import { mutation } from "./_generated/server";
import { ROLES } from "./schema";

/**
 * Get the current signed in user. Returns null if the user is not signed in.
 * Usage: const signedInUser = await ctx.runQuery(api.authHelpers.currentUser);
 * THIS FUNCTION IS READ-ONLY. DO NOT MODIFY.
 */
export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);

    if (user === null) {
      return null;
    }

    return user;
  },
});

/**
 * Use this function internally to get the current user data. Remember to handle the null user case.
 * @param ctx
 * @returns
 */
export const getCurrentUser = async (ctx: QueryCtx) => {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    return null;
  }
  return await ctx.db.get(userId);
};

// Initialize the current user: if no admin exists, make this user admin; otherwise, ensure they have a role
export const initializeUser = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not authenticated");
    }
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // If user already has a role, nothing to do
    if (user.role) {
      return user;
    }

    // Check if any admin exists
    const admins = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", ROLES.ADMIN))
      .take(1);

    const roleToSet = admins.length === 0 ? ROLES.ADMIN : ROLES.USER;

    await ctx.db.patch(userId, {
      role: roleToSet,
    });

    return { ...user, role: roleToSet };
  },
});