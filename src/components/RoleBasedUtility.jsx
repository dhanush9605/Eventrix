import React from 'react';
import { GraduationCap, Briefcase, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const RoleBasedUtility = () => {
    return (
        <section style={{ backgroundColor: '#0a0a0a', textAlign: 'center' }}>
            <div className="container">
                <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>Role-Based Utility</h2>
                <p style={{ color: '#a0a0a0', maxWidth: '700px', margin: '0 auto 5rem', fontSize: '1.1rem' }}>
                    A tailored digital experience designed specifically for every member of the campus hierarchy.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Students */}
                    <div style={{ backgroundColor: '#050505', padding: '4rem 2rem', borderRadius: '4px', position: 'relative', border: '1px solid #111' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#d32f2f15',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2.5rem',
                            color: '#d32f2f'
                        }}>
                            <GraduationCap size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Students</h3>
                        <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                            Access a central hub for all registrations. Get digital entry tickets, set up personalized event calendars, and receive instant campus notifications.
                        </p>
                        <Link to="/register/student" style={{ color: '#d32f2f', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '2rem' }}>Learn More</Link>
                        <div style={{ width: '40px', height: '3px', backgroundColor: '#d32f2f', margin: '0 auto' }}></div>
                    </div>

                    {/* Faculty */}
                    <div style={{ backgroundColor: '#050505', padding: '4rem 2rem', borderRadius: '4px', position: 'relative', border: '1px solid #111' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#d32f2f15',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2.5rem',
                            color: '#d32f2f'
                        }}>
                            <Briefcase size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Faculty</h3>
                        <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                            Seamlessly manage budgets, automate approval workflows for event proposals, and reserve prime venues across campus with a click.
                        </p>
                        <Link to="/register/faculty" style={{ color: '#d32f2f', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '2rem' }}>Learn More</Link>
                        <div style={{ width: '40px', height: '3px', backgroundColor: '#333', margin: '0 auto' }}></div>
                    </div>

                    {/* Admin */}
                    <div style={{ backgroundColor: '#050505', padding: '4rem 2rem', borderRadius: '4px', position: 'relative', border: '1px solid #111' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#d32f2f15',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2.5rem',
                            color: '#d32f2f'
                        }}>
                            <ShieldAlert size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin</h3>
                        <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                            Gain bird's-eye view through real-time analytics. Manage system-wide security, user permissions, and institutional reporting tools.
                        </p>
                        <Link to="/login" style={{ color: '#d32f2f', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '2rem' }}>Learn More</Link>
                        <div style={{ width: '40px', height: '3px', backgroundColor: '#d32f2f', margin: '0 auto' }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RoleBasedUtility;
