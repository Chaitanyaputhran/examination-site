import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';

import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import SubjectManagement from './pages/admin/SubjectManagement';
import QuestionManagement from './pages/admin/QuestionManagement';
import TestManagement from './pages/admin/TestManagement';
import AdminReports from './pages/admin/AdminReports';

import StudentDashboard from './pages/student/StudentDashboard';
import AvailableTests from './pages/student/AvailableTests';
import ExamPage from './pages/student/ExamPage';
import PerformanceReports from './pages/student/PerformanceReports';
import TestReport from './pages/student/TestReport';
import Profile from './pages/student/Profile';
import AdminProfile from './pages/admin/AdminProfile';

function PrivateRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        <Route
          path="/"
          element={
            user ? (
              user.role === 'ADMIN' ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/student/dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute role="ADMIN">
              <UserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/subjects"
          element={
            <PrivateRoute role="ADMIN">
              <SubjectManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/questions"
          element={
            <PrivateRoute role="ADMIN">
              <QuestionManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/tests"
          element={
            <PrivateRoute role="ADMIN">
              <TestManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <PrivateRoute role="ADMIN">
              <AdminReports />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <PrivateRoute role="ADMIN">
              <AdminProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute role="STUDENT">
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/tests"
          element={
            <PrivateRoute role="STUDENT">
              <AvailableTests />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/exam/:testId"
          element={
            <PrivateRoute role="STUDENT">
              <ExamPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/performance"
          element={
            <PrivateRoute role="STUDENT">
              <PerformanceReports />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/report/:attemptId"
          element={
            <PrivateRoute role="STUDENT">
              <TestReport />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <PrivateRoute role="STUDENT">
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
