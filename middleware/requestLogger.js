/**
 * Request Logger Middleware
 * Structured JSON logging for monitoring and observability (Stage 5)
 */

/**
 * Creates structured log entries for all HTTP requests
 * Logs: timestamp, method, path, status, response time, user ID (if authenticated)
 */
function requestLogger(req, res, next) {
    const startTime = Date.now();

    // Capture the original end function
    const originalEnd = res.end;

    res.end = function (chunk, encoding) {
        // Calculate response time
        const responseTime = Date.now() - startTime;

        // Build structured log entry
        const logEntry = {
            timestamp: new Date().toISOString(),
            level: res.statusCode >= 400 ? "error" : "info",
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            responseTimeMs: responseTime,
            userAgent: req.get("User-Agent") || "unknown",
            ip: req.ip || req.connection.remoteAddress,
        };

        // Add user ID if authenticated
        if (req.auth && req.auth.userId) {
            logEntry.userId = req.auth.userId;
        }

        // Output as JSON for easy parsing by log aggregators
        console.log(JSON.stringify(logEntry));

        // Call original end function
        originalEnd.call(this, chunk, encoding);
    };

    next();
}

module.exports = { requestLogger };
