#!/bin/bash

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Docker is not running. Starting Docker..."
  sudo systemctl start docker
  if ! docker info > /dev/null 2>&1; then
    echo "Failed to start Docker. Exiting."
    exit 1
  fi
  echo "Docker started successfully."
else
  echo "Docker is already running."
fi

# Prompt for commit message
read -p "Enter commit message: " commit_message

# Build the Docker image for the amd64 platform
docker build --platform linux/amd64 -t omkokate2902/car-rental-dev:latest .

# Push the Docker image to Docker Hub
docker push omkokate2902/car-rental-dev:latest

# Add changes, commit, and push to Git
git add .
git commit -m "$commit_message"
git push origin dev

# Clean up stopped containers and unused images
# docker system prune -a -f

# To execute: ./deploy.sh