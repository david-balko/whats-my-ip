# Build
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .

FROM node:22-slim
WORKDIR /app

COPY --from=build /app/ ./

CMD ["node", "index.js"]
