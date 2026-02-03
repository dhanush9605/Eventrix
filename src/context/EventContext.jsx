import React, { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
};

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem('eventrix_events');
        return savedEvents ? JSON.parse(savedEvents) : [];
    });

    const [registrations, setRegistrations] = useState(() => {
        const savedRegs = localStorage.getItem('eventrix_registrations');
        return savedRegs ? JSON.parse(savedRegs) : [];
    });

    useEffect(() => {
        localStorage.setItem('eventrix_events', JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        localStorage.setItem('eventrix_registrations', JSON.stringify(registrations));
    }, [registrations]);

    const addEvent = (eventData) => {
        const newEvent = {
            ...eventData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: 'active', // default status
            registrations: 0,
            attendance: 0
        };
        setEvents(prev => [...prev, newEvent]);
        return newEvent;
    };

    const updateEvent = (id, updatedData) => {
        setEvents(prev => prev.map(event =>
            event.id === id ? { ...event, ...updatedData } : event
        ));
    };

    const deleteEvent = (id) => {
        setEvents(prev => prev.filter(event => event.id !== id));
    };

    const getEventById = (id) => {
        return events.find(event => event.id === id);
    };

    const registerForEvent = (eventId, studentDetails) => {
        if (!studentDetails || !studentDetails.id) return { success: false, message: 'User not logged in' };

        // Real-time check against local storage to prevent race conditions from rapid clicks
        const currentRegs = JSON.parse(localStorage.getItem('eventrix_registrations') || '[]');
        const isDuplicate = currentRegs.some(r => r.eventId === eventId && r.studentId === studentDetails.id);

        if (isDuplicate) {
            return { success: false, message: 'You are already registered for this event.' };
        }

        const newRegistration = {
            id: 'REG-' + Date.now(),
            eventId,
            studentId: studentDetails.id,
            studentName: studentDetails.name,
            timestamp: new Date().toISOString(),
            status: 'Confirmed'
        };

        // Update state and localStorage immediately
        const updatedRegs = [...currentRegs, newRegistration];
        setRegistrations(updatedRegs);
        localStorage.setItem('eventrix_registrations', JSON.stringify(updatedRegs));

        // Update event registration count
        setEvents(prev => prev.map(event => {
            if (event.id === eventId) {
                return { ...event, registrations: (event.registrations || 0) + 1 };
            }
            return event;
        }));

        return { success: true };
    };

    const getStudentRegistrations = (studentId) => {
        return registrations.filter(r => r.studentId === studentId).map(reg => {
            const event = events.find(e => e.id === reg.eventId);
            return { ...reg, eventDetails: event };
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
            getStudentRegistrations
        }}>
            {children}
        </EventContext.Provider>
    );
};
