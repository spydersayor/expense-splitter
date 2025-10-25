# Expense Splitter - Setup Guide

## Overview
This is a full-stack expense splitting application with React frontend and Spring Boot backend.

## Prerequisites
- Node.js 18+ and npm
- Java 17+
- Maven 3.6+
- PostgreSQL 12+ (or Docker)

## Quick Start with Docker

1. **Clone and setup environment variables:**
   ```bash
   # Copy the environment template
   cp frontend/env.example frontend/.env
   
   # Edit the .env file if needed (defaults should work for local development)
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Database: localhost:5432
   - PgAdmin: http://localhost:5050 (admin@example.com / admin)

## Manual Setup

### Backend Setup

1. **Database Setup:**
   ```bash
   # Create PostgreSQL database
   createdb expense_splitter
   
   # Or using psql
   psql -U postgres -c "CREATE DATABASE expense_splitter;"
   ```

2. **Environment Variables:**
   ```bash
   export DATABASE_URL="jdbc:postgresql://localhost:5432/expense_splitter"
   export DATABASE_USERNAME="postgres"
   export DATABASE_PASSWORD="your_password"
   export JWT_SECRET="your-secret-key-here"
   export JWT_EXPIRATION="86400000"
   export CORS_ORIGINS="http://localhost:3000,http://localhost:5173"
   ```

3. **Run Backend:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. **Environment Variables:**
   ```bash
   # Create .env file
   echo "VITE_BASE_URL=http://localhost:8080" > .env
   ```

2. **Install Dependencies and Run:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Development Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript checks
- `npm run lint` - Run ESLint

### Backend
- `./mvnw spring-boot:run` - Run development server
- `./mvnw test` - Run tests
- `./mvnw package` - Build JAR file

### Full Stack
- `npm run dev:fullstack` - Run both frontend and backend

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Groups
- `GET /api/groups` - Get all groups
- `POST /api/groups` - Create new group
- `POST /api/groups/{id}/members` - Add member to group

### Expenses
- `GET /api/expenses` - Get expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/{id}` - Update expense
- `DELETE /api/expenses/{id}` - Delete expense

### Balances
- `GET /api/groups/{id}/balances` - Get group balances

### Settlements
- `GET /api/settlements` - Get settlements
- `POST /api/settlements` - Create settlement

## Database Schema

The application uses Flyway for database migrations. The initial schema includes:
- `users` - User accounts
- `groups` - Expense groups
- `group_members` - Group membership
- `expenses` - Individual expenses
- `expense_shares` - How expenses are split
- `settlements` - Settlement records

## Security Features

- JWT-based authentication
- Password hashing with BCrypt
- CORS configuration
- Input validation
- Global exception handling

## Troubleshooting

### Common Issues

1. **Database Connection Issues:**
   - Ensure PostgreSQL is running
   - Check database credentials
   - Verify database exists

2. **CORS Issues:**
   - Check CORS_ORIGINS environment variable
   - Ensure frontend URL is included

3. **Build Issues:**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Clear Maven cache: `./mvnw clean`

4. **Port Conflicts:**
   - Backend: 8080
   - Frontend: 3000 (dev) / 5173 (Vite)
   - Database: 5432
   - PgAdmin: 5050

## Production Deployment

1. **Environment Variables:**
   - Set strong JWT_SECRET
   - Use production database
   - Configure proper CORS origins

2. **Build:**
   ```bash
   # Frontend
   cd frontend && npm run build
   
   # Backend
   cd backend && ./mvnw package -DskipTests
   ```

3. **Deploy:**
   - Use Docker containers
   - Configure reverse proxy (nginx)
   - Set up SSL certificates
   - Configure monitoring

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Use conventional commit messages
