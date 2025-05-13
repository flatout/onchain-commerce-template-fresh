#!/bin/zsh

# Colors for better visibility
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# The correct project directory
PROJECT_DIR="/Users/carculture/CoinbaseDevPlatform/CaroftheDay_with_identity_backup"
PROJECT_NAME="CaroftheDay"
REQUIRED_PORT="3001"

# Function to show error and exit
error_exit() {
    echo "${RED}ERROR: $1${NC}"
    exit 1
}

# Print header
echo "${BLUE}==================================${NC}"
echo "${BLUE}   $PROJECT_NAME Development Server${NC}"
echo "${BLUE}==================================${NC}"

# Check if we're in the right directory
echo "${YELLOW}Checking directory...${NC}"
if [ "$PWD" != "$PROJECT_DIR" ]; then
    error_exit "Wrong directory!\nCurrent: $PWD\nRequired: $PROJECT_DIR\n\nPlease run this script from $PROJECT_DIR"
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    error_exit "package.json not found! Are you in the right directory?"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "${YELLOW}node_modules not found. Installing dependencies...${NC}"
    npm install || error_exit "Failed to install dependencies"
fi

# Kill any existing Node processes
echo "${YELLOW}Cleaning up existing Node processes...${NC}"
pkill -f node || true

# Clean .next directory
echo "${YELLOW}Cleaning build artifacts...${NC}"
rm -rf .next

# Set the port and start the server
echo "${GREEN}Starting development server on port $REQUIRED_PORT...${NC}"
PORT=$REQUIRED_PORT npm run dev 