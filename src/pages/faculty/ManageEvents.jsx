import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useEvents } from '../../context/EventContext';
import {
    Plus,
    Calendar,
    MapPin,
    Users,
    QrCode,
    Download,
    Search,
    Filter,
    ArrowUpRight,
    Trash2,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';
import * as XLSX from 'xlsx';

const ManageEvents = () => {
    const navigate = useNavigate();
    const { events, updateEvent, deleteEvent } = useEvents();

    const toggleStatus = (id, currentStatus) => {
        updateEvent(id, { status: currentStatus === 'active' ? 'inactive' : 'active' });
    };

    const exportToExcel = (event) => {
        // Create worksheet data
        const data = [
            ['Event Title', 'Date', 'Time', 'Location', 'Registrations', 'Status'],
            [event.title, event.date, event.time, event.location, event.registrations?.length || 0, event.status],
            [],
            ['Payment Info'],
            ['Is Paid', event.isPaid ? 'Yes' : 'No'],
            ['Fee', event.fee || '0'],
            ['UPI ID', event.upiId || 'N/A']
        ];

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Event Details");
        XLSX.writeFile(wb, `${event.title.replace(/\s+/g, '_')}_Details.xlsx`);
    };

    const containerStyle = {
        padding: '1rem'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem'
    };

    const searchContainerStyle = {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2.5rem'
    };

    const searchInputStyle = {
        flex: 1,
        backgroundColor: '#0a0a0a',
        border: '1px solid #1a1a1a',
        borderRadius: '10px',
        padding: '12px 16px 12px 44px',
        color: '#fff',
        fontSize: '0.9rem',
        outline: 'none'
    };

    const eventCardStyle = (isActive) => ({
        backgroundColor: '#0a0a0a',
        border: '1px solid #1a1a1a',
        borderRadius: '16px',
        padding: '1.75rem',
        transition: 'transform 0.2s, border-color 0.2s',
        position: 'relative',
        opacity: isActive ? 1 : 0.6
    });

    const statusBadgeStyle = (status) => ({
        fontSize: '0.65rem',
        fontWeight: '900',
        padding: '4px 10px',
        borderRadius: '4px',
        backgroundColor: status === 'active' ? '#00c85315' : '#44415',
        color: status === 'active' ? '#00c853' : '#666',
        border: `1px solid ${status === 'active' ? '#00c85330' : '#44430'}`,
        textTransform: 'uppercase'
    });

    return (
        <DashboardLayout role="faculty" title="Manage Events">
            <div style={containerStyle}>
                <div style={headerStyle}>
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Your Events</h2>
                        <p style={{ color: '#666' }}>You have {events.length} events across all categories.</p>
                    </div>
                    <button
                        onClick={() => navigate('/faculty/create-event')}
                        style={{
                            backgroundColor: '#d32f2f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '12px 24px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(211, 47, 47, 0.2)'
                        }}
                    >
                        <Plus size={18} /> Create New Event
                    </button>
                </div>

                <div style={searchContainerStyle}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                        <input type="text" placeholder="Search events by title or location..." style={searchInputStyle} />
                    </div>
                    <button style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', color: '#888', padding: '0 1.5rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <Filter size={18} /> Filters
                    </button>
                </div>

                {events.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem 0', backgroundColor: '#0a0a0a', borderRadius: '16px', border: '1px dashed #222' }}>
                        <Calendar size={48} color="#222" style={{ marginBottom: '1.5rem' }} />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>No events found</h3>
                        <p style={{ color: '#444', marginBottom: '2rem' }}>You haven't created any events yet. Get started by creating your first one!</p>
                        <button onClick={() => navigate('/faculty/create-event')} style={{ color: '#d32f2f', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                            Launch First Event →
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
                        {events.map((event) => (
                            <div key={event._id} style={eventCardStyle(event.status === 'active')}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <span style={statusBadgeStyle(event.status)}>{event.status}</span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            onClick={() => toggleStatus(event._id, event.status)}
                                            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: '4px' }}
                                            title={event.status === 'active' ? "Deactivate" : "Activate"}
                                        >
                                            {event.status === 'active' ? <ToggleRight size={20} color="#00c853" /> : <ToggleLeft size={20} />}
                                        </button>
                                        <button
                                            onClick={() => deleteEvent(event._id)}
                                            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: '4px' }}
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem' }}>{event.title}</h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                        <Calendar size={16} color="#d32f2f" /> {event.date} • {event.time}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                        <MapPin size={16} color="#d32f2f" /> {event.location}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                        <Users size={16} color="#d32f2f" /> {event.registrations?.length || 0} / {event.maxParticipants || '∞'} Registered
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #1a1a1a', paddingTop: '1.5rem' }}>
                                    <button style={{ flex: 1, backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <QrCode size={16} /> QR CODE
                                    </button>
                                    <button
                                        onClick={() => exportToExcel(event)}
                                        style={{ flex: 1, backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <Download size={16} /> EXCEL
                                    </button>
                                    <button style={{ backgroundColor: '#d32f2f10', color: '#d32f2f', border: 'none', width: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ManageEvents;
