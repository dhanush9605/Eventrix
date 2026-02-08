import React from 'react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Calendar, MapPin, Clock, MoreVertical, QrCode, Download, X } from 'lucide-react';
import StudentQRPass from '../../components/StudentQRPass';

const StudentRegistrations = () => {
    const { getStudentRegistrations } = useEvents();
    const { user } = useAuth();
    const [selectedTicket, setSelectedTicket] = React.useState(null);
    const [showTicketModal, setShowTicketModal] = React.useState(false);

    // Get registrations from context
    const registrations = getStudentRegistrations(user?.studentId || user?.id);

    const getStatusStyle = (status) => {
        if (!status) return { bg: '#333', color: '#ccc', border: '#666' };

        switch (status.toLowerCase()) {
            case 'confirmed': return { bg: '#2e7d3215', color: '#4caf50', border: '#2e7d32' };
            case 'pending approval': return { bg: '#ed6c0215', color: '#ff9800', border: '#ed6c02' };
            case 'waitlisted': return { bg: '#0288d115', color: '#03a9f4', border: '#0288d1' };
            default: return { bg: '#333', color: '#ccc', border: '#666' };
        }
    };

    return (
        <DashboardLayout role="student" title="My Registrations">
            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {registrations.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                        <p>You haven't registered for any events yet.</p>
                    </div>
                ) : (
                    registrations.map(reg => {
                        const statusStyle = getStatusStyle(reg.status);
                        const event = reg.eventDetails || {}; // Handle missing event details

                        return (
                            <div key={reg.id} style={{
                                backgroundColor: '#0a0505',
                                border: '1px solid #1a1a1a',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    {/* Event Image & Date Box */}
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            flexShrink: 0,
                                            backgroundColor: '#222' // Fallback bg
                                        }}>
                                            {event.bannerImage ? (
                                                <img src={event.bannerImage} alt={event.title} referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '0.7rem' }}>No Img</div>
                                            )}
                                        </div>

                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>{event.title}</h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '0.85rem' }}>
                                                    <Calendar size={14} /> <span>{event.date} • {event.time}</span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '0.85rem' }}>
                                                    <MapPin size={14} /> <span>{event.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                                    <div style={{ minWidth: '120px' }}>
                                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '4px' }}>Ticket Type</span>
                                        <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{event.isPaid ? 'Paid Entry' : 'Standard Pass'}</span>
                                    </div>

                                    <div style={{ minWidth: '100px' }}>
                                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '4px' }}>Status</span>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '100px',
                                            backgroundColor: statusStyle.bg,
                                            color: statusStyle.color,
                                            border: `1px solid ${statusStyle.border}40`,
                                            fontSize: '0.75rem',
                                            fontWeight: '600'
                                        }}>
                                            {reg.status}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button
                                            onClick={() => {
                                                setSelectedTicket(event);
                                                setShowTicketModal(true);
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                backgroundColor: '#fff',
                                                color: '#000',
                                                border: 'none',
                                                padding: '8px 16px',
                                                borderRadius: '6px',
                                                fontWeight: '600',
                                                fontSize: '0.85rem',
                                                cursor: 'pointer'
                                            }}>
                                            <QrCode size={16} /> View Ticket
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Ticket Modal */}
            {showTicketModal && selectedTicket && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '400px', padding: '1rem' }}>
                        <button
                            onClick={() => setShowTicketModal(false)}
                            style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                padding: '10px',
                                zIndex: 10
                            }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>
                                Entry Pass for {selectedTicket.title}
                            </h2>
                            <StudentQRPass />
                            <p style={{ color: '#888', fontSize: '0.8rem', textAlign: 'center' }}>
                                Present this QR code at the event entrance for scanning.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default StudentRegistrations;
