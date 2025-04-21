# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Runtime
FROM public.ecr.aws/lambda/nodejs:22

COPY --from=build /app/dist /var/task

CMD [ "lambda.handler" ]