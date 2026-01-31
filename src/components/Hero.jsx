import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section style={{
            paddingTop: '160px',
            paddingBottom: '80px',
            textAlign: 'center',
            background: 'radial-gradient(circle at center, #1a0505 0%, #000000 70%)'
        }}>
            <div className="container animate-fade-in">
                {/* Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    border: '1px solid rgba(211, 47, 47, 0.3)',
                    padding: '6px 16px',
                    borderRadius: '100px',
                    marginBottom: '2.5rem'
                }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#d32f2f',
                        borderRadius: '50%',
                        boxShadow: '0 0 8px #d32f2f'
                    }}></span>
                    <span style={{
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        color: '#d32f2f',
                        letterSpacing: '0.1em'
                    }}>New: Live for Fall 2024</span>
                </div>

                {/* Heading */}
                <h1 style={{
                    fontSize: 'clamp(4rem, 10vw, 8rem)',
                    lineHeight: '0.9',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.04em'
                }}>
                    EVENTRI<span style={{ color: '#d32f2f' }}>X</span>
                </h1>

                {/* Subtext */}
                <p style={{
                    fontSize: '1.25rem',
                    color: '#e0e0e0',
                    maxWidth: '600px',
                    margin: '0 auto 3rem',
                    fontWeight: '400'
                }}>
                    The premium, high-performance ecosystem for <i style={{ fontWeight: '600' }}>college event management</i>.
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <a href="#events" className="btn btn-primary" style={{ padding: '1rem 2.5rem', textDecoration: 'none' }}>Explore Events</a>
                    <Link to="/login" className="btn btn-outline-gray" style={{ padding: '1rem 2.5rem', textDecoration: 'none' }}>View Demo</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
