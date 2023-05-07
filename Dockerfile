FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY frontend/package*.json frontend/
RUN npm run frontend-install --only=production

COPY backend/package*.json backend/
RUN npm run backend-install --only=production

COPY frontend/ frontend/
RUN npm run build --prefix frontend

COPY backend/ backend/

USER node

CMD ["npm","start","--prefix","backend"]

ENV PORT 8080

EXPOSE $PORT


