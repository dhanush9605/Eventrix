import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <nav className="glass-nav" style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '80px'
                }}>
                    {/* Logo */}
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit', zIndex: 1001 }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#d32f2f',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                            </svg>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                            EVENTRI<span style={{ color: '#d32f2f' }}>X</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hide-mobile" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                        <a href="#events" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.2s' }}>Events</a>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.2s' }}>Schedule</Link>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'color 0.2s' }}>About</Link>

                        <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem', alignItems: 'center' }}>
                            {user ? (
                                <>
                                    <Link
                                        to={user.role === 'admin' ? '/admin/overview' : user.role === 'faculty' ? '/faculty/analytics' : '/student/dashboard'}
                                        className="btn btn-primary"
                                        style={{ padding: '0.6rem 1.5rem', textDecoration: 'none', fontSize: '0.8rem' }}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={logout}
                                        style={{
                                            background: 'none',
                                            border: '1px solid #333',
                                            color: '#aaa',
                                            padding: '0.6rem 1.2rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseOver={(e) => { e.target.style.borderColor = '#d32f2f'; e.target.style.color = 'white'; }}
                                        onMouseOut={(e) => { e.target.style.borderColor = '#333'; e.target.style.color = '#aaa'; }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none', fontSize: '0.8rem' }}>Login</Link>
                                    <Link to="/register/student" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none', fontSize: '0.8rem' }}>Register</Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Hamburger Menu Button */}
                    <button
                        className="show-mobile"
                        onClick={toggleMobileMenu}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            zIndex: 1001,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="animate-fade-in"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        gap: '2rem'
                    }}
                >
                    {/* Mobile Navigation Links */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <a
                            href="#events"
                            onClick={toggleMobileMenu}
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                padding: '1rem',
                                minHeight: '48px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            Events
                        </a>
                        <Link
                            to="/login"
                            onClick={toggleMobileMenu}
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                padding: '1rem',
                                minHeight: '48px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            Schedule
                        </Link>
                        <Link
                            to="/login"
                            onClick={toggleMobileMenu}
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                padding: '1rem',
                                minHeight: '48px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            About
                        </Link>

                        {/* Mobile Auth Buttons */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            width: '100%',
                            maxWidth: '320px',
                            marginTop: '2rem'
                        }}>
                            {user ? (
                                <>
                                    <Link
                                        to={user.role === 'admin' ? '/admin/overview' : user.role === 'faculty' ? '/faculty/analytics' : '/student/dashboard'}
                                        className="btn btn-primary"
                                        onClick={toggleMobileMenu}
                                        style={{ width: '100%', textDecoration: 'none' }}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => { logout(); toggleMobileMenu(); }}
                                        className="btn btn-outline-gray"
                                        style={{ width: '100%' }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="btn btn-primary"
                                        onClick={toggleMobileMenu}
                                        style={{ width: '100%', textDecoration: 'none' }}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register/student"
                                        className="btn btn-secondary"
                                        onClick={toggleMobileMenu}
                                        style={{ width: '100%', textDecoration: 'none' }}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;

