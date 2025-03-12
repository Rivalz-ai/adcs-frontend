# Production stage
FROM node:20-slim

WORKDIR /src

RUN apt update && apt install -y git curl unzip
RUN curl -fsSL https://bun.sh/install | BUN_INSTALL=/usr bash

# Copy built files from builder stage
COPY . .

# Install production dependencies only
RUN bun install

RUN bun run build

# Set the entrypoint
ENTRYPOINT ["bun", "start"]
