import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterStudent from './pages/RegisterStudent';
import RegisterFaculty from './pages/RegisterFaculty';
import StudentDashboard from './pages/student/Dashboard';
import StudentEvents from './pages/student/Events';
import StudentRegistrations from './pages/student/Registrations';
import StudentCertificates from './pages/student/Certificates';
import StudentProfile from './pages/student/Profile';
import Settings from './pages/Settings';
import HelpCenter from './pages/HelpCenter';
import Maintenance from './pages/Maintenance';
import * as api from './services/api';
import { useAuth } from './context/AuthContext';
import FacultyAnalytics from './pages/faculty/Analytics';
import FacultyScanner from './pages/faculty/Scanner';
import FacultyCreateEvent from './pages/faculty/CreateEvent';
import FacultyManageEvents from './pages/faculty/ManageEvents';
import AdminUsers from './pages/admin/Users';

import AdminOverview from './pages/admin/Overview';
import AdminDepartments from './pages/admin/Departments';
import AdminEvents from './pages/admin/Events';
import AdminReports from './pages/admin/Reports';

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();
  const [isMaintenance, setIsMaintenance] = React.useState(false);

  React.useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const { data } = await api.getSettings();
        if (data.maintenanceMode && user?.role !== 'admin') {
          setIsMaintenance(true);
        } else {
          setIsMaintenance(false);
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    };

    checkMaintenance();
    const interval = setInterval(checkMaintenance, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {isMaintenance && !isLoginPage ? (
        <Maintenance />
      ) : (
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

          <Route path="/student/profile" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentProfile />
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

          <Route path="/faculty/scanner" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyScanner />
            </ProtectedRoute>
          } />

          <Route path="/faculty/create-event" element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyCreateEvent />
            </ProtectedRoute>
          } />

          <Route path="/faculty/edit-event/:id" element={
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
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
