import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { User, Bell, Lock, Save } from 'lucide-react';

const Settings = () => {
    const { user } = useAuth();
    // Fallback role if user context is missing (though ProtectedRoute handles this)
    const role = user?.role || 'student';

    return (
        <DashboardLayout role={role} title="Account Settings">
            <div style={{ maxWidth: '800px' }}>
                {/* Profile Section */}
                <div style={{ marginBottom: '2rem', backgroundColor: '#0a0505', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '10px', backgroundColor: '#d32f2f15', borderRadius: '8px' }}>
                            <User size={24} color="#d32f2f" />
                        </div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Profile Information</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>Full Name</label>
                            <input
                                type="text"
                                defaultValue={user?.name || (role === 'student' ? 'Alex Johnson' : 'Dr. Aris Thorne')}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#111',
                                    border: '1px solid #222',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    color: '#fff',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>Email Address</label>
                            <input
                                type="email"
                                defaultValue={user?.email || (role === 'student' ? 'alex.j@university.edu' : 'aris.thorne@university.edu')}
                                style={{
                                    width: '100%',
                                    backgroundColor: '#111',
                                    border: '1px solid #222',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    color: '#fff',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>Bio</label>
                            <textarea
                                rows="3"
                                placeholder="Tell us a little about yourself..."
                                style={{
                                    width: '100%',
                                    backgroundColor: '#111',
                                    border: '1px solid #222',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    resize: 'none'
                                }}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div style={{ marginBottom: '2rem', backgroundColor: '#0a0505', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '10px', backgroundColor: '#d32f2f15', borderRadius: '8px' }}>
                            <Bell size={24} color="#d32f2f" />
                        </div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Notifications</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            'Email notifications for new events',
                            'Push notifications for session starts',
                            'Weekly summary reports'
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i !== 2 ? '1px solid #1a1a1a' : 'none' }}>
                                <span style={{ color: '#ccc', fontSize: '0.9rem' }}>{item}</span>
                                <div style={{
                                    width: '40px',
                                    height: '20px',
                                    backgroundColor: i === 0 ? '#d32f2f' : '#333',
                                    borderRadius: '100px',
                                    position: 'relative',
                                    cursor: 'pointer'
                                }}>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: i === 0 ? '22px' : '2px',
                                        transition: 'left 0.2s'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Password Section */}
                <div style={{ marginBottom: '3rem', backgroundColor: '#0a0505', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '10px', backgroundColor: '#d32f2f15', borderRadius: '8px' }}>
                            <Lock size={24} color="#d32f2f" />
                        </div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Security</h2>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>Previous Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    backgroundColor: '#111',
                                    border: '1px solid #222',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    color: '#fff',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>New Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#111',
                                        border: '1px solid #222',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        color: '#fff',
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#111',
                                        border: '1px solid #222',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        color: '#fff',
                                        fontSize: '0.9rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button style={{
                        padding: '12px 24px',
                        backgroundColor: 'transparent',
                        border: '1px solid #333',
                        color: '#ccc',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        Cancel
                    </button>
                    <button style={{
                        padding: '12px 24px',
                        backgroundColor: '#d32f2f',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
