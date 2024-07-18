# Use the official Bun.js image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb first to leverage Docker cache
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application files
COPY . .

# Expose the port (adjust the port number if necessary)
EXPOSE 3000

# Command to run the application
CMD ["bun", "server.js"]
