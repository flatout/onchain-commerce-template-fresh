#!/bin/zsh

# Colors for better visibility
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print the current directory
echo "${BLUE}Current directory:${NC}"
pwd

# The correct project directory
PROJECT_DIR="/Users/carculture/CoinbaseDevPlatform/CaroftheDay_with_identity_backup"

# Check if we're in the right directory
if [ "$PWD" != "$PROJECT_DIR" ]; then
    echo "${RED}We're in the wrong directory!${NC}"
    echo "${GREEN}Changing to:${NC} $PROJECT_DIR"
    cd "$PROJECT_DIR"
    echo "${BLUE}Now in:${NC}"
    pwd
fi

# Clean previous build
echo "${BLUE}Cleaning previous build...${NC}"
rm -rf .next

# Clean node_modules and reinstall dependencies
echo "${BLUE}Cleaning node_modules and reinstalling dependencies...${NC}"
rm -rf node_modules
npm install

# Build the project
echo "${GREEN}Building the project...${NC}"
npm run build 