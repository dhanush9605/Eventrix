import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (email === 'student@eventrix.com' && password === 'student123') {
            login({ email, role: 'student', name: 'John Student' });
            navigate('/student/dashboard');
        } else if (email === 'faculty@eventrix.com' && password === 'faculty123') {
            login({ email, role: 'faculty', name: 'Dr. Faculty' });
            navigate('/faculty/analytics');
        } else if (email === 'admin@eventrix.com' && password === 'admin123') {
            login({ email, role: 'admin', name: 'System Admin' });
            navigate('/admin/users');
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative'
        }}>
            {/* Top Logo */}
            <Link to="/" style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: 'white'
            }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#d32f2f', borderRadius: '3px' }}></div>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Eventri<span style={{ color: '#d32f2f' }}>X</span></span>
            </Link>

            <button style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
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
                maxWidth: '400px',
                borderRadius: '12px',
                padding: '3rem 2rem',
                textAlign: 'center',
                color: '#333'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#fff5f5',
                    color: '#d32f2f',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <GraduationCap size={32} />
                </div>

                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Welcome Back</h2>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2rem' }}>Smart College Event Management</p>

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
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={18} />
                            <input
                                type="email"
                                placeholder="student@eventrix.com"
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

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginBottom: '1.5rem', borderRadius: '6px' }}>
                        Login
                    </button>
                </form>

                <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Don't have an account? <Link to="/register/student" style={{ color: '#000', fontWeight: 'bold', textDecoration: 'none' }}>Register Now</Link>
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ddd' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '0.75rem',
                        border: '1px solid #eee',
                        borderRadius: '6px',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                    }}>
                        <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" width="16" />
                        Google
                    </button>
                    <button style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '0.75rem',
                        border: '1px solid #eee',
                        borderRadius: '6px',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                    }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" alt="Outlook" width="16" />
                        Outlook
                    </button>
                </div>
            </div>

            <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#666', maxWidth: '400px', textAlign: 'center' }}>
                By logging in, you agree to Eventrix's <a href="#" style={{ color: '#aaa' }}>Terms of Service</a> and <a href="#" style={{ color: '#aaa' }}>Privacy Policy</a>.
            </p>

            <p style={{ marginTop: '2rem', color: '#444', fontSize: '0.7rem' }}>
                © 2024 EVENTRIX COLLEGE SYSTEMS. PREMIUM VARIANT 1.0
            </p>
        </div>
    );
};

export default Login;
