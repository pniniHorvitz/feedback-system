import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './StudentPage.css';

const StudentPage = ({ user, onLogout, onChangeRole }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  useEffect(() => {
    // Get selected questions from sessionStorage (set by TeacherPage)
    const selectedQuestionsJSON = sessionStorage.getItem('selectedQuestions');
    if (selectedQuestionsJSON) {
      const selectedQuestions = JSON.parse(selectedQuestionsJSON);
      setQuestions(selectedQuestions);
    }
  }, []);

  if (questions.length === 0) {
    return (
      <div className="student-page">
        <div className="student-header">
          <button className="home-logo" onClick={() => navigate('/')} title="חזרה לעמוד הבית">💡</button>
          <div className="header-nav">
            <button className="role-switch-btn" onClick={() => { onChangeRole('teacher'); navigate('/teacher'); }} title="עמוד המורה">👩‍🏫</button>
            <button className="role-switch-btn" onClick={() => { onChangeRole('student'); navigate('/student'); }} title="עמוד התלמידה">👧</button>
            <button className="role-switch-btn" onClick={() => { onChangeRole('admin'); navigate('/admin'); }} title="לוח ניהול">📊</button>
          </div>
          <div className="header-content">
            <h1>עמוד התלמידה</h1>
            <p>המורה עדיין לא בחרה שאלות. אנא חכי...</p>
          </div>
          <button className="back-button" onClick={() => navigate('/')}>חזרה</button>
        </div>
        <div className="student-container">
          <p style={{ textAlign: 'center', color: '#999' }}>⏳ המורה תבחר שאלות בקרוב...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  const handleSubmitAnswer = () => {
    if (answer !== null) {
      setSubmitted(true);
      setAnsweredCount(answeredCount + 1);
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setAnswer(null);
          setSubmitted(false);
        } else {
          setSubmitted('completed');
        }
      }, 1500);
    }
  };

  const handleNavigate = (role) => {
    onChangeRole(role);
    navigate(`/${role}`);
  };

  const handleRestart = () => {
    // Cleanup
    sessionStorage.removeItem('selectedQuestions');
    onChangeRole('teacher');
    navigate('/teacher');
  };

  return (
    <div className="student-page">
      <div className="student-header">
        <button className="home-logo" onClick={() => navigate('/')} title="חזרה לעמוד הבית">💡</button>
        <div className="header-nav">
          <button className="role-switch-btn" onClick={() => handleNavigate('teacher')} title="עמוד המורה">👩‍🏫</button>
          <button className="role-switch-btn" onClick={() => handleNavigate('student')} title="עמוד התלמידה">👧</button>
          <button className="role-switch-btn" onClick={() => handleNavigate('admin')} title="לוח ניהול">📊</button>
        </div>
        <div className="header-content">
          <h1>עמוד התלמידה</h1>
          <p>אנא ענו בכנות וללא לחץ</p>
        </div>
        <button className="back-button" onClick={() => navigate('/')}>חזרה</button>
      </div>

      <div className="student-content">
        {submitted === 'completed' ? (
          <div className="completion-screen">
            <div className="success-animation">
              <div className="checkmark">✓</div>
            </div>
            <h2>תודה! 🎉</h2>
            <p>השלמת את כל השאלות בהצלחה</p>
            <p className="response-summary">ענית על {answeredCount} שאלות</p>
            <button className="primary-button" onClick={handleRestart}>
              חזרה לתחילה
            </button>
          </div>
        ) : submitted ? (
          <div className="success-message">
            <h2>✓ תודה!</h2>
            <p>התשובה שלך נרשמה בהצלחה</p>
            {currentQuestionIndex < questions.length - 1 && (
              <p className="next-hint">השאלה הבאה מגיעה...</p>
            )}
          </div>
        ) : (
          <div className="question-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <p className="progress-text">
              שאלה {currentQuestionIndex + 1} מתוך {questions.length}
            </p>

            <div className="question-box">
              <p className="question-text">{question.text}</p>
              
              <div className="answer-options">
                {question.questionType === 'yes-no' ? (
                  <>
                    <button
                      className={`option-btn yes ${answer === true ? 'selected' : ''}`}
                      onClick={() => setAnswer(true)}
                    >
                      <span className="icon">✓</span>
                      <span className="text">כן, הבנתי</span>
                    </button>
                    <button
                      className={`option-btn no ${answer === false ? 'selected' : ''}`}
                      onClick={() => setAnswer(false)}
                    >
                      <span className="icon">✗</span>
                      <span className="text">לא, אני צריכה עזרה</span>
                    </button>
                  </>
                ) : question.questionType === 'multiple-choice' ? (
                  question.options.map((option, idx) => (
                    <button
                      key={idx}
                      className={`option-btn choice ${answer === idx ? 'selected' : ''}`}
                      onClick={() => setAnswer(idx)}
                    >
                      {option}
                    </button>
                  ))
                ) : null}
              </div>
              
              <button
                className="submit-btn"
                onClick={handleSubmitAnswer}
                disabled={answer === null}
              >
                שליחה →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

StudentPage.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
    name: PropTypes.string
  }),
  onLogout: PropTypes.func,
  onChangeRole: PropTypes.func.isRequired
};

StudentPage.defaultProps = {
  user: null,
  onLogout: () => {}
};

export default StudentPage;
