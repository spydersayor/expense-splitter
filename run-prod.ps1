#!/usr/bin/env pwsh

Write-Host "✅ Step 1: Frontend build starting..." -ForegroundColor Green
Set-Location frontend
npm install
npm run build
Write-Host "✅ Frontend build completed." -ForegroundColor Green

Write-Host "✅ Step 2: Copying static files to backend..." -ForegroundColor Green
Set-Location ..
if (Test-Path "backend/src/main/resources/static") {
    Remove-Item -Recurse -Force "backend/src/main/resources/static/*"
}
New-Item -ItemType Directory -Force -Path "backend/src/main/resources/static"
Copy-Item -Recurse -Force "frontend/dist/*" "backend/src/main/resources/static/"
Write-Host "✅ Static files copied." -ForegroundColor Green

Write-Host "✅ Step 3: Building backend..." -ForegroundColor Green
Set-Location backend
./mvnw clean package -DskipTests
Write-Host "✅ Backend build completed." -ForegroundColor Green

Write-Host "✅ Step 4: Running backend..." -ForegroundColor Green
Write-Host "Application will be available at http://localhost:8080" -ForegroundColor Yellow
java -jar target/backend-0.0.1-SNAPSHOT.jar