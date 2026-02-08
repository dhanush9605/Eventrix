import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

import * as api from '../services/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('eventrix_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (userData) => {
        try {
            const { data } = await api.login(userData);
            setUser(data.result);
            localStorage.setItem('eventrix_user', JSON.stringify({ ...data.result, token: data.token }));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await api.register(userData);
            setUser(data.result);
            localStorage.setItem('eventrix_user', JSON.stringify({ ...data.result, token: data.token }));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const googleAuth = async (credential) => {
        try {
            const { data } = await api.googleAuth(credential);
            if (data?.result) {
                // User exists, log them in
                setUser(data.result);
                localStorage.setItem('eventrix_user', JSON.stringify({ ...data.result, token: data.token }));
                return { success: true };
            } else if (data?.isNew) {
                // New user, return data for completion step
                return { success: false, isNew: true, googleData: data.googleData };
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Google Auth failed' };
        }
    };

    const googleAuthComplete = async (formData) => {
        try {
            const { data } = await api.googleAuthComplete(formData);
            setUser(data.result);
            localStorage.setItem('eventrix_user', JSON.stringify({ ...data.result, token: data.token }));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eventrix_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, googleAuth, googleAuthComplete, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
