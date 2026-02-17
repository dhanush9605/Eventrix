import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Calendar, MapPin, Search, Filter, Clock, MoreVertical, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getEvents } from '../../services/api';
import toast from 'react-hot-toast';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, upcoming, ongoing
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            // Assuming getEvents without args returns all events or handle pagination later
            // If getEvents requires facultyId, we might need a new endpoint or modify api.js
            // For now, let's try calling it without args as per api.js definition: (facultyId) => ...
            const { data } = await getEvents();
            setEvents(data || []);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status, date) => {
        const eventDate = new Date(date);
        const now = new Date();

        if (status === 'cancelled') return '#d32f2f'; // Red
        if (eventDate < now) return '#666'; // Grey (Completed) - though these should be filtered out
        if (eventDate.toDateString() === now.toDateString()) return '#2979ff'; // Blue (Today)
        return '#00c853'; // Green (Upcoming)
    };

    const getStatusText = (status, date) => {
        const eventDate = new Date(date);
        const now = new Date();

        if (status === 'cancelled') return 'Cancelled';
        if (eventDate < now) return 'Completed';
        if (eventDate.toDateString() === now.toDateString()) return 'Live / Today';
        return 'Upcoming';
    };

    const filteredData = events?.filter(event => {
        // Exclude completed events globally
        const eventDate = new Date(event.date);
        const now = new Date();
        // If event is strictly in the past (before today's date), exclude it
        // We allow events from today (Live/Today)
        if (eventDate < now && eventDate.toDateString() !== now.toDateString()) return false;

        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesFilter = true;
        const statusText = getStatusText(event.status, event.date).toLowerCase();

        if (filterStatus !== 'all') {
            if (filterStatus === 'upcoming') matchesFilter = statusText === 'upcoming';
            if (filterStatus === 'live') matchesFilter = statusText === 'live / today';
        }

        return matchesSearch && matchesFilter;
    });


    // Styles
    const cardStyle = {
        backgroundColor: '#0a0a0a',
        border: '1px solid #111',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <DashboardLayout role="admin" title="Global Events">
            <div>
                {/* Header & Stats */}
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>
                            All Campus Events
                        </h2>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>
                            Manage and oversee active events across all departments.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                                {filteredData.length}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#666' }}>Active Events</span>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={18} />
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                backgroundColor: '#050505',
                                border: '1px solid #111',
                                padding: '12px 1rem 12px 2.5rem',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['all', 'upcoming', 'live'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    backgroundColor: filterStatus === status ? '#fff' : '#050505',
                                    color: filterStatus === status ? '#000' : '#666',
                                    border: filterStatus === status ? 'none' : '1px solid #111',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>Loading events...</div>
                ) : filteredData.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                        No events found matching your filters.
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {filteredData.map(event => (
                            <div
                                key={event._id}
                                style={cardStyle}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                onClick={() => setSelectedEvent(event)}
                            >
                                {/* Image / Placeholder */}
                                <div style={{ height: '140px', backgroundColor: '#111', position: 'relative' }}>
                                    {event.bannerImage ? (
                                        <img src={event.bannerImage} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#333' }}>
                                            <Calendar size={40} />
                                        </div>
                                    )}

                                    <span style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        color: getStatusColor(event.status, event.date),
                                        fontSize: '0.7rem',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase'
                                    }}>
                                        {getStatusText(event.status, event.date)}
                                    </span>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ marginBottom: 'auto' }}>
                                        <span style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            {event.category}
                                        </span>
                                        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', margin: '4px 0 8px' }}>
                                            {event.title}
                                        </h3>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#888', marginTop: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={14} />
                                            <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <MapPin size={14} />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Event Details Modal - Reusing logic or creating a shared component would be better, but implementing inline for speed */}
            {selectedEvent && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
                }} onClick={() => setSelectedEvent(null)}>
                    <div style={{
                        backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '16px',
                        width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto',
                        padding: '24px', position: 'relative'
                    }} onClick={e => e.stopPropagation()}>
                        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>{selectedEvent.title}</h2>
                        <p style={{ color: '#ccc', lineHeight: '1.5', marginBottom: '1.5rem' }}>{selectedEvent.description}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#666' }}>DATE</label>
                                <p style={{ color: '#fff' }}>{new Date(selectedEvent.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#666' }}>LOCATION</label>
                                <p style={{ color: '#fff' }}>{selectedEvent.location}</p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#666' }}>PARTICIPANTS</label>
                                <p style={{ color: '#fff' }}>{selectedEvent.registrations?.length || 0} / {selectedEvent.maxParticipants || 'Unl.'}</p>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: '#666' }}>FEE</label>
                                <p style={{ color: selectedEvent.isPaid ? '#ffd700' : '#00c853' }}>{selectedEvent.isPaid ? `₹${selectedEvent.fee}` : 'Free'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default AdminEvents;
