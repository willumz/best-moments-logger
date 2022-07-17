FROM node:alpine

# Set environment variables

ENV NODE_ENV production
ENV PORT 80

# Expose ports

EXPOSE 80

# Build frontend

WORKDIR /frontend

COPY /frontend/package.json ./

RUN npm install --production

COPY /frontend .

RUN npm run build

COPY /frontend/build .

# Build backend

WORKDIR /backend

COPY /backend/package.json ./

RUN npm install --production

COPY /backend .

RUN npm run build

# Copy react build to static dir

COPY /frontend/build /backend/static

# Clean up unncesseary files

RUN rm -rf /frontend

# Run backend

ENTRYPOINT [ "npm", "start" ]