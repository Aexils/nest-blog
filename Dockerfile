# 🧱 Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 🐳 Production image (Lambda compatible)
FROM public.ecr.aws/lambda/nodejs:22

WORKDIR /var/task

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY lambda.js ./

# ❗ Définit le handler : fichier lambda.js exporte une fonction `handler`
CMD [ "lambda.handler" ]
