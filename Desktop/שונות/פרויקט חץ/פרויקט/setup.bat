@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 מערכת המשוב החינוכית - התחלה מהירה
echo ==========================================
echo.

REM בדוק דרישות מוקדמות
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js לא מותקן. אנא התקן מ- https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js מותקן: 
node -v

REM התקנת דפנדנסיים
echo.
echo 📦 התקנת דפנדנסיים בשרת...
cd server
call npm install

echo.
echo 📦 התקנת דפנדנסיים בקליינט...
cd ../client
call npm install

echo.
echo ✅ התקנה הושלמה!
echo.
echo 🎯 כדי להתחיל:
echo   1. פתח PowerShell/CMD חדש והרץ: cd server; npm run dev
echo   2. פתח PowerShell/CMD שני והרץ: cd client; npm start
echo.
echo 📚 למידע נוסף, קרא את README.md
echo.
pause
