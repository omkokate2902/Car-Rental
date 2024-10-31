# Use an official Node.js runtime as a parent image
FROM --platform=linux/amd64 node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Optionally set environment variables
# ENV NODE_ENV=production

# Create a non-root user and switch to it
# RUN useradd -ms /bin/bash appuser
# USER appuser

# Define the command to run the app
CMD ["node", "app.js"]