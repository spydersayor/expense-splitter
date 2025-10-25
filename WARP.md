# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Development Commands

### Quick Start
```bash
# Windows - Start entire application with Docker
start.bat

# Linux/Mac - Start entire application with Docker  
chmod +x start.sh && ./start.sh

# Local development without Docker
npm run start:local
```

### Frontend Development (React/TypeScript)
```bash
# Navigate to frontend directory first
cd frontend

# Development server (Vite)
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Run with backend (from frontend dir)
npm run dev:fullstack
```

### Backend Development (Spring Boot)
```bash
# Navigate to backend directory first  
cd backend

# Development server
./mvnw spring-boot:run

# Development with dev profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Run tests
./mvnw test

# Build JAR
./mvnw package

# Clean build
./mvnw clean package
```

### Docker Operations
```bash
# Start all services
docker-compose up -d

# Start with rebuild
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service_name]
```

## Architecture Overview

This is a full-stack expense splitting application with clear separation between frontend and backend.

### Overall Structure
```
Frontend (React/TypeScript) ↔ Backend (Spring Boot) ↔ Database (PostgreSQL)
Port 3000                     Port 8080              Port 5432
```

### Frontend Architecture (React + TypeScript)
- **Framework**: React 18 with TypeScript and Vite
- **State Management**: React Query (@tanstack/react-query) for server state, React Context for auth
- **Routing**: React Router with lazy loading and route guards
- **Styling**: Tailwind CSS with responsive design
- **Forms**: React Hook Form with Zod validation
- **HTTP**: Axios for API calls
- **Structure**: Feature-based organization

**Key Frontend Directories:**
- `src/app/` - App configuration (providers, routes, layout, auth guards)
- `src/features/` - Feature modules (auth, groups, expenses, balances, settlements)
- `src/components/` - Shared UI components
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions
- `src/lib/` - Utility libraries and configurations

**Frontend Data Flow:**
1. React Query manages server state and caching
2. AuthContext provides JWT token management
3. Route guards protect authenticated pages
4. Feature modules are lazy-loaded for performance

### Backend Architecture (Spring Boot)
- **Framework**: Spring Boot 3.2.5 with Java 17
- **Security**: Spring Security with JWT authentication
- **Data**: Spring Data JPA with PostgreSQL
- **Migrations**: Flyway for database schema management
- **Architecture**: RESTful API following MVC pattern

**Key Backend Package Structure:**
```
com.esplit.backend/
├── auth/           # JWT services, authentication
├── config/         # Spring configuration classes  
├── exception/      # Global exception handling
├── user/           # User entity, repository, services
├── group/          # Group management and balances
├── expense/        # Expense tracking and sharing
└── settlement/     # Settlement calculations
```

**Backend Layers:**
1. **Controllers** (@RestController) - REST API endpoints
2. **Services** (@Service) - Business logic layer
3. **Repositories** (@Repository) - Data access layer using Spring Data JPA
4. **Entities** (@Entity) - JPA entity models

### Data Flow & Key Concepts

**Authentication Flow:**
1. User registers/logs in through frontend
2. Backend validates credentials and returns JWT
3. Frontend stores JWT in context and includes in API headers
4. Protected routes require valid JWT

**Expense Splitting Flow:**
1. Users create groups and add members
2. Group members add expenses with specified split rules
3. Backend calculates individual balances and optimal settlements
4. Frontend displays real-time balances and settlement suggestions

### API Patterns
- RESTful endpoints following `/api/{resource}` pattern
- JWT Bearer authentication for protected endpoints
- Consistent DTO pattern for API responses
- Global exception handling with proper HTTP status codes

### Database Schema
- Users can belong to multiple groups (many-to-many)
- Expenses belong to groups with customizable split rules
- Balance calculations derived from expense shares
- Settlement tracking for payment history

## Environment Setup

### Required Environment Variables

**Frontend (.env in frontend/ directory):**
```env
VITE_BASE_URL=http://localhost:8080
```

**Backend (system environment or .env):**
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/expense_splitter
DATABASE_USERNAME=postgres  
DATABASE_PASSWORD=postgres
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Port Usage
- **3000**: Frontend development server
- **8080**: Backend API server  
- **5432**: PostgreSQL database
- **5050**: PgAdmin (Docker setup only)
- **5173**: Alternative Vite dev server port

## Testing Strategy

### Frontend Testing
```bash
cd frontend
npm run typecheck  # TypeScript validation
npm run lint       # ESLint checks
npm run build      # Production build validation
```

### Backend Testing  
```bash
cd backend
./mvnw test        # Unit and integration tests
./mvnw package     # Full build with tests
```

## Development Workflow

1. **Database First**: Ensure PostgreSQL is running and database exists
2. **Backend Second**: Start Spring Boot backend API
3. **Frontend Last**: Start React development server
4. **Or Use Docker**: Single command startup with `start.bat`/`start.sh`

## Key Dependencies & Versions

**Frontend:**
- React 18.3.1, TypeScript 5.5.3, Vite 7.1.9
- React Query 5.90.2, React Router 7.9.3
- Tailwind CSS 3.4.1, React Hook Form 7.64.0

**Backend:**  
- Spring Boot 3.2.5, Java 17
- Spring Security, Spring Data JPA
- PostgreSQL driver, Flyway migrations
- JWT (jjwt) 0.11.5, Lombok 1.18.32

## Deployment Configuration

The application supports multiple deployment strategies:
- **Development**: Local with Docker Compose
- **Production**: Frontend on Vercel, Backend on Railway
- **Manual**: Individual service deployment with environment variables