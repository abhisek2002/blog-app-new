FROM node:20-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 5174

# Start frontend development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5174"]
