@echo off
echo ===============================================
echo AI Interview Coach - Installation Script
echo ===============================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please close this window and open a NEW terminal window
    echo Then run this script again
    pause
    exit /b 1
)

echo Node.js found!
node --version
echo.

echo Checking npm...
npm --version
echo.

echo Installing project dependencies...
echo This may take a few minutes...
echo.

call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Installation failed!
    echo Please check the error messages above
    pause
    exit /b 1
)

echo.
echo ===============================================
echo Installation completed successfully!
echo ===============================================
echo.
echo To start the application, run:
echo   npm run dev
echo.
echo Then open your browser to: http://localhost:3000
echo.
pause
