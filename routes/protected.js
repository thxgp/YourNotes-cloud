/**
 * Protected Routes
 * Test endpoints to verify authentication is working
 */

const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");

/**
 * GET /api/protected
 * Test endpoint that requires authentication
 * Returns the authenticated user's info
 */
router.get("/", requireAuth, (req, res) => {
    res.json({
        message: "Access granted to protected route",
        user: {
            userId: req.auth.userId,
            sessionId: req.auth.sessionId,
        },
    });
});

/**
 * GET /api/protected/me
 * Returns detailed user information
 */
router.get("/me", requireAuth, async (req, res) => {
    try {
        const { getUser } = require("../services/clerk");
        const user = await getUser(req.auth.userId);

        res.json({
            userId: user.id,
            email: user.emailAddresses?.[0]?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            createdAt: user.createdAt,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch user details",
            message: error.message,
        });
    }
});

module.exports = router;
