#!/bin/bash
set -e

echo "✅ Step 1: Frontend build starting..."
cd frontend
npm install
npm run build
echo "✅ Frontend build completed."

echo "✅ Step 2: Copying static files to backend..."
cd ..
rm -rf backend/src/main/resources/static/*
cp -r frontend/dist/* backend/src/main/resources/static/
echo "✅ Static files copied."

echo "✅ Step 3: Building backend..."
cd backend
./mvnw clean package -DskipTests
echo "✅ Backend build completed."

echo "✅ Step 4: Running backend..."
java -jar target/backend-0.0.1-SNAPSHOT.jar
