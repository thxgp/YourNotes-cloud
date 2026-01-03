/**
 * Clerk Authentication Service
 * Handles JWT verification and user session management
 */

const { createClerkClient } = require("@clerk/clerk-sdk-node");

// Initialize Clerk client with secret key
const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

/**
 * Verify a session token and return the session claims
 * @param {string} token - The session token from Authorization header
 * @returns {Promise<object>} - Verified session claims containing userId
 */
async function verifyToken(token) {
    try {
        const verifiedToken = await clerkClient.verifyToken(token);
        return verifiedToken;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        throw new Error("Invalid or expired token");
    }
}

/**
 * Get user details by user ID
 * @param {string} userId - Clerk user ID
 * @returns {Promise<object>} - User object
 */
async function getUser(userId) {
    try {
        const user = await clerkClient.users.getUser(userId);
        return user;
    } catch (error) {
        console.error("Failed to get user:", error.message);
        throw new Error("User not found");
    }
}

module.exports = {
    clerkClient,
    verifyToken,
    getUser,
};
