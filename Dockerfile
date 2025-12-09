# You can either REMOVE this line:
ARG NODE_VERSION=22.18.0

# Or actually use it like this:
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

# 1) Copy package files
COPY package*.json ./

# 2) Install ALL dependencies (including devDeps for TypeScript)
RUN npm install

# 3) Copy the rest of the app
COPY . .

# 4) Build TypeScript -> dist/
RUN npm run build

# 5) Remove devDependencies for smaller image (optional but nice)
# RUN npm prune --production

# 6) Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app
USER nodejs

# 7) Expose the port your Express app uses
EXPOSE 4000

# 9) Start the application
# This assumes: "start": "node dist/server.js" in package.json
CMD ["npm", "start"]
