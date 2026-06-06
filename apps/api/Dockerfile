FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm
RUN npx prisma generate
RUN pnpm build

# Production runner
FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 4000
CMD ["node", "dist/index.js"]
