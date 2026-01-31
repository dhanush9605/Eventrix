import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Calendar, MapPin, Clock, MoreVertical, QrCode, Download } from 'lucide-react';

const StudentRegistrations = () => {
    const registrations = [
        {
            id: 'REG-2024-001',
            event: 'AI Workshop 2024',
            date: 'Oct 24, 2024',
            time: '10:00 AM - 12:00 PM',
            location: 'Main Auditorium',
            status: 'Confirmed',
            ticketType: 'Standard Pass',
            price: 'Free',
            image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=400&auto=format&fit=crop'
        },
        {
            id: 'REG-2024-045',
            event: 'Annual Tech Symposium',
            date: 'Oct 24, 2024',
            time: '09:00 AM - 05:00 PM',
            location: 'Virtual Hall A',
            status: 'Confirmed',
            ticketType: 'VIP Access',
            price: '$15.00',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop'
        },
        {
            id: 'REG-2024-089',
            event: 'Hackathon Finals',
            date: 'Oct 25, 2024',
            time: '10:00 AM',
            location: 'Innovation Lab',
            status: 'Pending Approval',
            ticketType: 'Team Entry',
            price: 'Free',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop'
        },
        {
            id: 'REG-2024-112',
            event: 'Career Fair Spring',
            date: 'Nov 05, 2024',
            time: '09:00 AM',
            location: 'University Grounds',
            status: 'Waitlisted',
            ticketType: 'Student Pass',
            price: 'Free',
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop'
        }
    ];

    const getStatusStyle = (status) => {
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
                {registrations.map(reg => {
                    const statusStyle = getStatusStyle(reg.status);
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
                                        flexShrink: 0
                                    }}>
                                        <img src={reg.image} alt={reg.event} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>

                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>{reg.event}</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '0.85rem' }}>
                                                <Calendar size={14} /> <span>{reg.date} • {reg.time}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '0.85rem' }}>
                                                <MapPin size={14} /> <span>{reg.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                                <div style={{ minWidth: '120px' }}>
                                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '4px' }}>Ticket Type</span>
                                    <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{reg.ticketType}</span>
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
                                    <button style={{
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
                                    <button style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid #333',
                                        color: '#ccc',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        cursor: 'pointer'
                                    }}>
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </DashboardLayout>
    );
};

export default StudentRegistrations;
