# Dockerfile for React client
FROM node:14-alpine

# Set the working directory to /app/client
WORKDIR /app/client

# Copy the package.json and package-lock.json files to the container
COPY /package*.json ./

# Install the dependencies
RUN npm install --silent

# Copy the client code to the container
COPY . .

# Set the port that the container will listen on
EXPOSE 8000

# Start the application
CMD ["node", "server/server.js"]
