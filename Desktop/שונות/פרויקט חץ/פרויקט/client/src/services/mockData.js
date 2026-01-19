// Mock data for demo purposes

// Question bank organized by subject
export const questionBank = {
  'מתמטיקה': [
    {
      id: 'q1',
      text: 'האם הבנת את השיטה הנוכחית?',
      questionType: 'yes-no',
      subject: 'מתמטיקה'
    },
    {
      id: 'q2',
      text: 'כמה יהיו 25 + 17?',
      questionType: 'multiple-choice',
      options: ['42', '32', '52', '40'],
      correctAnswer: 0,
      subject: 'מתמטיקה'
    },
    {
      id: 'q3',
      text: 'האם ברור לך איך לפתור משוואות?',
      questionType: 'yes-no',
      subject: 'מתמטיקה'
    },
    {
      id: 'q4',
      text: 'מה החשיבות של סדר הפעולות?',
      questionType: 'multiple-choice',
      options: ['עוזר לפתור נכון', 'אין חשיבות', 'רק בשברים', 'לא יודע'],
      correctAnswer: 0,
      subject: 'מתמטיקה'
    }
  ],
  'עברית': [
    {
      id: 'q5',
      text: 'האם הבנת את הטקסט?',
      questionType: 'yes-no',
      subject: 'עברית'
    },
    {
      id: 'q6',
      text: 'מה הנושא העיקרי של השיר?',
      questionType: 'multiple-choice',
      options: ['אהבה', 'טבע', 'מלחמה', 'משפחה'],
      correctAnswer: 1,
      subject: 'עברית'
    },
    {
      id: 'q7',
      text: 'האם ברור הייחוד של הסגנון הספרותי?',
      questionType: 'yes-no',
      subject: 'עברית'
    }
  ],
  'אנגלית': [
    {
      id: 'q8',
      text: 'Do you understand the grammar?',
      questionType: 'yes-no',
      subject: 'אנגלית'
    },
    {
      id: 'q9',
      text: 'Which is the correct translation?',
      questionType: 'multiple-choice',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 1,
      subject: 'אנגלית'
    }
  ],
  'מדעים': [
    {
      id: 'q10',
      text: 'האם הנושא ברור?',
      questionType: 'yes-no',
      subject: 'מדעים'
    },
    {
      id: 'q11',
      text: 'מה השלבים של התהליך?',
      questionType: 'multiple-choice',
      options: ['א → ב → ג', 'ב → א → ג', 'ג → ב → א', 'לא בסדר מוגדר'],
      correctAnswer: 0,
      subject: 'מדעים'
    }
  ]
};

export const mockQuestions = [
  {
    id: '1',
    text: 'האם הבנת את הנושא?',
    teacherId: 'teacher1',
    teacherName: 'רחל כהן',
    classId: 'class-3a',
    className: 'כיתה ג׳',
    subject: 'מתמטיקה',
    questionType: 'yes-no',
    isActive: true,
    createdAt: new Date(Date.now() - 10 * 60000),
    lessonDate: new Date()
  },
  {
    id: '2',
    text: 'כמה יהיו 25 + 17?',
    teacherId: 'teacher1',
    teacherName: 'רחל כהן',
    classId: 'class-3a',
    className: 'כיתה ג׳',
    subject: 'מתמטיקה',
    questionType: 'multiple-choice',
    options: ['42', '32', '52', '40'],
    isActive: true,
    createdAt: new Date(Date.now() - 5 * 60000),
    lessonDate: new Date()
  }
];

export const mockResponses = {
  '1': [
    { answer: true, respondentClass: 'כיתה ג׳' },
    { answer: true, respondentClass: 'כיתה ג׳' },
    { answer: false, respondentClass: 'כיתה ג׳' },
    { answer: true, respondentClass: 'כיתה ג׳' },
    { answer: true, respondentClass: 'כיתה ג׳' },
    { answer: true, respondentClass: 'כיתה ג׳' },
    { answer: true, respondentClass: 'כיתה ג׳' },
    { answer: false, respondentClass: 'כיתה ג׳' },
  ],
  '2': [
    { answer: 2, respondentClass: 'כיתה ג׳' },
    { answer: 2, respondentClass: 'כיתה ג׳' },
    { answer: 0, respondentClass: 'כיתה ג׳' },
    { answer: 2, respondentClass: 'כיתה ג׳' },
    { answer: 2, respondentClass: 'כיתה ג׳' },
  ]
};

export const mockAnalytics = {
  byClass: [
    { name: 'כיתה א׳', understanding: 85, responses: 24, totalStudents: 28 },
    { name: 'כיתה ב׳', understanding: 92, responses: 28, totalStudents: 30 },
    { name: 'כיתה ג׳', understanding: 78, responses: 22, totalStudents: 25 },
    { name: 'כיתה ד׳', understanding: 88, responses: 26, totalStudents: 29 },
  ],
  byTeacher: [
    { name: 'רחל כהן', understanding: 88, responses: 35, avgClassSize: 28 },
    { name: 'שרה דוד', understanding: 82, responses: 32, avgClassSize: 26 },
    { name: 'מרים לוי', understanding: 90, responses: 38, avgClassSize: 30 },
    { name: 'דבורה ברק', understanding: 85, responses: 30, avgClassSize: 27 },
  ],
  bySubject: [
    { name: 'מתמטיקה', value: 35, understanding: 86 },
    { name: 'עברית', value: 25, understanding: 84 },
    { name: 'אנגלית', value: 20, understanding: 80 },
    { name: 'מדעים', value: 20, understanding: 82 },
  ],
  insights: [
    {
      type: 'success',
      title: 'נקודת חוזקה 💪',
      description: 'מורה שרה מגיעה ל-92% הבנה בכיתה ב׳ - ממשיכי כך!',
      color: '#10b981'
    },
    {
      type: 'attention',
      title: 'שטח לשיפור 🎯',
      description: 'כיתה ג׳ בהיסטוריה צריכה חיזוק נוסף - הציעו תרגילים נוספים',
      color: '#f59e0b'
    },
    {
      type: 'trend',
      title: 'מגמה חיובית 📈',
      description: 'הבנה גדלה ב-15% בחודש האחרון בכל הכיתות',
      color: '#3b82f6'
    }
  ]
};

export const mockTeacherQuestions = [
  {
    id: 'q1',
    text: 'האם הבנתם את משפט הסכום?',
    responses: 24,
    understanding: 87,
    createdAt: new Date(Date.now() - 2 * 60 * 60000),
    active: true
  },
  {
    id: 'q2',
    text: 'מה היה הקשה במיוחד?',
    responses: 19,
    understanding: 0,
    createdAt: new Date(Date.now() - 1 * 60 * 60000),
    active: true
  },
  {
    id: 'q3',
    text: 'האם תרגול קטן עזר?',
    responses: 28,
    understanding: 93,
    createdAt: new Date(Date.now() - 30 * 60000),
    active: true
  }
];
