import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('eventrix_user')) {
        const user = JSON.parse(localStorage.getItem('eventrix_user'));
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const googleAuth = (credential) => API.post('/auth/google', { credential });
export const googleAuthComplete = (formData) => API.post('/auth/google/complete', formData);

// Events
export const createEvent = (eventData) => API.post('/events', eventData);
export const getEvents = (facultyId) => API.get(`/events?facultyId=${facultyId || ''}`);
export const markAttendance = (eventId, studentId) => API.post(`/events/${eventId}/attendance`, { studentId });
export const registerForEvent = (eventId, studentId) => API.post(`/events/${eventId}/register`, { studentId });

// Admin
export const getAdminStats = () => API.get('/admin/stats');
export const getAdminStatDetails = (type, id) => API.get(`/admin/stats/details?type=${type}${id ? `&id=${id}` : ''}`);

// User Management
export const getUsers = (params) => API.get('/admin/users', { params });
export const updateUserStatus = (id, status) => API.put(`/admin/users/${id}/status`, { status });
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
