import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { questionBank } from '../services/mockData';
import './TeacherPage.css';

const TeacherPage = ({ user, onLogout, onChangeRole }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('subject'); // subject | selection | custom | preview | review
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [customType, setCustomType] = useState('yes-no');
  const [customOptions, setCustomOptions] = useState(['', '', '', '']);
  const [finalQuestions, setFinalQuestions] = useState([]);

  const subjects = Object.keys(questionBank);

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setSelectedQuestions([]);
    setCurrentStep('selection');
  };

  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleNextToCustom = () => {
    setCurrentStep('custom');
  };

  const handleAddCustomQuestion = useCallback(() => {
    const trimmedQuestion = customQuestion.trim();
    if (!trimmedQuestion) {
      alert('⚠️ אנא הכן שאלה');
      return;
    }
    
    if (trimmedQuestion.length < 5) {
      alert('⚠️ השאלה קצרה מדי (לפחות 5 תווים)');
      return;
    }

    if (customType === 'multiple-choice') {
      const validOptions = customOptions.filter(o => o.trim());
      if (validOptions.length < 2) {
        alert('⚠️ נדרשות לפחות 2 אפשרויות לשאלה בחירה');
        return;
      }
    }

    const customQ = {
      id: `custom-${Date.now()}`,
      text: trimmedQuestion,
      questionType: customType,
      subject: selectedSubject,
      isCustom: true,
      options: customType === 'multiple-choice' ? customOptions.filter(o => o.trim()) : undefined
    };

    const selected = selectedSubject ? questionBank[selectedSubject].filter(q => selectedQuestions.includes(q.id)) : [];
    setFinalQuestions([...selected, customQ]);
    setCurrentStep('preview');
  }, [customQuestion, customType, customOptions, selectedSubject, selectedQuestions]);

  const handleBackToSelection = () => {
    setCustomQuestion('');
    setCustomType('yes-no');
    setCustomOptions(['', '', '', '']);
    setCurrentStep('selection');
  };

  const handleStartSession = useCallback(() => {
    if (finalQuestions.length === 0) {
      alert('⚠️ אנא בחר לפחות שאלה אחת');
      return;
    }
    // Store selected questions in session/state for StudentPage
    sessionStorage.setItem('selectedQuestions', JSON.stringify(finalQuestions));
    setCurrentStep('review');
  }, [finalQuestions]);

  const handleBackToPreview = () => {
    setCurrentStep('preview');
  };

  const handleStartQuestions = () => {
    onChangeRole('student');
    navigate('/student');
  };

  const handleNavigate = (role) => {
    onChangeRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="teacher-page">
      <div className="teacher-header">
        <button className="home-logo" onClick={() => navigate('/')} title="חזרה לעמוד הבית">💡</button>
        <div className="header-nav">
          <button className="role-switch-btn" onClick={() => handleNavigate('teacher')} title="עמוד המורה">👩‍🏫</button>
          <button className="role-switch-btn" onClick={() => handleNavigate('student')} title="עמוד התלמידה">👧</button>
          <button className="role-switch-btn" onClick={() => handleNavigate('admin')} title="לוח ניהול">📊</button>
        </div>
        <div className="header-content">
          <h1>עמוד המורה</h1>
          <p>בחרי שאלות מהמאגר או הוסיפי שאלה משלך</p>
        </div>
        <button className="back-button" onClick={() => navigate('/')}>חזרה</button>
      </div>

      <div className="teacher-container">
        {/* Step 1: Select Subject */}
        {currentStep === 'subject' && (
          <div className="step-content">
            <h2>בחרי נושא שיעור</h2>
            <div className="subjects-grid">
              {subjects.map(subject => (
                <button
                  key={subject}
                  className="subject-button"
                  onClick={() => handleSelectSubject(subject)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSelectSubject(subject)}
                  tabIndex={0}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Questions */}
        {currentStep === 'selection' && (
          <div className="step-content">
            <div className="step-header">
              <h2>בחרי שאלות מ{selectedSubject}</h2>
              <button className="secondary-btn" onClick={() => setCurrentStep('subject')}>← חזרה לנושאים</button>
            </div>
            <div className="questions-list">
              {questionBank[selectedSubject].map(question => (
                <div key={question.id} className="question-item">
                  <input
                    type="checkbox"
                    id={question.id}
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => toggleQuestionSelection(question.id)}
                  />
                  <label htmlFor={question.id}>
                    <div className="question-text">{question.text}</div>
                    <div className="question-type">
                      {question.questionType === 'yes-no' ? '✓ כן / לא' : '✓ בחירה מרובה'}
                    </div>
                  </label>
                </div>
              ))}
            </div>
            <div className="step-actions">
              <p className="selected-count">נבחרו {selectedQuestions.length} שאלות</p>
              <button className="primary-btn" onClick={handleNextToCustom}>
                {selectedQuestions.length > 0 ? 'הוסיפי שאלה משלך →' : 'דלגי להוסיפת שאלה משלך →'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Add Custom Question */}
        {currentStep === 'custom' && (
          <div className="step-content">
            <h2>הוסיפי שאלה משלך</h2>
            <div className="custom-form">
              <div className="form-group">
                <label>טקסט השאלה</label>
                <textarea
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="הקלידי את השאלה..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>סוג השאלה</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="yes-no"
                      checked={customType === 'yes-no'}
                      onChange={(e) => setCustomType(e.target.value)}
                    />
                    כן / לא
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="multiple-choice"
                      checked={customType === 'multiple-choice'}
                      onChange={(e) => setCustomType(e.target.value)}
                    />
                    בחירה מרובה
                  </label>
                </div>
              </div>

              {customType === 'multiple-choice' && (
                <div className="form-group">
                  <label>אפשרויות תשובה</label>
                  {customOptions.map((option, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...customOptions];
                        newOptions[idx] = e.target.value;
                        setCustomOptions(newOptions);
                      }}
                      placeholder={`אפשרות ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="step-actions">
              <button className="secondary-btn" onClick={handleBackToSelection}>← חזרה</button>
              <button className="primary-btn" onClick={handleAddCustomQuestion}>המשיכי לסקירה →</button>
            </div>
          </div>
        )}

        {/* Step 4: Preview and Start */}
        {currentStep === 'preview' && (
          <div className="step-content">
            <h2>סקירה של השאלות</h2>
            <div className="preview-list">
              {finalQuestions.map((q, idx) => (
                <div key={q.id} className="preview-item">
                  <div className="preview-number">{idx + 1}</div>
                  <div className="preview-details">
                    <p className="preview-text">{q.text}</p>
                    <div className="preview-meta">
                      {q.questionType === 'yes-no' ? '✓ כן / לא' : '✓ בחירה מרובה'}
                      {q.isCustom && <span className="custom-badge">שאלה משלך</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="step-actions">
              <button className="secondary-btn" onClick={() => setCurrentStep('custom')}>← חזרה</button>
              <button className="success-btn" onClick={handleStartSession}>התחילי סשן עם התלמידות →</button>
            </div>
          </div>
        )}

        {/* Step 5: Review and Ready */}
        {currentStep === 'review' && (
          <div className="step-content">
            <h2>✓ מוכן להתחלה</h2>
            <div className="review-summary">
              <div className="summary-card">
                <div className="summary-icon">📋</div>
                <div className="summary-info">
                  <p className="summary-title">סך הכל שאלות</p>
                  <p className="summary-value">{finalQuestions.length}</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">📚</div>
                <div className="summary-info">
                  <p className="summary-title">נושא השיעור</p>
                  <p className="summary-value">{selectedSubject}</p>
                </div>
              </div>
              <div className="summary-card">
                <div className="summary-icon">⏱️</div>
                <div className="summary-info">
                  <p className="summary-title">משך משוער</p>
                  <p className="summary-value">{finalQuestions.length * 0.5} דק'</p>
                </div>
              </div>
            </div>

            <div className="questions-summary">
              <h3>השאלות שלך:</h3>
              <div className="questions-preview">
                {finalQuestions.map((q, idx) => (
                  <div key={q.id} className="question-preview">
                    <span className="q-number">{idx + 1}.</span>
                    <span className="q-text">{q.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="step-actions">
              <button className="secondary-btn" onClick={handleBackToPreview}>← חזור לעריכה</button>
              <button className="success-btn" onClick={handleStartQuestions}>🎯 התחיל סשן →</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

TeacherPage.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
    name: PropTypes.string
  }),
  onLogout: PropTypes.func,
  onChangeRole: PropTypes.func.isRequired
};

TeacherPage.defaultProps = {
  user: null,
  onLogout: () => {}
};

export default TeacherPage;
