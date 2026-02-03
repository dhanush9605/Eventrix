import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Users, Calendar, Building, TrendingUp, Activity, Bell } from 'lucide-react';

const AdminOverview = () => {
    const stats = [
        { label: 'TOTAL USERS', value: '1,234', change: '+12% this month', icon: Users, color: '#d32f2f', bg: '#d32f2f15' },
        { label: 'ACTIVE EVENTS', value: '42', change: '8 happening today', icon: Calendar, color: '#fff', bg: '#ffffff10' },
        { label: 'DEPARTMENTS', value: '18', change: 'All systems operational', icon: Building, color: '#fff', bg: '#ffffff10' },
        { label: 'ENGAGEMENT', value: '89%', change: '+5% vs last week', icon: TrendingUp, color: '#00c853', bg: '#00c85315' }
    ];

    const activities = [
        { user: 'Dr. Sarah Jenkins', action: 'created a new event', target: 'AI Symposium 2024', time: '2 mins ago' },
        { user: 'Michael Admin', action: 'approved budget for', target: 'Campus Fest', time: '15 mins ago' },
        { user: 'System', action: 'generated weekly report', target: 'User Analytics', time: '1 hour ago' },
        { user: 'Alex Student', action: 'registered for', target: 'Web3 Workshop', time: '2 hours ago' },
    ];

    return (
        <DashboardLayout role="admin" title="System Overview">
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((s, i) => (
                    <div key={i} style={{
                        backgroundColor: '#0a0a0a',
                        border: '1px solid #1a1a1a',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        transition: 'transform 0.2s',
                        cursor: 'default'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <s.icon size={20} />
                            </div>
                            {i === 0 && <span style={{ backgroundColor: '#d32f2f', color: '#fff', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>NEW</span>}
                        </div>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>{s.value}</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#666' }}>{s.label}</span>
                            <span style={{ fontSize: '0.65rem', color: s.color }}>{s.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Main Chart Area Placeholder */}
                <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2rem', height: '400px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Traffic Overview</h3>
                        <select style={{ backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', padding: '4px 8px', fontSize: '0.8rem' }}>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #222', borderRadius: '8px', color: '#444' }}>
                        <Activity size={48} />
                        <span style={{ marginLeft: '1rem' }}>Activity Chart Visualization Placeholder</span>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                        <Bell size={18} color="#d32f2f" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Recent Activity</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {activities.map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: i === 0 ? '#d32f2f' : '#333', marginTop: '6px' }}></div>
                                <div>
                                    <p style={{ fontSize: '0.85rem', color: '#ddd', marginBottom: '4px' }}>
                                        <span style={{ fontWeight: 'bold' }}>{item.user}</span> {item.action} <span style={{ color: '#d32f2f' }}>{item.target}</span>
                                    </p>
                                    <span style={{ fontSize: '0.7rem', color: '#666' }}>{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button style={{ width: '100%', marginTop: '2rem', padding: '10px', background: 'none', border: '1px solid #222', borderRadius: '8px', color: '#888', fontSize: '0.8rem', cursor: 'pointer' }}>
                        View All Activity
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminOverview;
