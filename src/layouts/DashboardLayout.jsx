import React from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, Search } from 'lucide-react';

const DashboardLayout = ({ children, role, title, showTopBar = true }) => {
    return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
            <Sidebar role={role} />

            <main style={{ marginLeft: '280px', padding: '2rem 3rem' }}>
                {showTopBar && (
                    <header style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '3rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{title}</h1>
                            {role === 'faculty' && <span style={{ backgroundColor: '#d32f2f15', color: '#d32f2f', padding: '4px 12px', borderRadius: '100px', fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase' }}>● Live View</span>}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                            {/* Search Bar */}
                            <div style={{ position: 'relative' }}>
                                <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} size={16} />
                                <input
                                    type="text"
                                    placeholder={role === 'admin' ? "Search by name, email, or student ID..." : "Search analytics..."}
                                    style={{
                                        backgroundColor: '#0a0a0a',
                                        border: '1px solid #1a1a1a',
                                        borderRadius: '8px',
                                        padding: '10px 1rem 10px 2.5rem',
                                        color: '#fff',
                                        width: role === 'admin' ? '380px' : '280px',
                                        fontSize: '0.85rem'
                                    }}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ position: 'relative', cursor: 'pointer' }}>
                                    <Bell size={20} color="#666" />
                                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: '#d32f2f', borderRadius: '50%', border: '2px solid #000' }}></span>
                                </div>

                                {role === 'faculty' && (
                                    <button className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>
                                        EXPORT DATA
                                    </button>
                                )}

                                {role === 'student' && (
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#666', letterSpacing: '0.05em' }}>COMPUTER SCIENCE - READ ONLY</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </header>
                )}

                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
