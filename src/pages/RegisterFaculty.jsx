import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, LayoutGrid, ChevronDown, MoveRight, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterFaculty = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Redirect if already logged in
    React.useEffect(() => {
        if (user) {
            const dashboardPath = user.role === 'admin' ? '/admin/overview' :
                user.role === 'faculty' ? '/faculty/analytics' :
                    '/student/dashboard';
            navigate(dashboardPath, { replace: true });
        }
    }, [user, navigate]);

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

                <form style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <input type="text" placeholder="Dr. Jane Smith" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.9rem', backgroundColor: '#f9f9f9' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Institutional Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <input type="email" placeholder="faculty@college.edu" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.9rem', backgroundColor: '#f9f9f9' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Department</label>
                        <div style={{ position: 'relative' }}>
                            <LayoutGrid style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <select style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.85rem', backgroundColor: '#f9f9f9', appearance: 'none', color: '#666' }}>
                                <option>Select Department</option>
                                <option>Engineering</option>
                                <option>Science</option>
                                <option>Design</option>
                            </select>
                            <ChevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <input type={showPassword ? "text" : "password"} placeholder="••••••••" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.9rem', backgroundColor: '#f9f9f9' }} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
                        <input type="checkbox" style={{ marginTop: '3px', accentColor: themeColor }} />
                        <p style={{ fontSize: '0.7rem', color: '#888', lineHeight: '1.4' }}>
                            By registering, I agree to the <span style={{ color: themeColor }}>Terms of Service</span> and <span style={{ color: themeColor }}>Privacy Policy</span>.
                        </p>
                    </div>

                    <button className="btn btn-primary" style={{
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

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    Already have an account? <Link to="/login" style={{ color: themeColor, fontWeight: 'bold', textDecoration: 'none' }}>Back to Login</Link>
                </p>
            </div>

            <footer style={{ marginTop: '3rem', width: '100%', textAlign: 'center' }}>
                <p style={{ color: '#444', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    © 2024 EVENTRIX GLOBAL INSTITUTIONAL SYSTEM
                </p>
            </footer>
        </div>
    );
};

export default RegisterFaculty;
