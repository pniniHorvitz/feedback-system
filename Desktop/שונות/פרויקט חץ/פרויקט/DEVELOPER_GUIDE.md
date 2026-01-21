<!-- 
מערכת המשוב החינוכית
Educational Feedback System

הוראות פיתוח וסיוע
-->

# סיוע פיתוח

## מבנה הפרויקט

```
פרויקט/
├── server/                 # Backend - Node.js + Express
│   ├── src/
│   │   ├── server.js      # נקודת כניסה ראשית
│   │   ├── models/        # Schema של MongoDB
│   │   ├── routes/        # API endpoints
│   │   ├── controllers/   # Logic עסקי
│   │   └── middleware/    # Auth, logging וכו'
│   ├── package.json
│   └── .env.example
├── client/                 # Frontend - React
│   ├── src/
│   │   ├── pages/         # עמודים ראשיים (Teacher, Student, Admin)
│   │   ├── components/    # קומפוננטות קטנות
│   │   ├── services/      # API calls
│   │   ├── App.js         # קומפוננטת ראשית
│   │   └── index.js       # entry point
│   ├── public/            # HTML static
│   └── package.json
├── README.md              # תיאור כללי
├── SETUP.md               # הוראות התקנה
├── TESTING.md             # אופן בדיקה
└── setup.sh/setup.bat     # סקריפטים התקנה
```

---

## 🔄 Flow של הנתונים

```
[מורה] 
  ↓ (יוצרת שאלה)
[Backend: POST /api/questions]
  ↓ (שמור ב-DB)
[MongoDB: Question collection]
  ↓ 
[Frontend: React fetches questions]
  ↓
[תלמידה]
  ↓ (עונה)
[Backend: POST /api/responses]
  ↓
[MongoDB: Response collection]
  ↓
[מנהלת צפה בעמוד Analytics]
  ↓
[Backend: GET /api/analytics/...]
  ↓
[Frontend: Recharts מציג גרפים]
```

---

## 🔌 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Questions
```
GET    /api/questions/active/:classId
POST   /api/questions
PATCH  /api/questions/:id/deactivate
```

### Responses  
```
POST /api/responses
GET  /api/responses/question/:questionId
```

### Analytics
```
GET /api/analytics/by-class/:classId
GET /api/analytics/by-teacher/:teacherId
GET /api/analytics/by-subject/:subject
GET /api/analytics/by-period/:startDate/:endDate
```

---

## 🎨 עמודים Frontend

### LoginPage (`client/src/pages/LoginPage.js`)
- טופס התחברות
- שני שדות: דוא"ל וסיסמה
- גרדיאנט סגול

### TeacherPage (`client/src/pages/TeacherPage.js`)
- יצירת שאלות
- רשימת שאלות פעילות
- תלוי ב-token מהאחסון

### StudentPage (`client/src/pages/StudentPage.js`)
- שאלה אחת בכל פעם
- כפתור "כן" / "לא"
- הודעת אישור אחרי שליחה

### AdminPage (`client/src/pages/AdminPage.js`)
- טאבים: כיתות, מורות, מקצועות
- גרפים עם Recharts
- תובנות וסטטיסטיקות

---

## 📦 Dependencies עיקריים

### Server
- **express** – HTTP server
- **mongoose** – MongoDB ORM
- **jsonwebtoken** – Authentication
- **bcryptjs** – Password hashing
- **cors** – Cross-origin requests

### Client
- **react** – UI library
- **react-router-dom** – Routing
- **axios** – HTTP requests
- **recharts** – Charts & graphs

---

## 🔐 Authentication Flow

```
1. משתמש מוכנס דוא"ל + סיסמה
   ↓
2. Backend בודק את ה-DB
   ↓
3. אם נכון: הנפק JWT token
   ↓
4. Frontend שומר token ב-localStorage
   ↓
5. כל בקשה שלאחר מכן צרופה ה-token ב-header
   ↓
6. Backend בודק את ה-token במידלוור auth
```

---

## 🧪 צעדי בדיקה

1. **בדוק הרצה של השרת:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **בדוק הרשמה:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"123","name":"test","role":"teacher","school":"school"}'
   ```

3. **בדוק התחברות:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@test.com","password":"123"}'
   ```

4. **בדוק Frontend:**
   - פתח http://localhost:3000
   - ודא שטופס התחברות מופיע
   - בדוק ב-Console (F12) שאין שגיאות

---

## 🚀 הוספת תכונה חדשה

### דוגמה: הוספת endpoint אנליטיקה חדש

**1. Backend:**

צור ב-`server/src/routes/analytics.js`:
```javascript
router.get('/by-something/:id', auth, async (req, res) => {
  try {
    // Logic
    res.json({ result: 'data' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

**2. Frontend:**

הוסף ל-`client/src/services/analyticsService.js`:
```javascript
getBySomething: (id) => 
  axios.get(`${API_URL}/analytics/by-something/${id}`, getAuthHeader()),
```

**3. Component:**

בעמוד:
```javascript
const [data, setData] = useState(null);

useEffect(() => {
  analyticsService.getBySomething(id)
    .then(res => setData(res.data))
    .catch(err => console.error(err));
}, [id]);
```

---

## 🐛 Debug מהיר

### Logger
בשרת, הוסף בסוף handler:
```javascript
console.log('DEBUG:', req.body, req.params);
```

### Network Inspector
בקליינט, F12 → Network tab:
- ראה כל Requests/Responses
- בדוק status codes
- בדוק payload

### MongoDB Compass
- תראה את כל הקולקציות
- תוכל לערוך ולמחוק מסמכים
- ב-local://27017

---

## 📝 Best Practices

1. ✅ כל endpoint צריך try-catch
2. ✅ שמור tokens בآمن (בו"ש לא booleans)
3. ✅ לעולם אל תשלח passwords ללא hash
4. ✅ בדוק הרשאות לפני כל פעולה רגישה
5. ✅ תן error messages ברורות

---

## 🆘 בעיות נפוצות

| בעיה | פתרון |
|------|--------|
| CORS error | בדוק CORS_ORIGIN ב-.env |
| Token לא עובד | וודא שטוקן נשמר בdocumented ונשלח נכון |
| MongoDB לא מחובר | התחל mongod, בדוק MONGODB_URI |
| Port תפוס | שנה את PORT ב-.env או בדוק תהליכים תפוסים |
| Component לא מעדכן | בדוק useEffect dependencies |

---

## 📚 משאבים מדיוקים

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Hooks](https://react.dev/reference/react/hooks)
- [Recharts](https://recharts.org/)

---

**עדכון אחרון:** ינואר 2026
