#!/bin/bash

echo "🚀 מערכת המשוב החינוכית - התחלה מהירה"
echo "=========================================="

# בדוק דרישות מוקדמות
if ! command -v node &> /dev/null; then
    echo "❌ Node.js לא מותקן. אנא התקן מ- https://nodejs.org/"
    exit 1
fi

if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB לא נמצא בPATH. וודא שהוא מותקן."
fi

echo "✅ Node.js מותקן: $(node -v)"

# התקנת דפנדנסיים
echo ""
echo "📦 התקנת דפנדנסיים בשרת..."
cd server
npm install

echo ""
echo "📦 התקנת דפנדנסיים בקליינט..."
cd ../client
npm install

echo ""
echo "✅ התקנה הושלמה!"
echo ""
echo "🎯 כדי להתחיל:"
echo "  1. פתח טרמינל חדש והרץ: cd server && npm run dev"
echo "  2. פתח טרמינל שני והרץ: cd client && npm start"
echo ""
echo "📚 למידע נוסף, קרא את README.md"
