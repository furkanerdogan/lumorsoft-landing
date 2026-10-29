# syntax=docker/dockerfile:1
# Lumorsoft — Next.js (standalone) üretim imajı

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# 1) Bağımlılıklar
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# 2) Derleme
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Sayfalar derlemede statik üretilir; blog yazılarının ilk derlemede de görünmesi için
# Supabase bilgileri build argümanı olarak verilir (Dokploy: Build-time Arguments).
# Verilmezse blog ilk istekte (60 sn içinde) çalışma zamanı ortam değişkenleriyle dolar.
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
ENV SUPABASE_URL=$SUPABASE_URL SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
RUN npm run build

# 3) Çalıştırma
FROM base AS runner
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/robots.txt >/dev/null || exit 1

CMD ["node", "server.js"]
