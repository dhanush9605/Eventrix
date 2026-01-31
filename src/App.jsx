import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterStudent from './pages/RegisterStudent';
import RegisterFaculty from './pages/RegisterFaculty';
import StudentDashboard from './pages/student/Dashboard';
import StudentEvents from './pages/student/Events';
import StudentRegistrations from './pages/student/Registrations';
import StudentCertificates from './pages/student/Certificates';
import Settings from './pages/Settings'; // Import
import HelpCenter from './pages/HelpCenter'; // Import
import FacultyAnalytics from './pages/faculty/Analytics';
import FacultyApprovals from './pages/faculty/Approvals';
import AdminUsers from './pages/admin/Users';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/student" element={<RegisterStudent />} />
          <Route path="/register/faculty" element={<RegisterFaculty />} />

          {/* Protected Routes */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />

          <Route path="/student/events" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentEvents />
            </ProtectedRoute>
          } />

          <Route path="/student/registrations" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentRegistrations />
            </ProtectedRoute>
          } />

          <Route path="/student/certificates" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentCertificates />
            </ProtectedRoute>
          } />

          {/* Shared Routes */}
          <Route path="/settings" element={
            <ProtectedRoute allowedRoles={['student', 'faculty', 'admin']}>
              <Settings />
            </ProtectedRoute>
          } />

          <Route path="/help-center" element={
            <ProtectedRoute allowedRoles={['student', 'faculty', 'admin']}>
              <HelpCenter />
            </ProtectedRoute>
          } />

          <Route path="/faculty/analytics" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyAnalytics />
            </ProtectedRoute>
          } />

          <Route path="/faculty/approvals" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyApprovals />
            </ProtectedRoute>
          } />

          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
