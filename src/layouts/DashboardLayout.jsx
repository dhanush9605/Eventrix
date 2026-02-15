import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, Search, Menu, X } from 'lucide-react';

const DashboardLayout = ({ children, role, title, showTopBar = true }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
            {/* Backdrop */}
            {sidebarOpen && (
                <div
                    onClick={closeSidebar}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 999,
                        display: 'none'
                    }}
                    className="mobile-backdrop"
                />
            )}

            {/* Sidebar Container */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '280px',
                    height: '100vh',
                    transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease',
                    zIndex: 1000
                }}
                className="sidebar-container"
            >
                <Sidebar role={role} />
            </div>

            <main
                style={{
                    marginLeft: '0',
                    padding: '2rem 1rem',
                    minHeight: '100vh'
                }}
                className="main-content"
            >
                {showTopBar && (
                    <header style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '3rem',
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button
                                onClick={toggleSidebar}
                                style={{
                                    background: '#111',
                                    border: '1px solid #333',
                                    color: 'white',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    minHeight: '44px',
                                    minWidth: '44px'
                                }}
                                className="hamburger-btn"
                                aria-label="Toggle menu"
                            >
                                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                            <h1 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700' }}>{title}</h1>
                            {role === 'faculty' && <span className="hide-mobile" style={{ backgroundColor: '#d32f2f15', color: '#d32f2f', padding: '4px 12px', borderRadius: '100px', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase' }}>● Live View</span>}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', flex: '1', justifyContent: 'flex-end' }}>
                            {/* Search Bar - Hidden on small mobile */}
                            <div className="hide-mobile" style={{ position: 'relative', flex: '0 1 auto' }}>
                                <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} size={16} />
                                <input
                                    type="text"
                                    placeholder={role === 'admin' ? "Search..." : "Search analytics..."}
                                    style={{
                                        backgroundColor: '#0a0a0a',
                                        border: '1px solid #1a1a1a',
                                        borderRadius: '8px',
                                        padding: '10px 1rem 10px 2.5rem',
                                        color: '#fff',
                                        width: role === 'admin' ? 'min(380px, 30vw)' : 'min(280px, 25vw)',
                                        fontSize: '0.85rem'
                                    }}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ position: 'relative', cursor: 'pointer' }}>
                                    <Bell size={20} color="#666" />
                                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: '#d32f2f', borderRadius: '50%', border: '2px solid #000' }}></span>
                                </div>

                                {role === 'faculty' && (
                                    <button className="btn btn-primary hide-mobile" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>
                                        EXPORT DATA
                                    </button>
                                )}

                                {role === 'student' && (
                                    <div className="hide-mobile" style={{ textAlign: 'right' }}>
                                        <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#666', letterSpacing: '0.05em' }}>COMPUTER SCIENCE - READ ONLY</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>
                )}

                {children}
            </main>

            <style>{`
                /* Desktop: Show sidebar permanently, hide hamburger */
                @media (min-width: 769px) {
                    .sidebar-container {
                        transform: translateX(0) !important;
                    }
                    
                    .main-content {
                        margin-left: 280px !important;
                        padding: 2rem 3rem !important;
                    }
                    
                    .hamburger-btn {
                        display: none !important;
                    }
                }
                
                /* Mobile: Show hamburger, sidebar slides in/out */
                @media (max-width: 768px) {
                    .mobile-backdrop {
                        display: block !important;
                    }
                    
                    .hamburger-btn {
                        display: flex !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default DashboardLayout;
