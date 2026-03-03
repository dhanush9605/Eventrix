import React, { useState } from 'react';
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
    ToggleRight,
    Edit, // Import Edit
    X
} from 'lucide-react';
import * as XLSX from 'xlsx';

const ManageEvents = () => {
    const navigate = useNavigate();
    const { events, updateEvent, deleteEvent, fetchEventDetails } = useEvents();

    const [selectedEventLogs, setSelectedEventLogs] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingRegistrations, setIsLoadingRegistrations] = useState(false);

    const handleViewRegistrations = async (event) => {
        setIsLoadingRegistrations(true);
        setIsModalOpen(true);
        setSelectedEventLogs(null);
        try {
            const result = await fetchEventDetails(event._id);
            if (result.success) {
                setSelectedEventLogs({ eventTitle: event.title, registrations: result.data.registrations });
            } else {
                alert("Failed to fetch registrations.");
                setIsModalOpen(false);
            }
        } catch (error) {
            alert("Error fetching registrations.");
            setIsModalOpen(false);
        } finally {
            setIsLoadingRegistrations(false);
        }
    };

    const toggleStatus = (id, currentStatus) => {
        updateEvent(id, { status: currentStatus === 'active' ? 'inactive' : 'active' });
    };

    const exportToExcel = async (event) => {
        try {
            // Fetch detailed event info including populated registrations
            const result = await fetchEventDetails(event._id);
            if (!result.success) {
                alert("Failed to fetch event details for export.");
                return;
            }

            const detailedEvent = result.data;

            // Create worksheet data
            const data = [
                ['Event Title', 'Date', 'Time', 'Location', 'Total Registrations', 'Status'],
                [detailedEvent.title, detailedEvent.date, detailedEvent.time, detailedEvent.location, detailedEvent.registrations?.length || 0, detailedEvent.status],
                [],
                ['Payment Info'],
                ['Is Paid', detailedEvent.isPaid ? 'Yes' : 'No'],
                ['Fee', detailedEvent.fee || '0'],
                ['UPI ID', detailedEvent.upiId || 'N/A'],
                [],
                // Participant Details Header
                ['Registration List'],
                ['S.No', 'Student Name', 'Student ID', 'Email', 'Department', 'Year', 'Status', 'Payment UTR', 'Registration Date']
            ];

            // Add participant rows
            if (detailedEvent.registrations && detailedEvent.registrations.length > 0) {
                detailedEvent.registrations.forEach((reg, index) => {
                    data.push([
                        index + 1,
                        reg.studentName || 'N/A',
                        reg.studentId || 'N/A',
                        reg.studentEmail || 'N/A',
                        reg.department || 'N/A',
                        reg.year || 'N/A',
                        reg.status || 'Confirmed',
                        reg.utr || 'N/A',
                        new Date(reg.registeredAt).toLocaleDateString()
                    ]);
                });
            } else {
                data.push(['No registrations found for this event.']);
            }

            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Event Details");
            XLSX.writeFile(wb, `${event.title.replace(/\s+/g, '_')}_Registrations.xlsx`);
        } catch (error) {
            console.error("Error exporting to Excel:", error);
            alert("Error exporting to Excel.");
        }
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
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
                                                    deleteEvent(event._id);
                                                }
                                            }}
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
                                    <button
                                        onClick={() => handleViewRegistrations(event)}
                                        style={{ flex: 1, backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <Users size={16} /> VIEW
                                    </button>
                                    <button
                                        onClick={() => navigate(`/faculty/edit-event/${event._id}`)}
                                        style={{ flex: 1, backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <Edit size={16} /> EDIT
                                    </button>
                                    <button
                                        onClick={() => exportToExcel(event)}
                                        style={{ flex: 1, backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <Download size={16} /> EXCEL
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        backgroundColor: '#0a0a0a',
                        border: '1px solid #222',
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '900px',
                        maxHeight: '80vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                {selectedEventLogs ? `Registrations for ${selectedEventLogs.eventTitle}` : 'Loading...'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                            {isLoadingRegistrations ? (
                                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>Loading registrations...</div>
                            ) : selectedEventLogs && selectedEventLogs.registrations && selectedEventLogs.registrations.length > 0 ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                                    <thead>
                                        <tr style={{ color: '#888', borderBottom: '1px solid #222' }}>
                                            <th style={{ padding: '12px 8px' }}>Name</th>
                                            <th style={{ padding: '12px 8px' }}>Student ID</th>
                                            <th style={{ padding: '12px 8px' }}>Department</th>
                                            <th style={{ padding: '12px 8px' }}>Status</th>
                                            <th style={{ padding: '12px 8px' }}>Payment UTR</th>
                                            <th style={{ padding: '12px 8px' }}>Registered At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedEventLogs.registrations.map((reg, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                                <td style={{ padding: '12px 8px', color: '#fff' }}>{reg.studentName || 'N/A'}</td>
                                                <td style={{ padding: '12px 8px', color: '#bbb' }}>{reg.studentId || 'N/A'}</td>
                                                <td style={{ padding: '12px 8px', color: '#bbb' }}>{reg.department || 'N/A'}</td>
                                                <td style={{ padding: '12px 8px', color: reg.status === 'Confirmed' ? '#4caf50' : '#d32f2f' }}>{reg.status || 'Confirmed'}</td>
                                                <td style={{ padding: '12px 8px', color: '#bbb' }}>{reg.utr || 'N/A'}</td>
                                                <td style={{ padding: '12px 8px', color: '#888' }}>{reg.registeredAt ? new Date(reg.registeredAt).toLocaleDateString() : 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>No registrations found.</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default ManageEvents;
