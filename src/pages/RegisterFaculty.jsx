import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, LayoutGrid, ChevronDown, MoveRight, GraduationCap, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';

const RegisterFaculty = () => {
    const { user, register, googleAuth, googleAuthComplete } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: 'Engineering' // Default first option
    });
    const [error, setError] = useState('');
    const [showGoogleModal, setShowGoogleModal] = useState(false);
    const [googleData, setGoogleData] = useState(null);
    const [deptForGoogle, setDeptForGoogle] = useState('Engineering');

    // Redirect if already logged in
    React.useEffect(() => {
        if (user) {
            const dashboardPath = user.role === 'admin' ? '/admin/overview' :
                user.role === 'faculty' ? '/faculty/analytics' :
                    '/student/dashboard';
            navigate(dashboardPath, { replace: true });
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const res = await register({ ...formData, role: 'faculty' });
        if (res.success) {
            navigate('/faculty/analytics');
        } else {
            setError(res.message);
        }
    };

    const handleGoogleComplete = async (e) => {
        e.preventDefault();
        const res = await googleAuthComplete({
            ...googleData,
            role: 'faculty',
            department: deptForGoogle
        });

        if (res.success) {
            setShowGoogleModal(false);
            navigate('/faculty/analytics');
        } else {
            setError(res.message);
        }
    };

    const themeColor = '#1976d2'; // Professional Blue for Faculty

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decorative Rings (Blue themed) */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '600px',
                height: '600px',
                border: '1px dashed rgba(25, 118, 210, 0.2)',
                borderRadius: '50%',
                zIndex: 0
            }}></div>

            {/* Top Logo */}
            <Link to="/" style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: 'white',
                zIndex: 10
            }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#d32f2f', borderRadius: '3px' }}></div>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Eventri<span style={{ color: '#d32f2f' }}>X</span></span>
            </Link>

            <span style={{
                position: 'absolute',
                top: '2.5rem',
                right: '2rem',
                color: '#666',
                fontSize: '0.8rem',
                zIndex: 10,
                cursor: 'pointer'
            }}>
                Institutional Help
            </span>

            {/* Register Card */}
            <div style={{
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '480px',
                borderRadius: '16px',
                padding: '2.5rem 2.5rem',
                textAlign: 'center',
                color: '#333',
                zIndex: 1,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                position: 'relative'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: `${themeColor}15`,
                    color: themeColor,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <User size={32} />
                </div>

                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Faculty Portal</h2>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2rem' }}>Create your institutional profile</p>

                {/* Role Tabs */}
                <div style={{
                    display: 'flex',
                    backgroundColor: '#f5f5f5',
                    padding: '4px',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    gap: '4px'
                }}>
                    <button
                        onClick={() => navigate('/register/student')}
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
                            backgroundColor: 'transparent',
                            color: '#666',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <GraduationCap size={16} />
                        Student
                    </button>
                    <button
                        onClick={() => navigate('/register/faculty')}
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
                            backgroundColor: '#fff',
                            color: themeColor,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <User size={16} />
                        Faculty
                    </button>
                </div>

                {error && (
                    <div style={{ backgroundColor: '#fff5f5', color: '#d32f2f', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '1.5rem', fontWeight: '600', border: '1px solid #ffcdd2' }}>
                        {error}
                    </div>
                )}

                <form style={{ textAlign: 'left' }} onSubmit={handleRegister}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <input name="name" onChange={handleChange} required type="text" placeholder="Dr. Jane Smith" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.9rem', backgroundColor: '#f9f9f9' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Institutional Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <input name="email" onChange={handleChange} required type="email" placeholder="faculty@college.edu" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.9rem', backgroundColor: '#f9f9f9' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Department</label>
                        <div style={{ position: 'relative' }}>
                            <LayoutGrid style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <select name="department" onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.85rem', backgroundColor: '#f9f9f9', appearance: 'none', color: '#666' }}>
                                <option value="Engineering">Engineering</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Computer Science and Design">Computer Science and Design</option>
                                <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Civil">Civil</option>
                            </select>
                            <ChevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <input name="password" onChange={handleChange} required type={showPassword ? "text" : "password"} placeholder="••••••••" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.9rem', backgroundColor: '#f9f9f9' }} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <input name="confirmPassword" onChange={handleChange} required type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.9rem', backgroundColor: '#f9f9f9' }} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
                        <input type="checkbox" style={{ marginTop: '3px', accentColor: themeColor }} required />
                        <p style={{ fontSize: '0.7rem', color: '#888', lineHeight: '1.4' }}>
                            By registering, I agree to the <span style={{ color: themeColor }}>Terms of Service</span> and <span style={{ color: themeColor }}>Privacy Policy</span>.
                        </p>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        backgroundColor: themeColor,
                        border: 'none',
                        boxShadow: `0 10px 20px ${themeColor}20`
                    }}>
                        Create Faculty Account <MoveRight size={20} />
                    </button>
                </form>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
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
                            setError('Registration Failed');
                        }}
                    />
                </div>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    Already have an account? <Link to="/login" style={{ color: themeColor, fontWeight: 'bold', textDecoration: 'none' }}>Back to Login</Link>
                </p>
            </div>

            <footer style={{ marginTop: '3rem', width: '100%', textAlign: 'center' }}>
                <p style={{ color: '#444', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    © 2026 EVENTRIX GLOBAL INSTITUTIONAL SYSTEM
                </p>
            </footer>

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
                            Please select your department to finish setting up your Faculty account.
                        </p>

                        <form onSubmit={handleGoogleComplete}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Department</label>
                                <select
                                    value={deptForGoogle}
                                    onChange={(e) => setDeptForGoogle(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd'
                                    }}
                                    required
                                >
                                    <option value="Engineering">Engineering</option>
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

                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    backgroundColor: themeColor,
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

export default RegisterFaculty;
