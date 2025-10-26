# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Spring Boot 3.2.5 backend for an expense splitter application using JWT authentication, PostgreSQL with Flyway migrations, and JPA/Hibernate for data access.

**Tech Stack:**
- Java 17
- Spring Boot 3.2.5 (Web, Security, Data JPA, Validation)
- PostgreSQL with Flyway migrations
- JWT authentication (io.jsonwebtoken 0.11.5)
- Lombok for boilerplate reduction
- Maven build system

## Development Commands

### Build & Run
```bash
# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run

# Build without tests
./mvnw clean install -DskipTests

# Run with verbose error output
./mvnw spring-boot:run -e
```

### Testing
```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=ClassNameTest

# Run tests with coverage
./mvnw clean test jacoco:report
```

### Database
The application requires PostgreSQL to be running. Default credentials are in `application.properties`:
- **URL:** `jdbc:postgresql://localhost:5432/expense_splitter`
- **Username:** `postgres`
- **Password:** `postgres`

Override via environment variables: `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`

Flyway migrations are in `src/main/resources/db/migration/`. The schema includes:
- `users` - User accounts
- `groups` - Expense groups
- `group_members` - Many-to-many relationship
- `expenses` - Expense records
- `expense_shares` - How expenses are split
- `settlements` - Payment settlements between users

## Architecture

### Package Structure
```
com.esplit.backend/
├── BackendApplication.java          # Main entry point
├── auth/                             # Authentication & JWT
│   ├── SecurityConfig.java          # Spring Security configuration
│   ├── JwtAuthFilter.java           # JWT token validation filter
│   ├── JwtService.java              # JWT generation/validation
│   ├── CustomUserDetailsService.java # User loading for auth
│   └── AuthController.java          # /api/auth/** endpoints
├── config/
│   └── CorsConfig.java              # CORS configuration
├── exception/                        # Global exception handling
│   └── GlobalExceptionHandler.java  # @RestControllerAdvice
├── user/                             # User domain
│   ├── User.java                    # JPA entity
│   ├── UserRepo.java                # Spring Data repository
│   └── UserDto.java                 # Response DTO
├── group/                            # Group domain
│   ├── GroupEntity.java             # JPA entity
│   ├── GroupController.java         # /api/groups/** endpoints
│   ├── BalanceService.java          # Balance calculation logic
│   └── BalanceController.java       # /api/balances/** endpoints
├── expense/                          # Expense domain
│   ├── Expense.java                 # JPA entity
│   ├── ExpenseShare.java            # Share calculation entity
│   ├── ExpenseController.java       # /api/expenses/** endpoints
│   └── ExpenseRepo.java             # Repository
└── settlement/                       # Settlement domain
    ├── Settlement.java              # JPA entity
    ├── SettlementController.java    # /api/settlements/** endpoints
    └── SettlementRepo.java          # Repository
```

### Security Flow
1. All requests pass through `JwtAuthFilter` (except `/api/auth/**`)
2. Filter extracts JWT from `Authorization: Bearer <token>` header
3. `JwtService` validates token and extracts username
4. `CustomUserDetailsService` loads user details
5. Spring Security context is populated with authenticated user

**Public endpoints:** `/api/auth/register`, `/api/auth/login`  
**Protected endpoints:** Everything else requires valid JWT

### Balance Calculation Logic
`BalanceService.calculateBalances()` computes net balance per user in a group:
1. **Expenses:** User who paid gets +amount, users who share get -shareAmount
2. **Settlements:** fromUser gets +amount, toUser gets -amount
3. Returns `Map<userId, netBalance>`

This is used to determine who owes whom in the group.

### Configuration
- **Primary config:** `application.properties` (takes precedence)
- **Secondary config:** `application.yml` (fallback)
- **Environment overrides:** `.env` file for local development

**Key properties:**
- `app.jwt.secret` / `JWT_SECRET` - JWT signing key (must be 256+ bits)
- `app.jwt.expiration` / `JWT_EXPIRATION` - Token lifetime (ms)
- `spring.web.cors.allowed-origin-patterns` - Frontend URLs
- `spring.jpa.hibernate.ddl-auto=validate` - Schema managed by Flyway only

### Database Schema
- **User authentication:** BCrypt hashed passwords in `users.password_hash`
- **Cascade deletes:** Deleting a group removes all expenses, shares, settlements
- **Soft delete:** Not implemented - all deletes are hard deletes
- **Timestamps:** `created_at` fields use `DEFAULT NOW()` from DB

## Common Issues

### Build fails with "Process terminated with exit code: 1"
Run with `-e` flag to see actual error: `./mvnw spring-boot:run -e`

### Application won't start - Database connection failed
- Ensure PostgreSQL is running on port 5432
- Check credentials in `application.properties` or environment variables
- Verify database `expense_splitter` exists

### Flyway migration errors
- Flyway validates schema on startup (`ddl-auto=validate`)
- Manual schema changes will cause conflicts
- To reset: drop database and restart application

### JWT token invalid
- Check that `JWT_SECRET` matches between token generation and validation
- Token expiration is set in milliseconds (default: 86400000 = 24 hours)
- Token format must be `Bearer <token>` in Authorization header

## Development Notes

- **Lombok annotations** (`@Data`, `@RequiredArgsConstructor`, etc.) generate boilerplate at compile time
- **DTOs** are used for API responses to avoid exposing JPA entities directly
- **Repository pattern** via Spring Data JPA - methods inferred from naming conventions
- **Stateless authentication** - no server-side session storage
