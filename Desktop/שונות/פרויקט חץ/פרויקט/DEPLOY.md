# 💡 מערכת המשוב החינוכית
## Educational Feedback System

> "לא תחושות – נתונים. לא בדיקה – הבנה."

---

## 🚀 העלאה לענן - צעדים מהירים

### **Vercel (המומלצת)** ⭐

```bash
# 1. התקנה
npm install -g vercel

# 2. עברו לתיקיית client
cd client

# 3. Build
npm run build

# 4. העלאה (בחרו "yes" בכל השאלות)
vercel --prod
```

**תוצאה**: URL כמו `https://feedback-system.vercel.app`

---

### **Netlify**

```bash
# 1. התקנה
npm install -g netlify-cli

# 2. Build
cd client
npm run build

# 3. העלאה
netlify deploy --prod --dir=build
```

**תוצאה**: URL כמו `https://feedback-system.netlify.app`

---

## ✅ בדיקה לפני העלאה

```bash
cd client
npm run build
npm install -g serve
serve -s build
```

פתחו `http://localhost:3000` - אם זה עובד, אתה מוכן! ✓

---

## 📋 דרישות לענן

✅ Node.js 14+
✅ npm/yarn
✅ חשבון ב-Vercel או Netlify (חינם לחלוטין!)

---

## 🎯 השלבים הנוספים

1. ✅ עברו לתיקיית הפרויקט
2. ✅ בנו: `npm run build`
3. ✅ בחרו Vercel או Netlify
4. ✅ בצעו הרשמה (2 דקות)
5. ✅ הריצו את ההוראות
6. ✅ המערכת קיימת! 🎉

---

## 🔗 לינקים שימושיים

- [Vercel.com](https://vercel.com)
- [Netlify.com](https://netlify.com)
- [Node.js](https://nodejs.org)

---

## ❓ בעיות נפוצות?

**"Port 3000 תפוס"**
```bash
PORT=3001 npm start
```

**"npm error"**
```bash
npm install --force
```

**"Node לא מצא"**
```bash
node -v
```
(אם זה לא עובד, התקנו Node מחדש)

---

🎊 **אתה מוכן! בואו נעלה את המערכת לענן!**
