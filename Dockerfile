FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production

FROM builder AS final
WORKDIR /app
COPY . .
EXPOSE 8080
CMD [ "node", "./index.js" ]