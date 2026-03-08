import axios from 'axios';

const getBaseURL = () => {
    const url = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    return url.endsWith('/api') ? url : `${url}/api`;
};

const API = axios.create({ baseURL: getBaseURL() });
API.interceptors.request.use((req) => {
    if (localStorage.getItem('eventrix_user')) {
        const user = JSON.parse(localStorage.getItem('eventrix_user'));
        req.headers.Authorization = `Bearer ${user.token}`;
    }

    const maintPass = localStorage.getItem('maintenance_password');
    if (maintPass) {
        req.headers['x-maintenance-password'] = maintPass;
    }
    return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const googleAuth = (credential, accessToken, role) => API.post('/auth/google', { credential, accessToken, role });
export const googleAuthComplete = (formData) => API.post('/auth/google/complete', formData);
export const updateProfile = (formData) => API.put('/auth/profile', formData);

// Events
export const createEvent = (eventData) => API.post('/events', eventData);
export const updateEvent = (id, eventData) => API.put(`/events/${id}`, eventData);
export const getEvents = (facultyId) => API.get(`/events?facultyId=${facultyId || ''}`);
export const getEventDetails = (id) => API.get(`/events/${id}/details`);
export const markAttendance = (eventId, studentId) => API.post(`/events/${eventId}/attendance`, { studentId });
export const registerForEvent = (eventId, studentId, utr) => API.post(`/events/${eventId}/register`, { studentId, utr });
export const getAttendedEvents = (studentId) => API.get(`/events/attended/${studentId}`);

// Admin
export const getAdminStats = () => API.get('/admin/stats');
export const getAdminStatDetails = (type, id) => API.get(`/admin/stats/details?type=${type}${id ? `&id=${id}` : ''}`);

// User Management
export const getUsers = (params) => API.get('/admin/users', { params });
export const updateUserStatus = (id, status) => API.put(`/admin/users/${id}/status`, { status });
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const deleteEvent = (id) => API.delete(`/events/${id}`);

// Departments
export const getDepartments = () => API.get('/departments');
export const getDepartmentHierarchy = () => API.get('/departments/hierarchy');
export const createDepartment = (deptData) => API.post('/departments', deptData);
export const updateDepartment = (id, deptData) => API.put(`/departments/${id}`, deptData);
export const deleteDepartment = (id) => API.delete(`/departments/${id}`);

// Feedback
export const submitFeedback = (feedbackData) => API.post('/feedback', feedbackData);
export const getEventFeedback = (eventId) => API.get(`/feedback/event/${eventId}`);
export const getFeedbackStats = () => API.get('/feedback/stats');

// Global Settings
export const getSettings = () => API.get('/settings');
export const updateSettings = (settingsData) => API.put('/settings', settingsData);
