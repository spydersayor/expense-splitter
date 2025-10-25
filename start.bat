@echo off
REM Expense Splitter - Single Command Startup Script for Windows
REM This script sets up and runs the entire application stack

echo 🚀 Starting Expense Splitter Application...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

REM Check if .env file exists, create if not
if not exist "frontend\.env" (
    echo [INFO] Creating frontend environment file...
    copy "frontend\env.example" "frontend\.env" >nul
    echo [SUCCESS] Frontend environment file created
)

REM Create backend environment file
if not exist "backend\.env" (
    echo [INFO] Creating backend environment file...
    (
        echo DATABASE_URL=jdbc:postgresql://db:5432/expense_splitter
        echo DATABASE_USERNAME=postgres
        echo DATABASE_PASSWORD=postgres
        echo JWT_SECRET=ThisIsA256BitSecretKey_ChangeThisToYourOwnRandomLongKey123456
        echo JWT_EXPIRATION=86400000
        echo CORS_ORIGINS=http://localhost:3000,http://localhost:5173
    ) > backend\.env
    echo [SUCCESS] Backend environment file created
)

REM Stop any existing containers
echo [INFO] Stopping existing containers...
docker-compose down >nul 2>&1

REM Build and start services
echo [INFO] Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo [INFO] Waiting for services to start...
timeout /t 10 /nobreak >nul

echo.
echo [SUCCESS] 🎉 Expense Splitter is starting up!
echo.
echo 📱 Application URLs:
echo    Frontend:    http://localhost:3000
echo    Backend API: http://localhost:8080
echo    Database:    localhost:5432
echo    PgAdmin:     http://localhost:5050 (admin@example.com / admin)
echo.
echo 📋 Useful Commands:
echo    View logs:    docker-compose logs -f
echo    Stop app:     docker-compose down
echo    Restart:      docker-compose restart
echo    Clean up:     docker-compose down -v
echo.
echo [INFO] Services are starting in the background. It may take a minute for all services to be fully ready.
echo [INFO] You can check the logs with: docker-compose logs -f
echo.
pause
