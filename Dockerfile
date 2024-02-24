# Use the node:20.5.1-bookworm-slim image as the base image
FROM node:20.5.1-bookworm-slim

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json from the host to the container's working directory
COPY package.json package-lock.json ./

# Install Node.js dependencies using npm ci (clean install)
RUN npm ci

# Copy the application code from the host to the container's working directory
COPY . .

# Install Chrome browser for use with Playwright
RUN npx playwright install chrome

# Here, we run the test script defined in package.json (npm run test:serial)
CMD ["npm", "run", "test:serial"]