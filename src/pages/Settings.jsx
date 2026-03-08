import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Save, Calendar, Sliders } from 'lucide-react';
import * as api from '../services/api';
import toast from 'react-hot-toast';

const Settings = () => {
    const { user, updateUser } = useAuth();
    const role = user?.role || 'student';

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        year: user?.year || '',
        department: user?.department || ''
    });

    const [systemSettings, setSystemSettings] = useState({
        maintenanceMode: false,
        studentRegistration: true,
        facultyRegistration: true,
        publicLeaderboards: true,
        maintenancePassword: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                bio: user.bio || '',
                year: user.year || '',
                department: user.department || ''
            });
        }
    }, [user]);

    useEffect(() => {
        if (role === 'admin') {
            fetchSystemSettings();
        }
    }, [role]);

    const fetchSystemSettings = async () => {
        try {
            const { data } = await api.getSettings();
            setSystemSettings(data);
        } catch (error) {
            console.error('Fetch System Settings Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            // Save Profile if not admin
            if (role !== 'admin') {
                const { data } = await api.updateProfile(formData);
                updateUser(data.result, data.token);
            }

            // Save System Settings if admin
            if (role === 'admin') {
                await api.updateSettings(systemSettings);
            }

            toast.success('Settings updated successfully!');
        } catch (error) {
            console.error('Update Settings Error:', error);
            toast.error(error.response?.data?.message || 'Failed to update settings');
        } finally {
            setLoading(false);
        }
    };

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSystemToggle = (key) => {
        if (key === 'maintenanceMode') {
            setShowConfirm(true);
        } else {
            setSystemSettings(prev => ({ ...prev, [key]: !prev[key] }));
        }
    };

    const confirmToggle = () => {
        if (confirmPassword === systemSettings.maintenancePassword) {
            setSystemSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
            setShowConfirm(false);
            setConfirmPassword('');
            toast.success(`Maintenance Mode ${!systemSettings.maintenanceMode ? 'Enabled' : 'Disabled'}`);
        } else {
            toast.error('Incorrect maintenance password');
        }
    };

    const Toggle = ({ active, onToggle, label, description, isMaintenance }) => (
        <div style={{ padding: '1rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px', color: '#fff' }}>{label}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 0 }}>{description}</p>
                </div>
                <button
                    onClick={() => onToggle()}
                    style={{
                        width: '44px',
                        height: '24px',
                        borderRadius: '12px',
                        backgroundColor: active ? '#d32f2f' : '#333',
                        border: 'none',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        top: '3px',
                        left: active ? '23px' : '3px',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }} />
                </button>
            </div>
            {isMaintenance && showConfirm && (
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#111',
                    borderRadius: '8px',
                    border: '1px solid #222',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <input
                        type="password"
                        placeholder="Enter Maintenance Password to Confirm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{
                            flex: 1,
                            backgroundColor: '#050505',
                            border: '1px solid #333',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            color: '#fff',
                            fontSize: '0.85rem'
                        }}
                    />
                    <button
                        onClick={confirmToggle}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#d32f2f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => { setShowConfirm(false); setConfirmPassword(''); }}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: 'transparent',
                            color: '#888',
                            border: '1px solid #333',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <DashboardLayout role={role} title="Account Settings">
            <div style={{ maxWidth: '800px' }}>
                {/* Profile Section */}
                {role !== 'admin' ? (
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
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
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
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
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

                            <div style={{ gridColumn: role === 'student' ? 'span 1' : 'span 2' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>Department</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#111',
                                        border: '1px solid #222',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        appearance: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Computer Science and Design">Computer Science and Design</option>
                                    <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Civil">Civil</option>
                                </select>
                            </div>

                            {role === 'student' && (
                                <div style={{ gridColumn: 'span 1' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>Semester / Year</label>
                                    <div style={{ position: 'relative' }}>
                                        <select
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            style={{
                                                width: '100%',
                                                backgroundColor: '#111',
                                                border: '1px solid #222',
                                                borderRadius: '8px',
                                                padding: '12px',
                                                paddingLeft: '40px',
                                                color: '#fff',
                                                fontSize: '0.9rem',
                                                appearance: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <option value="">Select Semester</option>
                                            <option value="S1">Semester 1</option>
                                            <option value="S2">Semester 2</option>
                                            <option value="S3">Semester 3</option>
                                            <option value="S4">Semester 4</option>
                                            <option value="S5">Semester 5</option>
                                            <option value="S6">Semester 6</option>
                                            <option value="S7">Semester 7</option>
                                            <option value="S8">Semester 8</option>
                                        </select>
                                        <Calendar size={18} color="#666" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                    </div>
                                </div>
                            )}

                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>Bio</label>
                                <textarea
                                    name="bio"
                                    rows="3"
                                    placeholder="Tell us a little about yourself..."
                                    value={formData.bio}
                                    onChange={handleChange}
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
                ) : (
                    <div style={{ marginBottom: '2rem', backgroundColor: '#0a0505', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '10px', backgroundColor: '#d32f2f15', borderRadius: '8px' }}>
                                <Sliders size={24} color="#d32f2f" />
                            </div>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>System Configuration</h2>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <Toggle
                                label="Maintenance Mode"
                                description="Prevent users from accessing the platform during updates"
                                active={systemSettings.maintenanceMode}
                                onToggle={() => handleSystemToggle('maintenanceMode')}
                                isMaintenance={true}
                            />
                            <div style={{ height: '1px', backgroundColor: '#1a1a1a' }} />
                            <Toggle
                                label="Student Registration"
                                description="Allow new students to register accounts"
                                active={systemSettings.studentRegistration}
                                onToggle={() => handleSystemToggle('studentRegistration')}
                            />
                            <div style={{ height: '1px', backgroundColor: '#1a1a1a' }} />
                            <Toggle
                                label="Faculty Registration"
                                description="Allow new faculty members to register accounts"
                                active={systemSettings.facultyRegistration}
                                onToggle={() => handleSystemToggle('facultyRegistration')}
                            />
                            <div style={{ height: '1px', backgroundColor: '#1a1a1a' }} />
                            <Toggle
                                label="Public Leaderboards"
                                description="Show event rankings to all authenticated users"
                                active={systemSettings.publicLeaderboards}
                                onToggle={() => handleSystemToggle('publicLeaderboards')}
                            />
                        </div>
                    </div>
                )}

                {/* Security Section */}
                <div style={{ marginBottom: '3rem', backgroundColor: '#0a0505', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '10px', backgroundColor: '#d32f2f15', borderRadius: '8px' }}>
                            <Lock size={24} color="#d32f2f" />
                        </div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Security</h2>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0' }}>
                            Password management is handled through your institutional account.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: 'transparent',
                            border: '1px solid #333',
                            color: '#ccc',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: loading ? '#666' : '#d32f2f',
                            border: 'none',
                            color: '#fff',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
