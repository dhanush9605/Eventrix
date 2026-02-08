import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Users, Calendar, Building, TrendingUp, Activity, Bell, X, ChevronRight, ChevronLeft, MapPin, Clock, HelpCircle } from 'lucide-react';
import { getAdminStats, getAdminStatDetails } from '../../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const AdminOverview = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeEvents: 0,
        departments: 0,
        engagement: 0
    });
    const [chartData, setChartData] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [modalView, setModalView] = useState(null); // 'users', 'departments', 'events', 'event_details', 'engagement'
    const [modalData, setModalData] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    // For drill-down
    const [historyStack, setHistoryStack] = useState([]); // For navigation back

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await getAdminStats();
                setStats(data.stats);
                setChartData(data.chartData);
                setRecentActivity(data.recentActivity);
            } catch (error) {
                console.error('Failed to fetch admin stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const fetchDetails = async (type, id = null) => {
        setModalLoading(true);
        try {
            const { data } = await getAdminStatDetails(type, id);
            setModalData(data);
        } catch (error) {
            console.error('Failed to fetch details:', error);
        } finally {
            setModalLoading(false);
        }
    };

    const handleStatClick = (type) => {
        setModalView(type);
        setModalOpen(true);
        setHistoryStack([]);
        fetchDetails(type);
    };

    const handleEventClick = (eventId) => {
        setHistoryStack([...historyStack, { view: modalView, data: modalData }]);
        setModalView('event_details');
        fetchDetails('event_details', eventId);
    };

    const handleBack = () => {
        const last = historyStack.pop();
        if (last) {
            setModalView(last.view);
            setModalData(last.data);
            setHistoryStack([...historyStack]);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalView(null);
        setModalData(null);
        setHistoryStack([]);
    };

    const statCards = [
        {
            label: 'TOTAL USERS',
            value: stats.totalUsers,
            change: 'Total Registered',
            icon: Users,
            color: '#d32f2f',
            bg: '#d32f2f15',
            type: 'users',
            clickable: true
        },
        {
            label: 'ACTIVE EVENTS',
            value: stats.activeEvents,
            change: 'Upcoming & Ongoing',
            icon: Calendar,
            color: '#fff',
            bg: '#ffffff10',
            type: 'events',
            clickable: true
        },
        {
            label: 'DEPARTMENTS',
            value: stats.departments,
            change: ' across campus',
            icon: Building,
            color: '#fff',
            bg: '#ffffff10',
            type: 'departments',
            clickable: true
        },
        {
            label: 'ENGAGEMENT',
            value: `${stats.engagement}%`,
            change: 'Student Participation',
            icon: TrendingUp,
            color: '#00c853',
            bg: '#00c85315',
            type: 'engagement',
            clickable: true
        }
    ];

    const getModalTitle = () => {
        switch (modalView) {
            case 'users': return 'All Registered Users';
            case 'departments': return 'Department Breakdown';
            case 'events': return 'Active & Upcoming Events';
            case 'event_details': return 'Event Details';
            case 'engagement': return 'Engagement Statistics';
            default: return 'Details';
        }
    };

    if (loading) {
        return (
            <DashboardLayout role="admin" title="System Overview">
                <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>Loading dashboard data...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="admin" title="System Overview">
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                {statCards.map((s, i) => (
                    <div
                        key={i}
                        onClick={() => s.clickable && handleStatClick(s.type)}
                        style={{
                            backgroundColor: '#0a0a0a',
                            border: '1px solid #1a1a1a',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            transition: 'transform 0.2s, border-color 0.2s',
                            cursor: s.clickable ? 'pointer' : 'default',
                            ':hover': s.clickable ? { borderColor: s.color } : {}
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <s.icon size={20} />
                            </div>
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
                {/* Main Chart Area */}
                <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2rem', height: '400px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Registrations Over Time</h3>
                        <Activity size={20} color="#666" />
                    </div>
                    <div style={{ flex: 1, width: '100%', height: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#666" tick={{ fill: '#666' }} />
                                <YAxis stroke="#666" tick={{ fill: '#666' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="registrations" stroke="#d32f2f" strokeWidth={2} dot={{ r: 4, fill: '#d32f2f' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2rem', overflowY: 'auto', maxHeight: '400px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                        <Bell size={18} color="#d32f2f" />
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Recent Activity</h3>
                    </div>
                    {recentActivity.length === 0 ? (
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>No recent activity.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {recentActivity.map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: i === 0 ? '#d32f2f' : '#333', marginTop: '6px' }}></div>
                                    <div>
                                        <p style={{ fontSize: '0.85rem', color: '#ddd', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: 'bold' }}>{item.user}</span> {item.action} <span style={{ color: '#d32f2f' }}>{item.target}</span>
                                        </p>
                                        <span style={{ fontSize: '0.7rem', color: '#666' }}>{new Date(item.time).toLocaleDateString()} {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            {modalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        backgroundColor: '#111',
                        border: '1px solid #333',
                        borderRadius: '16px',
                        width: '700px',
                        maxWidth: '95%',
                        height: '70vh',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {historyStack.length > 0 && (
                                    <button onClick={handleBack} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                        <ChevronLeft size={20} />
                                    </button>
                                )}
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                    {getModalTitle()}
                                </h3>
                            </div>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ padding: '0', overflowY: 'auto', flex: 1 }}>
                            {modalLoading ? (
                                <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>Loading data...</div>
                            ) : (
                                <>
                                    {/* USERS VIEW */}
                                    {modalView === 'users' && (
                                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                            <thead style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #222' }}>
                                                <tr style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                                                    <th style={{ padding: '1rem 1.5rem' }}>Name</th>
                                                    <th style={{ padding: '1rem' }}>Role</th>
                                                    <th style={{ padding: '1rem' }}>Department</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {modalData && modalData.map((user, i) => (
                                                    <tr key={i} style={{ borderBottom: '1px solid #1a1a1a', color: '#ddd', fontSize: '0.85rem' }}>
                                                        <td style={{ padding: '1rem 1.5rem' }}>
                                                            <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                                                            <div style={{ fontSize: '0.7rem', color: '#666' }}>{user.email}</div>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#222', color: '#ccc' }}>
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '1rem', color: '#888' }}>{user.department || '-'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}

                                    {/* DEPARTMENTS VIEW */}
                                    {modalView === 'departments' && (
                                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                            <thead style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #222' }}>
                                                <tr style={{ color: '#666', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                                                    <th style={{ padding: '1rem 1.5rem' }}>Department Name</th>
                                                    <th style={{ padding: '1rem' }}>Total Users</th>
                                                    <th style={{ padding: '1rem' }}>Students</th>
                                                    <th style={{ padding: '1rem' }}>Faculty</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {modalData && modalData.map((dept, i) => (
                                                    <tr key={i} style={{ borderBottom: '1px solid #1a1a1a', color: '#ddd', fontSize: '0.85rem' }}>
                                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold' }}>{dept.name}</td>
                                                        <td style={{ padding: '1rem' }}>{dept.total}</td>
                                                        <td style={{ padding: '1rem', color: '#666' }}>{dept.students}</td>
                                                        <td style={{ padding: '1rem', color: '#666' }}>{dept.faculty}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}

                                    {/* EVENTS VIEW */}
                                    {modalView === 'events' && (
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {modalData && modalData.length === 0 ? (
                                                <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No active events found.</div>
                                            ) : (
                                                modalData && modalData.map((event, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={() => handleEventClick(event.id)}
                                                        style={{
                                                            padding: '1.5rem',
                                                            borderBottom: '1px solid #1a1a1a',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            transition: 'background-color 0.2s',
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#161616'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        <div>
                                                            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>{event.title}</div>
                                                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#888' }}>
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {new Date(event.date).toLocaleDateString()}</span>
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {event.location}</span>
                                                            </div>
                                                        </div>
                                                        <div style={{ textAlign: 'right' }}>
                                                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#d32f2f' }}>{event.registeredCount}</span>
                                                            <div style={{ fontSize: '0.7rem', color: '#555' }}>REGISTERED</div>
                                                            <div style={{
                                                                marginTop: '4px',
                                                                fontSize: '0.65rem',
                                                                fontWeight: 'bold',
                                                                padding: '2px 8px',
                                                                borderRadius: '4px',
                                                                backgroundColor: event.status === 'Upcoming' ? '#00c85320' : '#8882',
                                                                color: event.status === 'Upcoming' ? '#00c853' : '#888',
                                                                display: 'inline-block'
                                                            }}>
                                                                {event.status}
                                                            </div>
                                                        </div>
                                                        <ChevronRight size={18} color="#444" />
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}

                                    {/* EVENT DETAILS VIEW */}
                                    {modalView === 'event_details' && modalData && (
                                        <div style={{ padding: '1.5rem' }}>
                                            <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #222' }}>
                                                <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>{modalData.title}</h4>
                                                <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', color: '#aaa', fontSize: '0.9rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {new Date(modalData.date).toLocaleDateString()}</div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {modalData.location}</div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {modalData.status}</div>
                                                </div>
                                                <p style={{ marginTop: '1rem', color: '#666', lineHeight: '1.5' }}>{modalData.description || 'No description provided.'}</p>
                                            </div>

                                            <h5 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ddd' }}>Registered Students ({modalData.registrations.length})</h5>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                                <thead style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #222', fontSize: '0.75rem', textTransform: 'uppercase', color: '#666' }}>
                                                    <tr>
                                                        <th style={{ padding: '10px' }}>Student Name</th>
                                                        <th style={{ padding: '10px' }}>Dept</th>
                                                        <th style={{ padding: '10px' }}>Year</th>
                                                        <th style={{ padding: '10px' }}>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {modalData.registrations.map((reg, i) => (
                                                        <tr key={i} style={{ borderBottom: '1px solid #1a1a1a', fontSize: '0.85rem', color: '#ccc' }}>
                                                            <td style={{ padding: '10px' }}>{reg.studentName}</td>
                                                            <td style={{ padding: '10px', color: '#888' }}>{reg.department}</td>
                                                            <td style={{ padding: '10px', color: '#888' }}>{reg.year}</td>
                                                            <td style={{ padding: '10px' }}>{reg.status}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {/* ENGAGEMENT VIEW */}
                                    {modalView === 'engagement' && (
                                        <div style={{ padding: '1.5rem' }}>
                                            <div style={{ marginBottom: '2rem' }}>
                                                <h4 style={{ color: '#fff', marginBottom: '1rem' }}>Participation Rate by Department</h4>
                                                <div style={{ height: '300px', width: '100%' }}>
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart data={modalData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                            <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                                                            <XAxis type="number" stroke="#666" domain={[0, 100]} />
                                                            <YAxis dataKey="name" type="category" width={120} stroke="#888" interval={0} />
                                                            <Tooltip
                                                                cursor={{ fill: '#ffffff10' }}
                                                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                                            />
                                                            <Bar dataKey="rate" name="Participation %" fill="#00c853" radius={[0, 4, 4, 0]} barSize={20} />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                            <div>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                                    <thead style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #222', fontSize: '0.75rem', textTransform: 'uppercase', color: '#666' }}>
                                                        <tr>
                                                            <th style={{ padding: '10px' }}>Department</th>
                                                            <th style={{ padding: '10px' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'help' }} title="Total number of students registered in this department">
                                                                    Total Students <HelpCircle size={12} />
                                                                </div>
                                                            </th>
                                                            <th style={{ padding: '10px' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'help' }} title="Students who have registered for at least one event">
                                                                    Active Participants <HelpCircle size={12} />
                                                                </div>
                                                            </th>
                                                            <th style={{ padding: '10px' }}>Rate</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {modalData && modalData.map((dept, i) => (
                                                            <tr key={i} style={{ borderBottom: '1px solid #1a1a1a', fontSize: '0.85rem', color: '#ccc' }}>
                                                                <td style={{ padding: '10px', fontWeight: 'bold' }}>{dept.name}</td>
                                                                <td style={{ padding: '10px', color: '#888' }}>{dept.totalStudents}</td>
                                                                <td style={{ padding: '10px', color: '#888' }}>{dept.activeStudents}</td>
                                                                <td style={{ padding: '10px', color: '#00c853', fontWeight: 'bold' }}>{dept.rate}%</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default AdminOverview;
