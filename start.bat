@echo off
REM Expense Splitter - Single Command Startup Script for Windows
REM This script sets up and runs the entire application stack

echo.
echo ===============================================
echo 🚀 EXPENSE SPLITTER - SINGLE COMMAND STARTUP
echo ===============================================
echo.

REM Check if Docker is installed
echo [1/6] Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed. Please install Docker Desktop first.
    echo Download from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)
echo [✓] Docker is installed

REM Check if Docker is running
echo [2/6] Checking if Docker is running...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Docker is not running. Starting Docker Desktop...
    echo [INFO] This may take a minute. Please wait...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo [INFO] Waiting for Docker to start...
    :wait_for_docker
    timeout /t 5 /nobreak >nul
    docker info >nul 2>&1
    if %errorlevel% neq 0 (
        echo [INFO] Still waiting for Docker...
        goto wait_for_docker
    )
)
echo [✓] Docker is running

echo [3/6] Setting up environment files...
REM Check if .env file exists, create if not
if not exist "frontend\.env" (
    echo [INFO] Creating frontend environment file...
    copy "frontend\.env.example" "frontend\.env" >nul
    echo [✓] Frontend environment file created
) else (
    echo [✓] Frontend environment file already exists
)

REM Note: Backend uses environment variables from docker-compose.yml
echo [✓] Environment setup complete

echo [4/6] Stopping any existing containers...
docker-compose down >nul 2>&1
echo [✓] Cleanup complete

echo [5/6] Building and starting all services...
echo [INFO] This will build the frontend, backend, and start the database
echo [INFO] First run may take several minutes to download images and build...
docker-compose up --build -d

if %errorlevel% neq 0 (
    echo [ERROR] Failed to start services. Check the logs above.
    pause
    exit /b 1
)

echo [6/6] Waiting for services to initialize...
timeout /t 15 /nobreak >nul

echo.
echo ===============================================
echo 🎉 SUCCESS! EXPENSE SPLITTER IS RUNNING
echo ===============================================
echo.
echo 📱 Application URLs:
echo    → Frontend:    http://localhost:3000
echo    → Backend API: http://localhost:8080
echo    → Database:    localhost:5432
echo    → PgAdmin:     http://localhost:5050
echo      (Login: admin@example.com / admin)
echo.
echo 📋 Management Commands:
echo    → View logs:    docker-compose logs -f
echo    → Stop app:     docker-compose down
echo    → Restart:      docker-compose restart
echo    → Clean reset:  docker-compose down -v
echo.
echo 📈 Status Check:
docker-compose ps
echo.
echo [INFO] All services are running! Frontend may take 30-60 seconds to be ready.
echo [INFO] Visit http://localhost:3000 to start using the app!
echo.
echo Press any key to close this window...
pause >nul
