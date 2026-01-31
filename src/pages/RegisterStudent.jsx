import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterStudent = () => {
    const [showPassword, setShowPassword] = useState(false);

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
            {/* Background Decorative Rings */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '600px',
                height: '600px',
                border: '1px dashed #d32f2f30',
                borderRadius: '50%',
                zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                width: '400px',
                height: '400px',
                border: '1px solid #d32f2f10',
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
                zIndex: 10
            }}>
                Help Center
            </span>

            {/* Register Card */}
            <div style={{
                backgroundColor: '#fff',
                width: '100%',
                maxWidth: '440px',
                borderRadius: '12px',
                padding: '3rem 2.5rem',
                textAlign: 'center',
                color: '#333',
                zIndex: 1,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Join EventriX</h2>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2rem' }}>Create your student account to manage college events</p>

                <form style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <input type="text" placeholder="Enter your full name" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.9rem', backgroundColor: '#f9f9f9' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>College Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <input type="email" placeholder="name@college.edu" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.9rem', backgroundColor: '#f9f9f9' }} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                            <input type={showPassword ? "text" : "password"} placeholder="••••••••" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.9rem', backgroundColor: '#f9f9f9' }} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa' }}>
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Department</label>
                            <div style={{ position: 'relative' }}>
                                <GraduationCap style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                                <select style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.85rem', backgroundColor: '#f9f9f9', appearance: 'none', color: '#666' }}>
                                    <option>Computer Science</option>
                                    <option>Engineering</option>
                                    <option>Arts</option>
                                </select>
                                <Lock style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={12} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444', textTransform: 'uppercase' }}>Account Role</label>
                            <div style={{ position: 'relative' }}>
                                <Briefcase style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={16} />
                                <input disabled value="Student" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid #eee', fontSize: '0.85rem', backgroundColor: '#f3f3f3', color: '#888' }} />
                                <Lock style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} size={12} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                        <input type="checkbox" style={{ marginTop: '3px' }} />
                        <p style={{ fontSize: '0.7rem', color: '#888', lineHeight: '1.4' }}>
                            By creating an account, I agree to the <a href="#" style={{ color: '#d32f2f', textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: '#d32f2f', textDecoration: 'none' }}>Privacy Policy</a>.
                        </p>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        Create Student Account <ChevronRight size={18} />
                    </button>
                </form>

                <div style={{ margin: '1.5rem 0', color: '#eee', display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
                    <span style={{ padding: '0 10px', fontSize: '0.75rem', color: '#aaa' }}>Or</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
                </div>

                <button style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '0.85rem',
                    border: '1px solid #eee',
                    borderRadius: '6px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginBottom: '1.5rem'
                }}>
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" width="18" />
                    Continue with Google
                </button>

                <p style={{ fontSize: '0.85rem' }}>
                    Already have an account? <Link to="/login" style={{ color: '#d32f2f', fontWeight: 'bold', textDecoration: 'none' }}>Back to Login</Link>
                </p>
            </div>

            <p style={{ position: 'absolute', bottom: '2rem', color: '#444', fontSize: '0.7rem' }}>
                © 2024 EVENTRIX SYSTEM • SECURE STUDENT PORTAL
            </p>
        </div>
    );
};

const Briefcase = ({ size, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

export default RegisterStudent;
