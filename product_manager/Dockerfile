# Base Image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application source
COPY . .

# Expose the ports
EXPOSE 4200 3001

# Install concurrently and json-server
RUN npm install -g concurrently
RUN npm install json-server --save-dev


# Command to start Angular and JSON Server
CMD ["concurrently", "npm run start", "npm run start:api"]
