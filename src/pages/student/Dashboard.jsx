import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Calendar, Award, MoreVertical, PlayCircle } from 'lucide-react';

const StudentDashboard = () => {
    const [loading, setLoading] = React.useState(true);
    const [dashboardData, setDashboardData] = React.useState({
        metrics: [],
        liveEvents: [],
        upcoming: []
    });

    React.useEffect(() => {
        // Simulate API fetch
        const fetchDashboardData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

                setDashboardData({
                    metrics: [
                        { label: 'Registered Events', value: '12', subtext: '+2 since last month', icon: Calendar, color: '#d32f2f' },
                        { label: 'Attended Events', value: '08', subtext: 'Attendance Rate: 66%', icon: PlayCircle, color: '#fff' },
                        { label: 'Certificates', value: '05', subtext: '3 pending validation', icon: Award, color: '#fff' }
                    ],
                    liveEvents: [
                        {
                            id: 1,
                            title: 'AI Workshop 2024',
                            location: 'Main Auditorium',
                            status: 'Ending in 45m',
                            image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=400&auto=format&fit=crop'
                        },
                        {
                            id: 2,
                            title: 'Annual Tech Symposium',
                            location: 'Virtual Hall A • Room: Q4-A',
                            status: 'Live Now',
                            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop'
                        },
                        {
                            id: 3,
                            title: 'Hackathon Finals',
                            location: 'Innovation Lab • Presentations Start',
                            status: 'Live Now',
                            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop'
                        }
                    ],
                    upcoming: [
                        { title: 'Web3 Fundamentals Seminar', date: 'Oct 24, 2024 • 10:00 AM', pass: 'Standard Pass', id: '#TX-92834' },
                        { title: 'Design Thinking Workshop', date: 'Oct 26, 2024 • 02:00 PM', pass: 'Premium Pass', id: '#TX-92835' }
                    ]
                });
                setLoading(false);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

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
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>Live Events</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    {liveEvents.map((e, i) => (
                        <div key={i} style={{ backgroundColor: '#0a0505', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' }}>
                            <div style={{ position: 'relative', height: '180px' }}>
                                <img src={e.image} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                                <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', border: '1px solid #333' }}>
                                    <span style={{ color: '#d32f2f', marginRight: '6px' }}>●</span> LIVE NOW
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
                                    Join Session
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Registrations */}
            <div>
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
                                    <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '4px' }}>{u.title}</h4>
                                    <p style={{ fontSize: '0.75rem', color: '#666' }}>{u.date}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#888' }}>{u.pass}</span>
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
