import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Calendar,
    Users,
    Star
} from 'lucide-react';

const FacultyAnalytics = () => {
    const navigate = useNavigate();
    const { events } = useEvents();
    const { user } = useAuth();
    const activeEvents = events.filter(e => e.status === 'active').length;
    const totalRegistrations = events.reduce((sum, e) => sum + (e.registrations?.length || 0), 0);

    return (
        <DashboardLayout role="faculty" title="Faculty Dashboard">
            <div style={{ marginBottom: '3rem' }}>
                <div role="heading" aria-level={2} style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: '900', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                    Welcome Back, {user?.name ? user.name.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) : 'Faculty'}
                </div>
                <p style={{ color: '#666' }}>Here's what's happening with your events today.</p>
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <MetricCard
                    title="ACTIVE EVENTS"
                    value={activeEvents}
                    icon={Calendar}
                    color="#d32f2f"
                    onClick={() => navigate('/faculty/manage-events')}
                />
                <MetricCard
                    title="TOTAL REGISTRATIONS"
                    value={totalRegistrations}
                    icon={Users}
                    color="#00c853"
                    onClick={() => navigate('/faculty/manage-events')}
                />
                <MetricCard
                    title="AVERAGE RATING"
                    value="4.8"
                    icon={Star}
                    color="#ffc107"
                />
            </div>

            {/* Recent Activity / Quick Stats */}
            <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Recent Performance</h3>
                {events.length === 0 ? (
                    <p style={{ color: '#444', fontStyle: 'italic' }}>No event data available yet. Create an event to see analytics.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {events.slice(0, 5).map(event => (
                            <div key={event._id} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#050505', borderRadius: '10px', border: '1px solid #111', gap: '1rem' }}>
                                <div style={{ flex: '1 1 auto', minWidth: '150px' }}>
                                    <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1rem' }}>{event.title}</span>
                                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{event.date}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', color: '#ffc107', marginBottom: '4px' }}>
                                        <Star size={12} fill="#ffc107" />
                                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>-</span>
                                    </div>
                                    <span style={{ display: 'block', fontWeight: '800', color: '#d32f2f' }}>{event.registrations?.length || 0} Regs</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

// eslint-disable-next-line no-unused-vars
const MetricCard = ({ title, value, icon: Icon, color, onClick }) => (
    <div
        onClick={onClick}
        style={{
            backgroundColor: '#0a0a0a',
            border: '1px solid #1a1a1a',
            borderRadius: '16px',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            cursor: onClick ? 'pointer' : 'default',
            transition: 'transform 0.2s, border-color 0.2s'
        }}
        onMouseEnter={(e) => {
            if (onClick) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#333';
            }
        }}
        onMouseLeave={(e) => {
            if (onClick) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#1a1a1a';
            }
        }}
    >
        <div>
            <span style={{ display: 'block', fontSize: '0.65rem', color: '#666', fontWeight: '800', marginBottom: '1rem', letterSpacing: '0.1em' }}>{title}</span>
            <span style={{ fontSize: '2.5rem', fontWeight: '900' }}>{value}</span>
        </div>
        <div style={{ backgroundColor: `${color}10`, padding: '12px', borderRadius: '12px', color: color }}>
            <Icon size={24} />
        </div>
    </div>
);

export default FacultyAnalytics;
