import React from 'react';
import { Wrench, Clock, Mail } from 'lucide-react';

const Maintenance = () => {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decor */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '600px',
                height: '600px',
                border: '1px dashed #d32f2f30',
                borderRadius: '50%',
                zIndex: 0
            }}></div>

            <div style={{ zIndex: 1 }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#d32f2f15',
                    color: '#d32f2f',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem',
                    boxShadow: '0 10px 30px rgba(211, 47, 47, 0.2)'
                }}>
                    <Wrench size={40} className="wrench-animation" />
                </div>

                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                    System Maintenance
                </h1>

                <p style={{ fontSize: '1.1rem', color: '#888', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
                    EventriX is currently undergoing scheduled maintenance to improve your experience.
                    We'll be back online shortly!
                </p>

                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    marginBottom: '3rem'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <Clock size={20} color="#d32f2f" style={{ marginBottom: '8px' }} />
                        <p style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Estimated Time</p>
                        <p style={{ fontWeight: 'bold' }}>~ 2 Hours</p>
                    </div>
                    <div style={{ width: '1px', backgroundColor: '#222' }}></div>
                    <div style={{ textAlign: 'center' }}>
                        <Mail size={20} color="#d32f2f" style={{ marginBottom: '8px' }} />
                        <p style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Support</p>
                        <p style={{ fontWeight: 'bold' }}>eventrixhq@gmail.com</p>
                    </div>
                </div>

                <button
                    onClick={() => window.location.reload()}
                    style={{
                        padding: '12px 32px',
                        backgroundColor: '#d32f2f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    Check Status
                </button>
            </div>

            <style>{`
                @keyframes wrench-pop {
                    0% { transform: rotate(0deg); }
                    25% { transform: rotate(-20deg); }
                    75% { transform: rotate(20deg); }
                    100% { transform: rotate(0deg); }
                }
                .wrench-animation {
                    animation: wrench-pop 2s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default Maintenance;
