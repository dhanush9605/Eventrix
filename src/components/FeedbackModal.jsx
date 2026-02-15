import React, { useState } from 'react';
import { Star, X, Send, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';

const FeedbackModal = ({ event, onClose }) => {
    const { user } = useAuth();
    const { submitRating } = useEvents();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        setSubmitting(true);
        setError('');

        const feedbackData = {
            eventId: event._id,
            studentId: user.studentId || user.id,
            studentName: user.name,
            rating,
            comment
        };

        const result = await submitRating(feedbackData);
        setSubmitting(false);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => onClose(), 2000);
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1100
        }}>
            <div style={{
                backgroundColor: '#0a0505',
                border: '1px solid #1a1a1a',
                borderRadius: '20px',
                padding: '2.5rem',
                width: '100%',
                maxWidth: '450px',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                animation: 'slideUp 0.3s ease-out'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'none',
                        border: 'none',
                        color: '#444',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#444'}
                >
                    <X size={20} />
                </button>

                {success ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            backgroundColor: '#4caf5020',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: '#4caf50'
                        }}>
                            <Star size={32} fill="#4caf50" />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Thank You!</h2>
                        <p style={{ color: '#888' }}>Your feedback helps us improve future events.</p>
                    </div>
                ) : (
                    <>
                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{ color: '#d32f2f', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Event Feedback</span>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '0.5rem' }}>How was "{event.title}"?</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '4px',
                                            transition: 'transform 0.1s'
                                        }}
                                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                    >
                                        <Star
                                            size={32}
                                            fill={(hover || rating) >= star ? '#ffc107' : 'none'}
                                            color={(hover || rating) >= star ? '#ffc107' : '#222'}
                                            style={{ transition: 'all 0.2s' }}
                                        />
                                    </button>
                                ))}
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>Share your thoughts (optional)</label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="What did you like or what could be better?"
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#111',
                                        border: '1px solid #1a1a1a',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        minHeight: '120px',
                                        resize: 'none',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#333'}
                                    onBlur={(e) => e.target.style.borderColor = '#1a1a1a'}
                                />
                            </div>

                            {error && (
                                <p style={{ color: '#d32f2f', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    fontWeight: 'bold',
                                    fontSize: '0.95rem',
                                    cursor: submitting ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    transition: 'opacity 0.2s'
                                }}
                            >
                                {submitting ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <>
                                        <Send size={18} /> Submit Feedback
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default FeedbackModal;
