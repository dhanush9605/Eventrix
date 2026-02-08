import React, { useState, useEffect } from 'react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Calendar, Award, MoreVertical, PlayCircle, QrCode, X } from 'lucide-react';
import StudentQRPass from '../../components/StudentQRPass';

const StudentDashboard = () => {
    const { events, getStudentRegistrations } = useEvents();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [showID, setShowID] = useState(false);

    const [dashboardData, setDashboardData] = useState({
        metrics: [],
        liveEvents: [],
        upcoming: []
    });

    useEffect(() => {
        // Compute stats from real data
        const registrations = getStudentRegistrations(user?.id);
        const liveEvents = events.filter(e => e.status === 'active').slice(0, 3);
        const upcoming = registrations.slice(0, 5);

        setDashboardData({
            metrics: [
                { label: 'Registered Events', value: registrations.length.toString(), subtext: 'Total registrations', icon: Calendar, color: '#d32f2f' },
                { label: 'Attended Events', value: '0', subtext: 'Attendance Rate: 0%', icon: PlayCircle, color: '#fff' }, // Placeholder
                { label: 'Certificates', value: '0', subtext: '0 pending validation', icon: Award, color: '#fff' } // Placeholder
            ],
            liveEvents: liveEvents,
            upcoming: upcoming
        });
        setLoading(false);
    }, [events, user]);

    const handleJoinSession = (eventName) => {
        alert(`Joining session for: ${eventName}`);
        // In a real app, this would navigate to the session URL or open a modal
    };

    if (loading) {
        return (
            <DashboardLayout role="student" title="Student Portal">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: '#666' }}>
                    Loading your dashboard...
                </div>
            </DashboardLayout>
        );
    }

    const { metrics, liveEvents, upcoming } = dashboardData;

    return (
        <DashboardLayout role="student" title="Student Portal">
            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                {metrics.map((m, i) => (
                    <div key={i} style={{
                        backgroundColor: '#0a0505',
                        border: '1px solid #1a1a1a',
                        borderRadius: '12px',
                        padding: '2rem',
                        position: 'relative',
                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.borderColor = '#333';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = '#1a1a1a';
                        }}
                    >
                        <span style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>{m.label}</span>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <div>
                                <span style={{ fontSize: '3rem', fontWeight: '700', lineHeight: 1 }}>{m.value}</span>
                                <p style={{ fontSize: '0.75rem', color: m.color === '#d32f2f' ? '#d32f2f' : '#666', marginTop: '1rem', fontWeight: '600' }}>{m.subtext}</p>
                            </div>
                            <m.icon size={24} color="#1a1a1a" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Live Events Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Live Events</h2>
                <button
                    onClick={() => setShowID(true)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#d32f2f15',
                        border: '1px solid #d32f2f30',
                        color: '#d32f2f',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#d32f2f25'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#d32f2f15'}
                >
                    <QrCode size={16} /> My Digital ID
                </button>
            </div>

            {/* ID Modal */}
            {showID && (
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
                    zIndex: 1000,
                    backdropFilter: 'blur(5px)'
                }}>
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowID(false)}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '0',
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '0.9rem'
                            }}
                        >
                            <X size={20} /> Close
                        </button>
                        <StudentQRPass />
                    </div>
                </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {liveEvents.map((e, i) => (
                    <div key={i} style={{ backgroundColor: '#0a0505', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', height: '180px' }}>
                            {e.bannerImage ? (
                                <img src={e.bannerImage} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', backgroundColor: '#222' }} />
                            )}

                            <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', border: '1px solid #333' }}>
                                <span style={{ color: '#d32f2f', marginRight: '6px' }}>●</span> {e.status.toUpperCase()}
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{e.title}</h3>
                            <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '2rem' }}>{e.location}</p>
                            <button
                                onClick={() => handleJoinSession(e.title)}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #1a1a1a',
                                    color: '#fff',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#111'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#0a0a0a'}
                            >
                                {e.status === 'active' ? 'Register Now' : 'View Details'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upcoming Registrations */}
            <div style={{ marginTop: '3rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>Upcoming Registrations</h2>
                <div style={{ backgroundColor: '#0a0505', border: '1px solid #1a1a1a', borderRadius: '12px' }}>
                    {upcoming.map((u, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1.5rem 2rem',
                            borderBottom: i === upcoming.length - 1 ? 'none' : '1px solid #1a1a1a'
                        }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ backgroundColor: '#111', padding: '12px', borderRadius: '8px', color: '#444' }}>
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '4px' }}>{u.eventDetails?.title || 'Unknown Event'}</h4>
                                    <p style={{ fontSize: '0.75rem', color: '#666' }}>{u.eventDetails?.date || 'Date N/A'}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#888' }}>
                                        {u.eventDetails?.isPaid ? 'Paid Entry' : 'Standard Pass'}
                                    </span>
                                    <span style={{ fontSize: '0.6rem', color: '#444' }}>{u.id}</span>
                                </div>
                                <MoreVertical size={20} color="#444" cursor="pointer" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;
