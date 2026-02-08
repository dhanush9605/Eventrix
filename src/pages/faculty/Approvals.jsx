import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { ClipboardCheck, CheckCircle2, Clock, Calendar, MapPin, User } from 'lucide-react';

const FacultyApprovals = () => {
    // Dummy requests for now, will link to EventContext later
    const requests = [
        {
            id: 1,
            user: 'Marcus Chen',
            event: 'Generative AI Workshop 2026',
            date: 'Oct 24, 2024',
            category: 'ACADEMIC'
        }
    ];

    return (
        <DashboardLayout role="faculty" title="Approval Queue">
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>Pending Approvals</h2>
                <p style={{ color: '#666' }}>Review and approve student registrations or event requests.</p>
            </div>

            {requests.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '5rem 0', backgroundColor: '#0a0a0a', borderRadius: '16px', border: '1px dashed #222' }}>
                    <ClipboardCheck size={48} color="#222" style={{ marginBottom: '1.5rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>All caught up!</h3>
                    <p style={{ color: '#444' }}>No pending approval requests at the moment.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
                    {requests.map((r) => (
                        <div key={r.id} style={{ backgroundColor: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d32f2f' }}>
                                    <User size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{r.user}</h4>
                                    <p style={{ fontSize: '0.75rem', color: '#666' }}>Student Registration Request</p>
                                </div>
                            </div>

                            <div style={{ padding: '1rem', backgroundColor: '#050505', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #111' }}>
                                <span style={{ fontSize: '0.6rem', fontWeight: '900', color: '#d32f2f', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>EVENT</span>
                                <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{r.event}</span>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button style={{ flex: 1, backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                    Approve
                                </button>
                                <button style={{ flex: 1, backgroundColor: '#0a0a0a', border: '1px solid #222', color: '#666', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}>
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
};

export default FacultyApprovals;
