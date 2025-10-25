#!/usr/bin/env pwsh

Write-Host "🚀 Starting Expense Splitter in Development Mode" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Yellow

# Function to kill processes on exit
function Stop-Servers {
    Write-Host "`n🛑 Shutting down servers..." -ForegroundColor Red
    Get-Job | Stop-Job -PassThru | Remove-Job -Force
    exit
}

# Register exit handler
Register-EngineEvent -SourceIdentifier PowerShell.Exiting -Action { Stop-Servers }

Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location frontend
npm install

Write-Host "`n🏗️  Starting Backend Server (Port 8080)..." -ForegroundColor Green
Set-Location ../backend

# Start backend in background job
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD/backend
    ./mvnw spring-boot:run
}

Write-Host "✅ Backend job started with ID: $($backendJob.Id)" -ForegroundColor Green

# Wait a moment for backend to initialize
Start-Sleep -Seconds 3

Write-Host "`n🎨 Starting Frontend Development Server (Port 3000)..." -ForegroundColor Cyan
Set-Location ../frontend

# Start frontend in background job  
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD/frontend
    npm run dev
}

Write-Host "✅ Frontend job started with ID: $($frontendJob.Id)" -ForegroundColor Cyan

Write-Host "`n🌟 Both servers are starting up!" -ForegroundColor Yellow
Write-Host "📱 Frontend will be available at: http://localhost:3000" -ForegroundColor Green  
Write-Host "🔧 Backend API available at: http://localhost:8080/api" -ForegroundColor Green
Write-Host "`n⏳ Waiting for servers to start..." -ForegroundColor Yellow

# Monitor jobs and display output
$timeout = 120 # 2 minutes timeout
$elapsed = 0

while ($elapsed -lt $timeout) {
    # Check if both jobs are still running
    $backendRunning = (Get-Job -Id $backendJob.Id).State -eq "Running"
    $frontendRunning = (Get-Job -Id $frontendJob.Id).State -eq "Running"
    
    if (-not $backendRunning -and -not $frontendRunning) {
        Write-Host "❌ Both servers have stopped" -ForegroundColor Red
        break
    }
    
    # Display any output from jobs
    Receive-Job -Id $backendJob.Id | ForEach-Object { Write-Host "[BACKEND] $_" -ForegroundColor Blue }
    Receive-Job -Id $frontendJob.Id | ForEach-Object { Write-Host "[FRONTEND] $_" -ForegroundColor Magenta }
    
    Start-Sleep -Seconds 2
    $elapsed += 2
    
    # Check if servers are responding (simple check)
    if ($elapsed -eq 20) {
        Write-Host "`n🎉 Servers should be ready now!" -ForegroundColor Green
        Write-Host "🌐 Open your browser and go to: http://localhost:3000" -ForegroundColor Yellow
        Write-Host "`nPress Ctrl+C to stop both servers" -ForegroundColor Red
    }
}

# Keep script running and monitoring
Write-Host "`n📊 Monitoring servers... Press Ctrl+C to stop both servers" -ForegroundColor Yellow

try {
    while ($true) {
        # Display job output periodically
        Receive-Job -Id $backendJob.Id | ForEach-Object { Write-Host "[BACKEND] $_" -ForegroundColor Blue }
        Receive-Job -Id $frontendJob.Id | ForEach-Object { Write-Host "[FRONTEND] $_" -ForegroundColor Magenta }
        
        Start-Sleep -Seconds 5
    }
}
catch {
    Write-Host "`n🛑 Stopping servers..." -ForegroundColor Red
}
finally {
    # Cleanup jobs
    Get-Job | Stop-Job -PassThru | Remove-Job -Force
    Write-Host "✅ All servers stopped" -ForegroundColor Green
}