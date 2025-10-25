# Restart script for expense-splitter

Write-Host "Stopping backend..." -ForegroundColor Yellow
Get-Process -Name "java" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "`nStarting backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; mvn spring-boot:run"

Write-Host "`nWaiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "`nStarting frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host "`nServices started! Check the new PowerShell windows." -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:8080" -ForegroundColor Cyan
