#!/bin/bash

echo "Testing Profile Endpoints..."
echo ""

# Try to login and get token
echo "1. Testing login..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"chaitanya","password":"chaitanya"}')

echo "Login response: $LOGIN_RESPONSE"
echo ""

# Extract token (assuming JSON response with token field)
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "Failed to get token. Trying different password..."
  LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"chaitanya","password":"123456"}')
  echo "Login response: $LOGIN_RESPONSE"
  TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
fi

if [ ! -z "$TOKEN" ]; then
  echo "Token received: ${TOKEN:0:20}..."
  echo ""

  echo "2. Testing student profile endpoint..."
  curl -s -X GET http://localhost:8080/api/student/profile \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json"
  echo ""
  echo ""
else
  echo "Could not get authentication token"
  echo "Please check username/password"
fi
