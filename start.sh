#!/bin/bash

# Expense Splitter - Single Command Startup Script
# This script sets up and runs the entire application stack

set -e

echo "🚀 Starting Expense Splitter Application..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists, create if not
if [ ! -f "frontend/.env" ]; then
    print_status "Creating frontend environment file..."
    cp frontend/env.example frontend/.env
    print_success "Frontend environment file created"
fi

# Create backend environment file
if [ ! -f "backend/.env" ]; then
    print_status "Creating backend environment file..."
    cat > backend/.env << EOF
DATABASE_URL=jdbc:postgresql://db:5432/expense_splitter
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET=ThisIsA256BitSecretKey_ChangeThisToYourOwnRandomLongKey123456
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
EOF
    print_success "Backend environment file created"
fi

# Stop any existing containers
print_status "Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Build and start services
print_status "Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
print_status "Waiting for services to start..."
sleep 10

# Check if services are running
print_status "Checking service health..."

# Check database
if docker-compose exec -T db pg_isready -U postgres > /dev/null 2>&1; then
    print_success "Database is ready"
else
    print_warning "Database might not be ready yet"
fi

# Check backend
if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
    print_success "Backend is ready"
else
    print_warning "Backend might not be ready yet (this is normal for first startup)"
fi

# Check frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    print_success "Frontend is ready"
else
    print_warning "Frontend might not be ready yet"
fi

echo ""
print_success "🎉 Expense Splitter is starting up!"
echo ""
echo "📱 Application URLs:"
echo "   Frontend:    http://localhost:3000"
echo "   Backend API: http://localhost:8080"
echo "   Database:    localhost:5432"
echo "   PgAdmin:     http://localhost:5050 (admin@example.com / admin)"
echo ""
echo "📋 Useful Commands:"
echo "   View logs:    docker-compose logs -f"
echo "   Stop app:     docker-compose down"
echo "   Restart:      docker-compose restart"
echo "   Clean up:     docker-compose down -v"
echo ""
print_status "Services are starting in the background. It may take a minute for all services to be fully ready."
print_status "You can check the logs with: docker-compose logs -f"
