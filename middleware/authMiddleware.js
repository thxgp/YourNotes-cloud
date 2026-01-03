/**
 * Authentication Middleware
 * Protects routes by validating Clerk JWT tokens
 */

const { verifyToken } = require("../services/clerk");

/**
 * Middleware to require authentication
 * Validates the Bearer token from Authorization header
 * Attaches user info to req.auth on success
 */
async function requireAuth(req, res, next) {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "No authorization header provided",
            });
        }

        // Extract Bearer token
        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Invalid authorization header format. Use: Bearer <token>",
            });
        }

        const token = parts[1];

        // Verify the token with Clerk
        const claims = await verifyToken(token);

        // Attach user info to request for downstream handlers
        req.auth = {
            userId: claims.sub,
            sessionId: claims.sid,
            claims: claims,
        };

        next();
    } catch (error) {
        console.error("Authentication failed:", error.message);
        return res.status(401).json({
            error: "Unauthorized",
            message: "Invalid or expired token",
        });
    }
}

module.exports = {
    requireAuth,
};
