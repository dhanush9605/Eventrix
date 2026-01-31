import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If logged in but role doesn't match, redirect to their own dashboard
        const dashboardMap = {
            student: '/student/dashboard',
            faculty: '/faculty/analytics',
            admin: '/admin/users'
        };
        return <Navigate to={dashboardMap[user.role] || '/'} replace />;
    }

    return children;
};

export default ProtectedRoute;
