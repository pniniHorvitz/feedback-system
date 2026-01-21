# מדריך ההתקנה

## שלב 1: דרישות מוקדמות

וודא שהדברים הבאים מותקנים:
- **Node.js** 14+ ([הורדה](https://nodejs.org/))
- **MongoDB** ([הורדה וההתקנה](https://docs.mongodb.com/manual/installation/))
- **Git** (אופציונלי)

## שלב 2: הוצאה מהגרסאה וסידור

```bash
# אם כבר קלדת קוד, דלג על זה
git clone <repository-url>
cd פרויקט
```

## שלב 3: התקנת השרת

```bash
cd server
npm install
```

וודא שקובץ `.env` קיים. אם לא, עתקתו מ-`.env.example`:

```bash
cp .env.example .env
```

ערוך את `.env` בעורך טקסט:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback-system
NODE_ENV=development
JWT_SECRET=super-secret-key-change-this
CORS_ORIGIN=http://localhost:3000
```

## שלב 4: התקנת הקליינט

```bash
cd ../client
npm install
```

## שלב 5: הפעלת MongoDB

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
brew services start mongodb-community
# או
mongod
```

וודא שתראה הודעה כמו:
```
[initandlisten] waiting for connections on port 27017
```

## שלב 6: הפעלת השרת

בטרמינל חדש:

```bash
cd server
npm run dev
```

תראה:
```
Server running on port 5000
```

## שלב 7: הפעלת הקליינט

בטרמינל נוסף:

```bash
cd client
npm start
```

זה יפתח אוטומטית את הדפדפן ב: http://localhost:3000

---

## 🧪 בדיקת התקנה

### בדיקה 1: בדוק שהשרת פעיל
```bash
curl http://localhost:5000/health
```

צפוי:
```json
{"status":"Server is running"}
```

### בדיקה 2: בדוק שהקליינט עובד
פתח את http://localhost:3000 בדפדפן. אתה צריך לראות עמוד התחברות.

---

## 🆘 פתרון בעיות

### שגיאה: "Cannot connect to MongoDB"

**פתרון:**
1. וודא שמונגודיבי פעיל (`mongod`)
2. בדוק את `MONGODB_URI` בקובץ `.env`
3. נסה התחברות ישירות: `mongodb://localhost:27017`

### שגיאה: "Port 5000 already in use"

**פתרון:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### שגיאה: "npm: command not found"

**פתרון:**
- התקן Node.js מחדש מ- https://nodejs.org/
- וודא שנוספת ל-PATH

---

## 📚 הפעם אחרונה?

אם כל דבר פועל, עבור לקובץ `README.md` לפרטים נוספים על השימוש במערכת.
