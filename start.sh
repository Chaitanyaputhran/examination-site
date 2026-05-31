#!/bin/bash

echo "=========================================="
echo "Examination Portal - Quick Start Guide"
echo "=========================================="
echo ""

echo "This script will help you set up the Examination Portal"
echo ""

echo "Step 1: Database Setup"
echo "----------------------"
echo "Please ensure MySQL is running and execute:"
echo "  mysql -u root -p -e 'CREATE DATABASE IF NOT EXISTS examination_portal;'"
echo "  mysql -u root -p examination_portal < database/schema.sql"
echo ""
read -p "Press Enter when database setup is complete..."

echo ""
echo "Step 2: Backend Configuration"
echo "------------------------------"
echo "Please update backend/src/main/resources/application.properties with:"
echo "  - Your MySQL username and password"
echo "  - Your email SMTP settings (optional)"
echo ""
read -p "Press Enter when configuration is complete..."

echo ""
echo "Step 3: Starting Backend"
echo "------------------------"
echo "Opening new terminal for backend..."
cd backend
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && echo \"Starting Backend...\" && mvn spring-boot:run"'

echo ""
echo "Step 4: Frontend Setup"
echo "----------------------"
read -p "Install frontend dependencies? (y/n): " install_deps
if [ "$install_deps" = "y" ]; then
    cd ../frontend
    npm install
fi

echo ""
echo "Step 5: Starting Frontend"
echo "-------------------------"
cd frontend
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'\" && echo \"Starting Frontend...\" && npm run dev"'

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Backend:  http://localhost:8080/api"
echo "Frontend: http://localhost:5173"
echo ""
echo "Default Admin Credentials:"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo "=========================================="
