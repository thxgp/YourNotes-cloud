const express = require("express");
const cors = require("cors");

// Import routes
const protectedRoutes = require("../routes/protected");
const notesRoutes = require("../routes/notes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    message: "SecureNotes Cloud API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/protected", protectedRoutes);
app.use("/api/notes", notesRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "production"
      ? "An unexpected error occurred"
      : err.message,
  });
});

module.exports = app;
