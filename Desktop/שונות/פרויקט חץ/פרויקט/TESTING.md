# נתונים לבדיקה

זהו קובץ עזר עם בדיקות לעומק של המערכת.

## 👤 אירוח משתמשים

### מורה
```json
{
  "email": "teacher@school.com",
  "password": "password123",
  "name": "רחל כהן",
  "role": "teacher",
  "school": "בית ספר יסודי",
  "subject": "מתמטיקה"
}
```

### תלמידה
```json
{
  "email": "student@school.com",
  "password": "password123",
  "name": "מרים",
  "role": "student",
  "school": "בית ספר יסודי",
  "class": "כיתה ג׳"
}
```

### מנהלת
```json
{
  "email": "admin@school.com",
  "password": "password123",
  "name": "דיקאן בוקר",
  "role": "admin",
  "school": "בית ספר יסודי"
}
```

---

## 🧪 בדיקות API

### רישום משתמש
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@school.com",
    "password": "password123",
    "name": "רחל כהן",
    "role": "teacher",
    "school": "בית ספר יסודי",
    "subject": "מתמטיקה"
  }'
```

### התחברות
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teacher@school.com",
    "password": "password123"
  }'
```

שמור את `token` מהתשובה.

### יצירת שאלה (דוגמה עם TOKEN)
```bash
curl -X POST http://localhost:5000/api/questions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "text": "האם הבנת את הנושא?",
    "classId": "classA",
    "subject": "מתמטיקה",
    "questionType": "yes-no",
    "lessonDate": "2026-01-18T10:00:00Z"
  }'
```

### שליחת תשובה
```bash
curl -X POST http://localhost:5000/api/responses \
  -H "Content-Type: application/json" \
  -d '{
    "questionId": "QUESTION_ID_HERE",
    "answer": true,
    "respondentClass": "כיתה ג׳",
    "respondentSubject": "מתמטיקה"
  }'
```

---

## 🎯 תרחישי בדיקה

### תרחיש 1: מורה יוצרת שאלה ותלמידה עונה

1. התחברות כמורה
2. בדף המורה: הוסף שאלה חדשה
3. התחברות כתלמידה (טאב חדש)
4. בדף התלמידה: עמדה וענה על השאלה
5. חזור למורה וראה עדכון

### תרחיש 2: מנהלת צופה בדיווחים

1. התחברות כמנהלת
2. בדף הניהול: עבור בין הכרטיסיות (כיתות, מורות, מקצועות)
3. צפה בגרפים ובתובנות

---

## 📊 מבנה הנתונים

### משתמש
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "teacher" | "student" | "admin",
  school: String,
  class: String, // for students
  subject: String, // for teachers
  createdAt: Date
}
```

### שאלה
```javascript
{
  _id: ObjectId,
  text: String,
  teacherId: ObjectId,
  classId: String,
  subject: String,
  questionType: "yes-no" | "scale-1-5" | "multiple-choice" | "open-text",
  options: [String], // for multiple choice
  isActive: Boolean,
  createdAt: Date,
  lessonDate: Date
}
```

### תשובה
```javascript
{
  _id: ObjectId,
  questionId: ObjectId,
  answer: Mixed, // true/false, 1-5, string, etc.
  respondentClass: String,
  respondentSubject: String,
  respondentTeacher: ObjectId,
  sessionId: String,
  createdAt: Date
}
```

---

## 🔍 בדיקות בדפדפן

1. **בדוק Console (F12)**
   - אין שגיאות?
   - Requests מוצלחים?

2. **בדוק Network (F12)**
   - Status 200/201 בבקשות POST?
   - Authentication headers נשלחים?

3. **בדוק LocalStorage**
   - TOKEN שמור אחרי התחברות?

---

## 📝 רשימת ביודק

### Frontend
- [ ] עמוד התחברות טוען
- [ ] הרשמה עובדת (router למורה/תלמידה/מנהלת)
- [ ] עמוד מורה טוען וניתן להוסיף שאלה
- [ ] עמוד תלמידה עובד וניתן לענות
- [ ] עמוד מנהלת מציג גרפים

### Backend
- [ ] MongoDB מחובר
- [ ] `/health` עובד
- [ ] הרשמה מוצלחת
- [ ] התחברות מוצלחת
- [ ] יצירת שאלה עובדת
- [ ] שליחת תשובה עובדת
- [ ] ניתוח נתונים עובד

---

## 💡 עצות

- השתמש בPlatform כמו **Postman** ל-API testing
- בדוק את **MongoDB Compass** כדי להציג מסדי נתונים
- הפעל את Developer Tools בדפדפן (`F12`) לצפייה בשגיאות

