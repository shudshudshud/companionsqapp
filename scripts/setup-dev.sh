#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting up CompanionSquared development environment...${NC}"

# Check for required tools
command -v node >/dev/null 2>&1 || { echo "Node.js is required but not installed. Aborting."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm is required but not installed. Aborting."; exit 1; }
command -v psql >/dev/null 2>&1 || { echo "PostgreSQL is required but not installed. Aborting."; exit 1; }

# Create .env files
echo -e "${BLUE}Creating environment files...${NC}"
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Install backend dependencies
echo -e "${BLUE}Installing backend dependencies...${NC}"
cd backend
npm install

# Set up database
echo -e "${BLUE}Setting up database...${NC}"
psql -U postgres -c "CREATE DATABASE companionsquared;" || true
psql -U postgres -d companionsquared -f sql/schema.sql
psql -U postgres -d companionsquared -f sql/seeds.sql

# Install frontend dependencies
echo -e "${BLUE}Installing frontend dependencies...${NC}"
cd ../frontend
npm install

echo -e "${GREEN}Setup complete!${NC}"
echo -e "To start the development servers:"
echo -e "1. Backend: cd backend && npm run dev"
echo -e "2. Frontend: cd frontend && npm start" 