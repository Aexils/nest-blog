FROM node:22.14.0-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22.14.0-alpine AS runtime

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

RUN npm ci --omit=dev

ARG PORT=3000
ENV PORT=${PORT}

ARG DB_HOST
ENV DB_HOST=${DB_HOST}

ARG DB_PORT
ENV DB_PORT=${DB_PORT}

ARG DB_USER
ENV DB_USER=${DB_USER}

ARG DB_PASSWORD
ENV DB_PASSWORD=${DB_PASSWORD}

ARG DB_NAME
ENV DB_NAME=${DB_NAME}

ARG MAIL_HOST
ENV MAIL_HOST=${MAIL_HOST}

ARG MAIL_PORT
ENV MAIL_PORT=${MAIL_PORT}

EXPOSE ${PORT}

CMD ["node", "dist/main"]

