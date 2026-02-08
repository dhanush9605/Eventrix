    import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
    return (
        <section style={{ backgroundColor: '#000000' }}>
            <div className="container">
                <div style={{
                    backgroundColor: '#120505',
                    border: '1px solid #d32f2f30',
                    borderRadius: '12px',
                    padding: '6rem 2rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Subtle Glow */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle, rgba(211, 47, 47, 0.05) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }}></div>

                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        lineHeight: '1.1',
                        marginBottom: '3rem',
                        textTransform: 'uppercase',
                        fontWeight: '900'
                    }}>
                        Ready to elevate your campus culture?
                    </h2>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                        <Link to="/register/student" className="btn btn-primary" style={{ padding: '1rem 3rem', textDecoration: 'none' }}>Get Started Now</Link>
                        <Link to="/login" className="btn btn-outline-gray" style={{ padding: '1rem 3rem', textDecoration: 'none' }}>Log In</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
