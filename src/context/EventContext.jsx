import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as api from '../services/api';

const EventContext = createContext();

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};

export const EventProvider = ({ children }) => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [registrations, setRegistrations] = useState(() => {
        const savedRegs = localStorage.getItem('eventrix_registrations');
        return savedRegs ? JSON.parse(savedRegs) : [];
    });

    // Fetch events on load
    useEffect(() => {
        if (user) {
            const fetchEvents = async () => {
                try {
                    // If faculty, filter by their ID. If student/admin, fetch all (or active ones)
                    // Currently fetching all for everyone, but we could optimize.
                    // For now, let's just make the API call flexible. 
                    // To fetch ALL events for students, pass undefined/null if the API supports it.
                    // The backend currently filters IF facultyId is provided. 
                    const filterId = user.role === 'faculty' ? (user._id || user.id) : '';
                    const { data } = await api.getEvents(filterId);
                    setEvents(data);
                } catch (error) {
                    console.error("Failed to fetch events", error);
                }
            };
            fetchEvents();
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('eventrix_registrations', JSON.stringify(registrations));
    }, [registrations]);

    const addEvent = async (eventData) => {
        try {
            const { data } = await api.createEvent({ ...eventData, facultyId: user._id || user.id });
            setEvents(prev => [data, ...prev]);
            return { success: true };
        } catch (error) {
            return { success: false, message: 'Failed to create event' };
        }
    };

    const updateEvent = (id, updatedData) => {
        setEvents(prev => prev.map(event =>
            event._id === id ? { ...event, ...updatedData } : event
        ));
    };

    const deleteEvent = (id) => {
        setEvents(prev => prev.filter(event => event._id !== id));
    };

    const getEventById = (id) => {
        return events.find(event => event._id === id);
    };

    const registerForEvent = async (eventId, studentDetails) => {
        if (!studentDetails || (!studentDetails.studentId && !studentDetails.id))
            return { success: false, message: 'User not logged in or invalid student ID' };

        try {
            // Use the studentId (e.g., STU-2026-...) preferred, fallback to internal ID if needed but backend expects studentId
            const sId = studentDetails.studentId || studentDetails.id;

            await api.registerForEvent(eventId, sId);

            // Optimistically update UI
            setEvents(prev => prev.map(event => {
                if (event._id === eventId) {
                    // Add to registrations array if not present
                    const exists = event.registrations?.some(r => r.studentId === sId);
                    if (!exists) {
                        return {
                            ...event,
                            registrations: [...(event.registrations || []), { studentId: sId, registeredAt: new Date() }]
                        };
                    }
                }
                return event;
            }));

            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const markAttendance = async (eventId, studentId) => {
        try {
            const { data } = await api.markAttendance(eventId, studentId);

            // Update local state to reflect change immediately
            setEvents(prev => prev.map(event => {
                if (event._id === eventId) {
                    const alreadyMarked = event.attendance?.some(a => a.studentId === studentId);
                    if (!alreadyMarked) {
                        return {
                            ...event,
                            attendance: [...(event.attendance || []), { studentId, markedAt: new Date() }]
                        };
                    }
                }
                return event;
            }));

            return { success: true, studentName: data.studentName };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Scan failed' };
        }
    };

    const getStudentRegistrations = (studentId) => {
        // Filter events where this student is registered
        return events.filter(event =>
            event.registrations?.some(reg => reg.studentId === studentId)
        ).map(event => {
            const reg = event.registrations.find(r => r.studentId === studentId);
            return {
                id: reg._id || event._id, // Use reg ID if available, else event ID as fallback key
                eventId: event._id,
                studentId: studentId,
                status: reg.status,
                timestamp: reg.registeredAt || reg.timestamp,
                eventDetails: event
            };
        });
    };

    return (
        <EventContext.Provider value={{
            events,
            registrations,
            addEvent,
            updateEvent,
            deleteEvent,
            getEventById,
            registerForEvent,
            getStudentRegistrations,
            markAttendance
        }}>
            {children}
        </EventContext.Provider>
    );
};
