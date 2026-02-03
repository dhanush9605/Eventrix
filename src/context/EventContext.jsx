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

    useEffect(() => {
        localStorage.setItem('eventrix_events', JSON.stringify(events));
    }, [events]);

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

    return (
        <EventContext.Provider value={{
            events,
            addEvent,
            updateEvent,
            deleteEvent,
            getEventById
        }}>
            {children}
        </EventContext.Provider>
    );
};
