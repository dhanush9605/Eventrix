import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid #1a1a1a'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '80px'
            }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
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

                {/* Links */}
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <a href="#events" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Events</a>
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Schedule</Link>
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em' }}>About</Link>

                    <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
                        {user ? (
                            <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none' }}>Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none' }}>Login</Link>
                                <Link to="/register/student" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', textDecoration: 'none' }}>Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
