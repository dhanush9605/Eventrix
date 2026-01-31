import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Calendar,
    FileCheck,
    Award,
    BarChart3,
    Users,
    Settings,
    HelpCircle,
    LogOut,
    Bell
} from 'lucide-react';

const Sidebar = ({ role }) => {
    const { user, logout } = useAuth();
    const menuItems = {
        student: [
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
            { id: 'events', label: 'Events', icon: Calendar, path: '/student/events' },
            { id: 'registrations', label: 'My Registrations', icon: FileCheck, path: '/student/registrations' },
            { id: 'certificates', label: 'Certificates', icon: Award, path: '/student/certificates' },
        ],
        faculty: [
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/faculty/analytics' },
            { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/faculty/analytics' },
            { id: 'approvals', label: 'Approvals', icon: FileCheck, path: '/faculty/approvals' },
            { id: 'events', label: 'Events', icon: Calendar, path: '#' },
            { id: 'attendees', label: 'Attendees', icon: Users, path: '#' },
        ],
        admin: [
            { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '#' },
            { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
            { id: 'departments', label: 'Departments', icon: LayoutDashboard, path: '#' },
            { id: 'events', label: 'Events', icon: Calendar, path: '#' },
            { id: 'reports', label: 'Reports', icon: BarChart3, path: '#' },
        ]
    };

    const currentMenu = menuItems[role] || [];

    return (
        <aside style={{
            width: '280px',
            backgroundColor: '#0a0a0a',
            height: '100vh',
            borderRight: '1px solid #1a1a1a',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0
        }}>
            {/* Sidebar Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '3rem' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: '#d32f2f', borderRadius: '4px' }}></div>
                <div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'block', lineHeight: 1 }}>Eventri<span style={{ color: '#d32f2f' }}>X</span></span>
                    <span style={{ fontSize: '0.6rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {role.toUpperCase()} PORTAL
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {currentMenu.map((item) => (
                        <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                            <NavLink
                                to={item.path}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 1rem',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    color: isActive ? '#fff' : '#666',
                                    backgroundColor: isActive ? '#d32f2f15' : 'transparent',
                                    borderRight: isActive ? '3px solid #d32f2f' : 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: isActive ? '600' : '400',
                                    transition: 'all 0.2s'
                                })}
                            >
                                <item.icon size={20} color={window.location.pathname === item.path ? '#d32f2f' : 'currentColor'} />
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Support Section */}
                <div style={{ marginTop: '2.5rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '1rem' }}>Support</span>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <NavLink
                                to="/settings"
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 1rem',
                                    textDecoration: 'none',
                                    color: isActive ? '#fff' : '#666',
                                    fontSize: '0.9rem',
                                    fontWeight: isActive ? '600' : '400',
                                })}
                            >
                                <Settings size={20} /> Settings
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/help-center"
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 1rem',
                                    textDecoration: 'none',
                                    color: isActive ? '#fff' : '#666',
                                    fontSize: '0.9rem',
                                    fontWeight: isActive ? '600' : '400',
                                })}
                            >
                                <HelpCircle size={20} /> Help Center
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* User Profile */}
            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #1a1a1a' }}>
                {role === 'admin' ? (
                    <button
                        onClick={logout}
                        style={{ width: '100%', backgroundColor: '#111', border: '1px solid #222', color: '#888', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#222' }}>
                            <img src={`https://i.pravatar.cc/150?u=${role}`} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>
                                {user?.name || (role === 'student' ? 'Alex Johnson' : 'Dr. Aris Thorne')}
                            </span>
                            <span style={{ display: 'block', fontSize: '0.7rem', color: '#666' }}>
                                {role.charAt(0).toUpperCase() + role.slice(1)} Portal
                            </span>
                        </div>
                        <button
                            onClick={logout}
                            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', padding: '4px' }}
                            title="Sign Out"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
