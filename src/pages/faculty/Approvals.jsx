import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { ClipboardCheck, CheckCircle2, Clock, Calendar, MapPin, Search, Filter } from 'lucide-react';

const FacultyApprovals = () => {
    const stats = [
        { label: 'PENDING REQUESTS', value: '12', icon: ClipboardCheck, color: '#d32f2f' },
        { label: 'APPROVED THIS WEEK', value: '05', icon: CheckCircle2, color: '#00c853' },
        { label: 'AVERAGE RESPONSE', value: '4h', icon: Clock, color: '#2979ff' }
    ];

    const requests = [
        {
            id: 1,
            user: 'Marcus Chen',
            role: 'President, AI Society',
            event: 'Generative AI Workshop 2024',
            date: 'Oct 24, 2024 • 10:00 AM - 4:00 PM',
            location: 'Main Auditorium, North Wing',
            category: 'ACADEMIC',
            image: 'https://i.pravatar.cc/150?u=marcus'
        },
        {
            id: 2,
            user: 'Anita Rao',
            role: 'Cultural Secretary',
            event: 'Annual Fusion Night 2024',
            date: 'Nov 02, 2024 • 6:00 PM - 10:00 PM',
            location: 'Open Air Theater',
            category: 'CULTURAL',
            image: 'https://i.pravatar.cc/150?u=anita'
        },
        {
            id: 3,
            user: 'David Miller',
            role: 'Sports Coordinator',
            event: 'Inter-College Basketball Finals',
            date: 'Oct 28, 2024 • 8:00 AM - 1:00 PM',
            location: 'Indoor Sports Complex',
            category: 'SPORTS',
            image: 'https://i.pravatar.cc/150?u=david'
        },
        {
            id: 4,
            user: 'Elena Petrova',
            role: 'Head of Research',
            event: 'Robotics Challenge Q4',
            date: 'Nov 05, 2024 • 9:00 AM - 5:00 PM',
            location: 'Innovation Lab 2',
            category: 'TECHNICAL',
            image: 'https://i.pravatar.cc/150?u=elena'
        }
    ];

    return (
        <DashboardLayout role="faculty" title="Faculty Approval Panel">
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '8px', fontSize: '0.8rem', color: '#666' }}>
                <span>Dashboard</span>
                <span>›</span>
                <span style={{ color: '#fff' }}>Approvals</span>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((s, i) => (
                    <div key={i} style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#666', fontWeight: '800', marginBottom: '1rem' }}>{s.label}</span>
                            <span style={{ fontSize: '2.5rem', fontWeight: '700' }}>{s.value}</span>
                        </div>
                        <div style={{ padding: '8px', color: s.color }}>
                            <s.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Header with Search/Filter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Approval Queue <span style={{ color: '#666', fontWeight: '400', fontSize: '1rem', marginLeft: '8px' }}>(12 pending)</span></h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>Newest First</button>
                    <button style={{ color: '#666', padding: '8px 16px', fontSize: '0.75rem', fontWeight: 'bold', border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Filter By Dept
                    </button>
                </div>
            </div>

            {/* Requests Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                {requests.map((r) => (
                    <div key={r.id} style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <img src={r.image} alt={r.user} style={{ width: '48px', height: '48px', borderRadius: '8px' }} />
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{r.user}</h4>
                                    <p style={{ fontSize: '0.75rem', color: '#666' }}>{r.role}</p>
                                </div>
                            </div>
                            <span style={{ backgroundColor: '#111', color: '#666', padding: '4px 10px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: '800' }}>{r.category}</span>
                        </div>

                        <h2 style={{ fontSize: '1.25rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{r.event}</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                <Calendar size={16} /> {r.date}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                <MapPin size={16} /> {r.location}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button style={{ flex: 1, backgroundColor: '#111', border: '1px solid #333', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                Approve
                            </button>
                            <button style={{ flex: 1, background: 'none', border: 'none', color: '#444', padding: '12px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#444', fontSize: '0.75rem', marginBottom: '1.5rem' }}>Showing 4 of 12 pending requests</p>
                <button style={{ backgroundColor: '#111', border: '1px solid #222', color: '#aaa', padding: '12px 30px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    View More Requests
                </button>
            </div>
        </DashboardLayout>
    );
};

export default FacultyApprovals;
