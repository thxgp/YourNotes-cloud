# Hardened Dockerfile for SecureNotes Cloud
# Uses minimal Alpine base and runs as non-root user

# Stage 1: Build dependencies
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Stage 2: Production image
FROM node:20-alpine AS production

# Security: Add labels for container identification
LABEL maintainer="SecureNotes Team"
LABEL version="1.0.0"
LABEL description="Secure Notes Cloud API - Hardened Container"

# Security: Create non-root user and group
# Alpine already has 'node' user from base image
WORKDIR /app

# Security: Change ownership of workdir to node user
RUN chown -R node:node /app

# Copy production dependencies from builder
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

# Copy application code (respects .dockerignore)
COPY --chown=node:node package*.json ./
COPY --chown=node:node server.js ./
COPY --chown=node:node app/ ./app/
COPY --chown=node:node routes/ ./routes/
COPY --chown=node:node services/ ./services/
COPY --chown=node:node middleware/ ./middleware/

# Security: Switch to non-root user
USER node

# Security: Set NODE_ENV to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000), (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Expose port (documentation only)
EXPOSE 3000

# Start application
CMD ["node", "server.js"]
