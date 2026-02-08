import React from 'react';
import { NavLink, Link } from 'react-router-dom';
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
    Bell,
    Plus,
    Camera
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
            { id: 'create-event', label: 'Create Event', icon: Plus, path: '/faculty/create-event' },
            { id: 'manage-events', label: 'Manage Events', icon: Calendar, path: '/faculty/manage-events' },
            { id: 'scanner', label: 'Attendance Scanner', icon: Camera, path: '/faculty/scanner' },
            { id: 'approvals', label: 'Approvals', icon: FileCheck, path: '/faculty/approvals' },
        ],
        admin: [
            { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/admin/overview' },
            { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
            { id: 'departments', label: 'Departments', icon: LayoutDashboard, path: '/admin/departments' },
            { id: 'events', label: 'Events', icon: Calendar, path: '/admin/events' },
            { id: 'reports', label: 'Reports', icon: BarChart3, path: '/admin/reports' },
        ]
    };

    const currentMenu = menuItems[role] || [];

    return (
        <aside style={{
            width: '280px',
            backgroundColor: '#050505',
            height: '100vh',
            borderRight: '1px solid #111',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0
        }}>
            {/* Sidebar Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '3rem', paddingLeft: '0.5rem' }}>
                <div style={{ width: '38px', height: '38px', backgroundColor: '#d32f2f', borderRadius: '8px', boxShadow: '0 0 15px rgba(211, 47, 47, 0.4)' }}></div>
                <div>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', display: 'block', lineHeight: 1, letterSpacing: '-0.5px' }}>Eventri<span style={{ color: '#d32f2f' }}>X</span></span>
                    <span style={{ fontSize: '0.65rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: '600', display: 'block', marginTop: '4px' }}>
                        {role.toUpperCase()} PORTAL
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {currentMenu.map((item) => (
                        <li key={item.id}>
                            <NavLink
                                to={item.path}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '16px 1.5rem',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    color: isActive ? '#fff' : '#888',
                                    backgroundColor: isActive ? '#0f0505' : 'transparent',
                                    border: isActive ? '1px solid #d32f2f' : '1px solid transparent',
                                    fontSize: '0.95rem',
                                    fontWeight: isActive ? '700' : '500',
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                    boxShadow: isActive ? 'inset 4px 0 0 #d32f2f' : 'none', // Left accent
                                })}
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} color={isActive ? '#fff' : 'currentColor'} />
                                        {item.label}
                                        {isActive && (
                                            <div style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '3px',
                                                height: '60%',
                                                backgroundColor: '#d32f2f',
                                                borderRadius: '4px 0 0 4px',
                                                boxShadow: '0 0 10px #d32f2f'
                                            }}></div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Support Section */}
                <div style={{ marginTop: '2.5rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: '1rem', display: 'block', marginBottom: '0.75rem' }}>Support</span>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {/* The 'Help Center' NavLink was not found in the original document, so no changes were made here. */}
                        {/* If you intended to remove the 'Settings' NavLink, please specify. */}
                        <li>
                            <NavLink
                                to="/settings"
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '16px 1.5rem',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    color: isActive ? '#fff' : '#888',
                                    backgroundColor: isActive ? '#0f0505' : 'transparent',
                                    border: isActive ? '1px solid #d32f2f' : '1px solid transparent',
                                    fontSize: '0.95rem',
                                    fontWeight: isActive ? '700' : '500',
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                    boxShadow: isActive ? 'inset 4px 0 0 #d32f2f' : 'none',
                                })}
                            >
                                {({ isActive }) => (
                                    <>
                                        <Settings size={22} strokeWidth={isActive ? 2.5 : 2} color={isActive ? '#fff' : 'currentColor'} />
                                        Settings
                                        {isActive && (
                                            <div style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '3px',
                                                height: '60%',
                                                backgroundColor: '#d32f2f',
                                                borderRadius: '4px 0 0 4px',
                                                boxShadow: '0 0 10px #d32f2f'
                                            }}></div>
                                        )}
                                    </>
                                )}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Link
                            to={role === 'student' ? '/student/profile' : '#'}
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                textDecoration: 'none',
                                padding: '8px',
                                borderRadius: '12px',
                                transition: 'all 0.2s',
                                cursor: role === 'student' ? 'pointer' : 'default'
                            }}
                            className="profile-link"
                        >
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#222', border: '1px solid #333' }}>
                                {user?.picture ? (
                                    <img src={user.picture} alt="User" referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2a2a2a', color: '#888' }}>
                                        <Users size={20} />
                                    </div>
                                )}
                            </div>
                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {user?.name || 'User'}
                                </span>
                                <span style={{ display: 'block', fontSize: '0.7rem', color: '#666' }}>
                                    {role.charAt(0).toUpperCase() + role.slice(1)} Portal
                                </span>
                            </div>
                        </Link>
                        <button
                            onClick={logout}
                            style={{
                                background: 'transparent',
                                border: '1px solid #333',
                                color: '#666',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                                minWidth: '36px'
                            }}
                            title="Sign Out"
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#d32f2f'; e.currentTarget.style.color = '#d32f2f'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#666'; }}
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .profile-link:hover {
                    background-color: #111;
                    transform: translateY(-2px);
                }
                .profile-link:hover img {
                    transform: scale(1.1);
                    transition: transform 0.3s ease;
                }
            `}</style>
        </aside>
    );
};

export default Sidebar;
