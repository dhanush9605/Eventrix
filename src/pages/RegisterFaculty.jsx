import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, LayoutGrid, ChevronDown, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterFaculty = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(211, 47, 47, 0.05) 0%, transparent 50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative'
        }}>
            {/* Top Bar */}
            <div className="container" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '80px',
                padding: '0 2rem'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white' }}>
                    <div style={{ width: '28px', height: '28px', backgroundColor: '#d32f2f', borderRadius: '4px' }}></div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Eventri<span style={{ color: '#d32f2f' }}>X</span></span>
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold' }}>Home</Link>
                    <Link to="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold' }}>Events</Link>
                    <Link to="#" style={{ color: '#aaa', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 'bold' }}>Contact</Link>
                    <Link to="/login" className="btn btn-primary" style={{ padding: '0.6rem 2rem', border: 'none' }}>Login</Link>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '600px' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1rem', textTransform: 'uppercase' }}>Faculty Registration</h1>
                <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>Join the premium event management ecosystem designed for institutional excellence.</p>
            </div>

            {/* Register Card */}
            <div style={{
                backgroundColor: '#111',
                width: '100%',
                maxWidth: '480px',
                borderRadius: '16px',
                padding: '3rem 2.5rem',
                border: '1px solid #d32f2f30',
                position: 'relative',
                boxShadow: '0 0 50px rgba(211, 47, 47, 0.1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ color: '#666', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Account Type</span>
                        <span style={{ backgroundColor: '#d32f2f15', color: '#d32f2f', padding: '4px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Faculty</span>
                    </div>
                </div>

                <form style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#eee' }}>
                            <User size={16} /> Full Name
                        </label>
                        <input type="text" placeholder="Enter your full name" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #222', fontSize: '0.9rem', backgroundColor: '#181818', color: 'white' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#eee' }}>
                            <Mail size={16} /> Faculty ID / Institutional Email
                        </label>
                        <input type="email" placeholder="e.g. faculty@college.edu" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #222', fontSize: '0.9rem', backgroundColor: '#181818', color: 'white' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#eee' }}>
                            <LayoutGrid size={16} /> Department
                        </label>
                        <div style={{ position: 'relative' }}>
                            <select style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #222', fontSize: '0.9rem', backgroundColor: '#181818', color: 'white', appearance: 'none' }}>
                                <option>Select Department</option>
                                <option>Engineering</option>
                                <option>Science</option>
                                <option>Design</option>
                            </select>
                            <ChevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={16} />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#eee' }}>
                            <Lock size={16} /> Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input type={showPassword ? "text" : "password"} placeholder="Create a secure password" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #222', fontSize: '0.9rem', backgroundColor: '#181818', color: 'white' }} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginBottom: '2.5rem' }}>
                        <input type="checkbox" style={{ marginTop: '4px', accentColor: '#d32f2f' }} />
                        <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.5' }}>
                            By registering, I agree to the <span style={{ color: '#d32f2f' }}>Terms of Service</span> and <span style={{ color: '#d32f2f' }}>Privacy Policy</span> of the institution.
                        </p>
                    </div>

                    <button className="btn btn-primary" style={{ width: '100%', padding: '1.1rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: 'bold', boxShadow: '0 10px 20px rgba(211, 47, 47, 0.2)' }}>
                        Register as Faculty <MoveRight size={20} />
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    Already have an account? <Link to="/login" style={{ color: '#d32f2f', fontWeight: 'bold', textDecoration: 'none' }}>Log in</Link>
                </p>
            </div>

            <footer style={{ position: 'absolute', bottom: '2rem', width: '100%', textAlign: 'center' }}>
                <p style={{ color: '#444', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                    © 2024 EVENTRIX GLOBAL INSTITUTIONAL SYSTEM. ALL RIGHTS RESERVED.
                </p>
            </footer>
        </div>
    );
};

export default RegisterFaculty;
