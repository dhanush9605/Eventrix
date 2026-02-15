import React from 'react';
import { Link } from 'react-router-dom';

const events = [
    {
        title: "Annual Tech Fest 2026",
        location: "MAIN AUDITORIUM",
        date: "OCT 28",
        category: "TECHNICAL",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
        registrations: "400+ REGISTERED"
    },
    {
        title: "Entrepreneurship Summit",
        location: "BUSINESS BLOCK",
        date: "NOV 12",
        category: "SUMMIT",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
        registrations: "LIMITED SEATS"
    },
    {
        title: "Cultural Night Gala",
        location: "OPEN AIR THEATER",
        date: "DEC 05",
        category: "CULTURAL",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
        registrations: "FREE ENTRY"
    }
];

const FeaturedEvents = () => {
    return (
        <section id="events" style={{ backgroundColor: '#000000' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginBottom: '3rem',
                    borderLeft: '4px solid #d32f2f',
                    paddingLeft: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div>
                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Featured Events</h2>
                        <p style={{ color: '#a0a0a0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Experience the best of campus life</p>
                    </div>
                    <Link to="/login" style={{
                        color: '#d32f2f',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'gap 0.2s ease'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.gap = '12px'}
                        onMouseOut={(e) => e.currentTarget.style.gap = '8px'}
                    >
                        View All <span>→</span>
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                    gap: '2rem'
                }}>
                    {events.map((event, index) => (
                        <div key={index} style={{
                            backgroundColor: '#121212',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid #222',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.borderColor = '#333';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(211, 47, 47, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = '#222';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{ position: 'relative', height: '220px' }}>
                                <img src={event.image} alt={event.title} style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: '0.7',
                                    transition: 'opacity 0.3s ease'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '1rem',
                                    left: '1rem',
                                    display: 'flex',
                                    gap: '0.5rem'
                                }}>
                                    <span style={{
                                        backgroundColor: '#d32f2f',
                                        color: 'white',
                                        padding: '4px 10px',
                                        fontSize: '0.65rem',
                                        fontWeight: '800',
                                        borderRadius: '2px',
                                        textTransform: 'uppercase'
                                    }}>{event.category}</span>
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    color: '#d32f2f',
                                    fontWeight: '800',
                                    fontSize: '0.75rem',
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    padding: '4px 8px',
                                    borderRadius: '4px'
                                }}>{event.date}</div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{event.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a0a0a0', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    {event.location}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #000', paddingTop: '1rem' }}>
                                    <span style={{ fontSize: '0.7rem', color: '#666', fontWeight: '700' }}>{event.registrations}</span>
                                    <Link to="/login" style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        transition: 'color 0.2s'
                                    }}
                                        onMouseOver={(e) => e.currentTarget.style.color = '#d32f2f'}
                                        onMouseOut={(e) => e.currentTarget.style.color = 'white'}
                                    >Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedEvents;

