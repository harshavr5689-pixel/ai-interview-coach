@echo off
echo ===============================================
echo Push AI Interview Coach to GitHub
echo ===============================================
echo.
echo Your git is configured as:
echo User: harshav5689-pixel
echo Email: harshavr5689@gmail.com
echo.
echo ===============================================
echo STEP 1: Create Repository on GitHub
echo ===============================================
echo.
echo Please follow these steps:
echo 1. Go to: https://github.com/new
echo 2. Repository name: ai-interview-coach
echo 3. Description: AI-powered interview coaching with real-time feedback
echo 4. Choose Public or Private
echo 5. DO NOT initialize with README, .gitignore, or license
echo 6. Click "Create repository"
echo.
pause
echo.
echo ===============================================
echo STEP 2: What's your GitHub username?
echo ===============================================
echo.
set /p username="Enter your GitHub username: "
echo.
echo ===============================================
echo STEP 3: Pushing to GitHub
echo ===============================================
echo.
echo Setting up remote repository...
git remote add origin https://github.com/%username%/ai-interview-coach.git
echo.
echo Renaming branch to main...
git branch -M main
echo.
echo Pushing to GitHub...
echo (You may be asked for credentials)
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ===============================================
    echo SUCCESS! Your project is now on GitHub!
    echo ===============================================
    echo.
    echo View your repository at:
    echo https://github.com/%username%/ai-interview-coach
    echo.
    echo Next steps:
    echo 1. Visit your repository on GitHub
    echo 2. Add topics: react, typescript, interview-prep, ai
    echo 3. Deploy to Vercel: https://vercel.com/import
    echo.
) else (
    echo ===============================================
    echo Push failed. Common solutions:
    echo ===============================================
    echo.
    echo 1. Make sure you created the repository on GitHub
    echo 2. Check your GitHub credentials
    echo 3. Try using a Personal Access Token instead of password
    echo    See: https://github.com/settings/tokens
    echo.
    echo For detailed help, see: GITHUB_SETUP.md
    echo.
)
pause
