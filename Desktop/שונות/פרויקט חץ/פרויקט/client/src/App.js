import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import DemoSelector from './pages/DemoSelector';
import TeacherPage from './pages/TeacherPage';
import StudentPage from './pages/StudentPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleSelectRole = (role) => {
    const newUser = { role, name: 'משתמש דמו' };
    setUser(newUser);
  };

  const handleChangeRole = (newRole) => {
    setUser({ role: newRole, name: 'משתמש דמו' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              !user ? <DemoSelector onSelectRole={handleSelectRole} /> : <Navigate to={`/${user.role}`} />
            }
          />
          <Route
            path="/teacher"
            element={
              <TeacherPage user={user} onLogout={handleLogout} onChangeRole={handleChangeRole} />
            }
          />
          <Route
            path="/student"
            element={
              <StudentPage user={user} onLogout={handleLogout} onChangeRole={handleChangeRole} />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPage user={user} onLogout={handleLogout} onChangeRole={handleChangeRole} />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
