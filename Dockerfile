# Use the official Bun.js image
FROM oven/bun

# Set the working directory
WORKDIR /

# Copy the current directory contents into the container at /app
COPY . .

# Install dependencies
RUN bun install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run server.js using Bun.js
CMD ["bun", "server.js"]
