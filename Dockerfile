# Build stage
FROM node:alpine as build-frontend

WORKDIR /frontend
COPY /frontend/package.json /frontend/package-lock.json ./
RUN npm install
COPY /frontend ./
RUN npm run build

FROM node:alpine as build-backend

WORKDIR /backend
COPY /backend/package.json /backend/package-lock.json ./
RUN npm install
COPY /backend ./
RUN npm run build

COPY --from=build-frontend /frontend/build /backend/static

# Deploy stage
FROM node:alpine as deploy

WORKDIR /backend

COPY --from=build-backend /backend ./

EXPOSE 80
ENV NODE_ENV production
ENV PORT 80

ENTRYPOINT ["npm", "start"]
