import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, GraduationCap, User, ShieldCheck, X } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { user, login, googleAuth, googleAuthComplete } = useAuth();
    const [activeRole, setActiveRole] = useState('student'); // 'student', 'faculty', 'admin'
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showGoogleModal, setShowGoogleModal] = useState(false);
    const [googleData, setGoogleData] = useState(null);
    const [department, setDepartment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin/overview');
            } else if (user.role === 'faculty') {
                navigate('/faculty/analytics');
            } else {
                navigate('/student/dashboard');
            }
        }
    }, [user, navigate]);



    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const res = await login({ email, password });
        if (!res.success) {
            setError(res.message);
        }
    };

    const handleGoogleComplete = async (e) => {
        e.preventDefault();
        if (!department) {
            setError('Please select a department');
            return;
        }

        const res = await googleAuthComplete({
            ...googleData,
            role: activeRole, // User selects role via tabs before clicking Google? Or we ask them?
            // Requirement says: "ask the student which department on the same question in the sign in google option"
            // And I asked "Assume they are a Student by default? or Show a popup?". User didn't explicitly answer but approved plan which said "Popup... select Department".
            // I will implement the Popup to select Department. 
            // I will also include Role selection in the popup just to be safe/flexible, defaulting to the active tab.
            department,
            year: '1' // Default year for now? Or ask? For simplicity, default to 1 or add field.
        });

        if (res.success) {
            setShowGoogleModal(false);
        } else {
            setError(res.message);
        }
    }


    const roles = [
        { id: 'student', label: 'Student', icon: <GraduationCap size={18} />, color: '#d32f2f' },
        { id: 'faculty', label: 'Faculty', icon: <User size={18} />, color: '#1976d2' },
        { id: 'admin', label: 'Admin', icon: <ShieldCheck size={18} />, color: '#455a64' }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 3vw, 2rem)',
            position: 'relative'
        }}>
            {/* Top Logo */}
            <Link to="/" style={{
                position: 'absolute',
                top: 'clamp(1rem, 3vw, 2rem)',
                left: 'clamp(1rem, 3vw, 2rem)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: 'white'
            }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#d32f2f', borderRadius: '3px' }}></div>
                <span style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: 'bold' }}>Eventri<span style={{ color: '#d32f2f' }}>X</span></span>
            </Link>

            <button className="hide-mobile" style={{
                position: 'absolute',
                top: 'clamp(1rem, 3vw, 2rem)',
                right: 'clamp(1rem, 3vw, 2rem)',
                backgroundColor: '#111',
                border: '1px solid #222',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                cursor: 'pointer'
            }}>
                Help
            </button>

            {/* Login Card */}
            <div style={{
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '420px',
                borderRadius: '16px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.25rem, 3vw, 2rem)',
                textAlign: 'center',
                color: '#333',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: `${roles.find(r => r.id === activeRole).color}15`,
                    color: roles.find(r => r.id === activeRole).color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    transition: 'all 0.3s ease'
                }}>
                    {roles.find(r => r.id === activeRole).icon}
                </div>

                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 1.75rem)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Login</h2>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2rem' }}>Access your Eventrix account</p>

                {/* Role Tabs */}
                <div style={{
                    display: 'flex',
                    backgroundColor: '#f5f5f5',
                    padding: '4px',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    gap: '4px'
                }}>
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => {
                                setActiveRole(role.id);
                                setError('');
                            }}
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '10px',
                                borderRadius: '6px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                backgroundColor: activeRole === role.id ? '#fff' : 'transparent',
                                color: activeRole === role.id ? role.color : '#666',
                                boxShadow: activeRole === role.id ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {role.id === 'student' ? <GraduationCap size={16} /> :
                                role.id === 'faculty' ? <User size={16} /> :
                                    <ShieldCheck size={16} />}
                            {role.label}
                        </button>
                    ))}
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fff5f5',
                        color: '#d32f2f',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        marginBottom: '1.5rem',
                        fontWeight: '600',
                        border: '1px solid #ffcdd2'
                    }}>
                        {error}
                    </div>
                )}

                <form style={{ textAlign: 'left' }} onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444' }}>
                            {activeRole === 'admin' ? 'Admin Username' : activeRole === 'faculty' ? 'Faculty Email' : 'Student Email'}
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={18} />
                            <input
                                type="email"
                                placeholder={activeRole === 'student' ? "student@eventrix.com" : activeRole === 'faculty' ? "faculty@eventrix.com" : "admin@eventrix.com"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                                    borderRadius: '6px',
                                    border: '1px solid #ddd',
                                    fontSize: '0.9rem'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#444' }}>Password</label>
                            <a href="#" style={{ fontSize: '0.75rem', color: '#aaa', textDecoration: 'none' }}>Forgot Password?</a>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                                    borderRadius: '6px',
                                    border: '1px solid #ddd',
                                    fontSize: '0.9rem'
                                }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            padding: '0.85rem',
                            marginBottom: '1.5rem',
                            borderRadius: '6px',
                            backgroundColor: roles.find(r => r.id === activeRole).color,
                            border: 'none'
                        }}
                    >
                        Login as {roles.find(r => r.id === activeRole).label}
                    </button>
                </form>

                {activeRole !== 'admin' && (
                    <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                        Don't have an account? <Link to={`/register/${activeRole}`} style={{ color: roles.find(r => r.id === activeRole).color, fontWeight: 'bold', textDecoration: 'none' }}>Register as {roles.find(r => r.id === activeRole).label}</Link>
                    </p>
                )}



                {activeRole !== 'admin' && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ddd' }}>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>OR</span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    const res = await googleAuth(credentialResponse.credential);
                                    if (res.success) {
                                        // Navigate logic handled by useEffect
                                    } else if (res.isNew) {
                                        setGoogleData(res.googleData);
                                        setShowGoogleModal(true);
                                    } else {
                                        setError(res.message);
                                    }
                                }}
                                onError={() => {
                                    setError('Login Failed');
                                }}
                            />
                        </div>
                    </>
                )}
            </div>

            <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#666', maxWidth: '400px', textAlign: 'center' }}>
                By logging in, you agree to Eventrix's <a href="#" style={{ color: '#aaa' }}>Terms of Service</a> and <a href="#" style={{ color: '#aaa' }}>Privacy Policy</a>.
            </p>

            <p style={{ marginTop: '2rem', color: '#444', fontSize: '0.7rem' }}>
                © 2026 EVENTRIX COLLEGE SYSTEMS. PREMIUM VARIANT 1.0
            </p>
            {/* Google Completion Modal */}
            {showGoogleModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '12px',
                        width: '90%',
                        maxWidth: '400px',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowGoogleModal(false)}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        <h3 style={{ marginBottom: '1rem', color: '#333' }}>Complete Registration</h3>
                        <p style={{ marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                            Please select your department to finish setting up your {activeRole} account.
                        </p>

                        <form onSubmit={handleGoogleComplete}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Department</label>
                                <select
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd'
                                    }}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Civil">Civil</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    backgroundColor: roles.find(r => r.id === activeRole)?.color || '#333',
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Complete Signup
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
