import React from 'react';
import PropTypes from 'prop-types';
import './DemoSelector.css';

const DemoSelector = ({ onSelectRole }) => {
  return (
    <div className="demo-selector">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            💡 מערכת המשוב החינוכית
          </h1>
          <p className="hero-subtitle">
            הדרך החדשה לדעת באמת מה תלמידות הבינו
          </p>
        </div>
      </div>

      <div className="demo-grid">
        <div className="role-card teacher-card" onClick={() => onSelectRole('teacher')}>
          <div className="card-icon">👩‍🏫</div>
          <h2>עמוד המורה</h2>
          <p className="card-description">
            יצירת שאלות קצרות בסוף השיעור
          </p>
          <div className="card-features">
            <span className="feature">✓ שאלות מהירות</span>
            <span className="feature">✓ תשובות אנונימיות</span>
            <span className="feature">✓ ניהול קל</span>
          </div>
          <button className="demo-button">התחל →</button>
        </div>

        <div className="role-card student-card" onClick={() => onSelectRole('student')}>
          <div className="card-icon">👧</div>
          <h2>עמוד התלמידה</h2>
          <p className="card-description">
            מענה פשוט וברור ללא לחץ
          </p>
          <div className="card-features">
            <span className="feature">✓ שאלה אחת בכל פעם</span>
            <span className="feature">✓ אנונימיות מלאה</span>
            <span className="feature">✓ פחות מדקה</span>
          </div>
          <button className="demo-button">התחל →</button>
        </div>

        <div className="role-card admin-card" onClick={() => onSelectRole('admin')}>
          <div className="card-icon">📊</div>
          <h2>לוח ניהול</h2>
          <p className="card-description">
            ניתוח נתונים מתקדם וקבלת החלטות
          </p>
          <div className="card-features">
            <span className="feature">✓ דשבורד חזותי</span>
            <span className="feature">✓ נתונים בזמן אמת</span>
            <span className="feature">✓ תובנות חכמות</span>
          </div>
          <button className="demo-button">התחל →</button>
        </div>
      </div>

      <div className="features-section">
        <h2>🎯 כיצד זה עובד?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-number">1</div>
            <h3>המורה בוחרת שאלות</h3>
            <p>מאגר מוכן או שאלה משלה - בסיום השיעור</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">2</div>
            <h3>התלמידות עונות</h3>
            <p>אנונימיות מלאה, בלי לחץ, פחות מדקה</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">3</div>
            <h3>המנהלת מנתחת</h3>
            <p>נתונים לפי כיתות, מורות, מקצועות ותקופה</p>
          </div>
        </div>
      </div>

      <div className="quote-section">
        <blockquote>
          "לא תחושות – נתונים.<br/>
          לא בדיקה – הבנה."
        </blockquote>
      </div>

      <div className="footer">
        <p>🚀 מערכת המשוב החינוכית | 2026</p>
      </div>
    </div>
  );
};

DemoSelector.propTypes = {
  onSelectRole: PropTypes.func.isRequired
};

export default DemoSelector;
