import React, { useState } from 'react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Calendar, MapPin, Clock, Filter, Search, X, Check } from 'lucide-react';

const StudentEvents = () => {
    const { events, registerForEvent } = useEvents();
    const { user } = useAuth();
    const [filter, setFilter] = useState('all');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [registering, setRegistering] = useState(false);

    // Filter only active events for students
    const activeEvents = events.filter(e => e.status === 'active');

    const filteredEvents = filter === 'all'
        ? activeEvents
        : activeEvents.filter(e => e.category.toLowerCase() === filter.toLowerCase());

    const handleRegisterClick = (event) => {
        if (event.isPaid) {
            setSelectedEvent(event);
            setShowPaymentModal(true);
        } else {
            handleRegistration(event.id);
        }
    };

    const handleRegistration = (eventId) => {
        setRegistering(true);
        // Simulate network request
        setTimeout(() => {
            const result = registerForEvent(eventId, user);
            setRegistering(false);
            if (result.success) {
                alert("Successfully registered!");
                setShowPaymentModal(false);
            } else {
                alert(result.message);
            }
        }, 1000);
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'live': return '#d32f2f';
            case 'upcoming': return '#2196f3';
            case 'past': return '#666';
            default: return '#666';
        }
    };

    return (
        <DashboardLayout role="student" title="Events Directory">
            {/* Filters and Controls */}
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {['all', 'Technical', 'Workshop', 'Cultural', 'Seminar'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '100px',
                                border: filter === f ? '1px solid #d32f2f' : '1px solid #333',
                                backgroundColor: filter === f ? '#d32f2f15' : '#0a0a0a',
                                color: filter === f ? '#d32f2f' : '#666',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                textTransform: 'capitalize',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.9rem' }}>
                    <Filter size={16} />
                    <span>Sort by: Date</span>
                </div>
            </div>

            {/* Events Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {filteredEvents.map(event => (
                    <div key={event.id} style={{
                        backgroundColor: '#0a0505',
                        border: '1px solid #1a1a1a',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ position: 'relative', height: '160px' }}>
                            {event.bannerImage ? (
                                <img src={event.bannerImage} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>No Image</div>
                            )}

                            <div style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '0.65rem',
                                fontWeight: 'bold',
                                border: event.isPaid ? '1px solid #ffa000' : '1px solid #4caf50',
                                color: event.isPaid ? '#ffa000' : '#4caf50',
                                textTransform: 'uppercase'
                            }}>
                                {event.isPaid ? `PAID: ₹${event.fee}` : 'FREE'}
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                background: 'linear-gradient(to top, #0a0505, transparent)',
                                padding: '20px 1.5rem 10px',
                            }}>
                                <span style={{ fontSize: '0.7rem', color: '#ccc', backgroundColor: '#333', padding: '2px 8px', borderRadius: '4px' }}>{event.category}</span>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: 'auto' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>{event.title}</h3>
                                <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem', lineHeight: '1.5' }}>{event.description}</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                        <Calendar size={16} /> <span>{event.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                        <Clock size={16} /> <span>{event.time}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                        <MapPin size={16} /> <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleRegisterClick(event)}
                                style={{
                                    marginTop: '1.5rem',
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    opacity: 1
                                }}
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedEvent && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: '#111',
                        border: '1px solid #333',
                        borderRadius: '16px',
                        padding: '2rem',
                        width: '400px',
                        maxWidth: '90%',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>Confirm Registration</h3>
                        <p style={{ color: '#888', marginBottom: '1.5rem' }}>
                            You are registering for <span style={{ color: '#fff' }}>{selectedEvent.title}</span>.
                        </p>

                        <div style={{ backgroundColor: '#1a1a1a', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center' }}>
                            <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '8px' }}>Registration Fee</p>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffa000', marginBottom: '1rem' }}>₹{selectedEvent.fee}</h2>

                            {selectedEvent.paymentQr && (
                                <div style={{ margin: '1rem auto', width: '200px', height: '200px', backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
                                    <img src={selectedEvent.paymentQr} alt="Payment QR" style={{ width: '100%', height: '100%' }} />
                                </div>
                            )}

                            {selectedEvent.upiId && (
                                <div style={{ marginTop: '1rem', padding: '8px', backgroundColor: '#333', borderRadius: '6px' }}>
                                    <p style={{ fontSize: '0.8rem', color: '#ccc' }}>UPI ID: <span style={{ color: '#fff', fontWeight: 'bold' }}>{selectedEvent.upiId}</span></p>
                                </div>
                            )}

                            <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '1rem' }}>
                                Scan the QR code or use the UPI ID to complete the payment.
                            </p>
                        </div>

                        <button
                            onClick={() => handleRegistration(selectedEvent.id)}
                            disabled={registering}
                            style={{
                                width: '100%',
                                padding: '14px',
                                backgroundColor: '#d32f2f',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: registering ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                opacity: registering ? 0.7 : 1
                            }}
                        >
                            {registering ? 'Processing...' : 'I Have Paid & Register'}
                        </button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default StudentEvents;
