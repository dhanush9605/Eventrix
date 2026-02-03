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
import FacultyCreateEvent from './pages/faculty/CreateEvent';
import FacultyManageEvents from './pages/faculty/ManageEvents';
import AdminUsers from './pages/admin/Users';

import AdminOverview from './pages/admin/Overview';
import AdminDepartments from './pages/admin/Departments';
import AdminEvents from './pages/admin/Events';
import AdminReports from './pages/admin/Reports';

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

          <Route path="/faculty/create-event" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyCreateEvent />
            </ProtectedRoute>
          } />

          <Route path="/faculty/manage-events" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyManageEvents />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/overview" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminOverview />
            </ProtectedRoute>
          } />

          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          } />

          <Route path="/admin/departments" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDepartments />
            </ProtectedRoute>
          } />

          <Route path="/admin/events" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminEvents />
            </ProtectedRoute>
          } />

          <Route path="/admin/reports" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminReports />
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
