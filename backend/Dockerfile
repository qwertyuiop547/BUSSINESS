# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
