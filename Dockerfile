# Use the official Bun.js image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy the application files
COPY . .

# Install dependencies
RUN bun install

# Expose the port (adjust the port number if necessary)
EXPOSE 3000

# Command to run the application
CMD ["bun", "server.js"]
