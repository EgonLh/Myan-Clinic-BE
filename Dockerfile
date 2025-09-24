# 1. Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package.json first (better cache)
COPY package*.json ./

# Install deps
RUN npm install --legacy-peer-deps

# Copy everything
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS
RUN npm run build


# 2. Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only built app + node_modules + prisma client
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
