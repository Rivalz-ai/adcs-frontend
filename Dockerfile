# Production stage
FROM node:20-slim

WORKDIR /src

# Install git and enable corepack for Yarn version management
RUN apt update && apt install -y git && \
    corepack enable && \
    corepack prepare yarn@4.5.0 --activate

# Copy all project files
COPY . .

# Install dependencies using the correct Yarn version
RUN yarn install

# Build the application
RUN yarn build

# Set the entrypoint
ENTRYPOINT ["yarn", "start"]