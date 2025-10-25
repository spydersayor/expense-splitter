@echo off
REM Quick Start - Assumes Docker is already running
echo 🚀 EXPENSE SPLITTER - QUICK START
echo ================================

REM Setup environment if needed
if not exist "frontend\.env" (
    echo Creating frontend .env file...
    copy "frontend\.env.example" "frontend\.env" >nul
)

echo Stopping any running containers...
docker-compose down >nul 2>&1

echo Starting all services...
docker-compose up -d

echo.
echo ✅ Services starting! Visit http://localhost:3000 when ready
echo.

REM Show status
docker-compose ps

echo.
echo Press any key to continue...
pause >nul