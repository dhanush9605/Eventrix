import React from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import StudentQRPass from '../../components/StudentQRPass';
import { User, Mail, GraduationCap, MapPin, Calendar, ShieldCheck } from 'lucide-react';

const StudentProfile = () => {
    const { user } = useAuth();

    if (!user) return null;

    const profileDetails = [
        { label: 'Full Name', value: user.name, icon: User },
        { label: 'Registration ID', value: user.studentId || 'N/A', icon: ShieldCheck },
        { label: 'Institutional Email', value: user.email, icon: Mail },
        { label: 'Department', value: user.department || 'Not Assigned', icon: GraduationCap },
        { label: 'Current Semester', value: user.year ? user.year.replace('S', 'Semester ') : 'N/A', icon: Calendar },
    ];

    return (
        <DashboardLayout role="student" title="Student Profile">
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: '2.5rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Left Column: Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{
                        backgroundColor: '#0a0505',
                        border: '1px solid #1a1a1a',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '150px',
                            height: '150px',
                            background: 'radial-gradient(circle at top right, #d32f2f10, transparent 70%)',
                            pointerEvents: 'none'
                        }}></div>

                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', color: '#fff' }}>Personal Information</h2>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                            {profileDetails.map((detail, index) => (
                                <div key={index}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#666' }}>
                                        <detail.icon size={16} />
                                        <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{detail.label}</span>
                                    </div>
                                    <p style={{ fontSize: '1rem', color: '#fff', fontWeight: '600' }}>{detail.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#0a0505',
                        border: '1px solid #1a1a1a',
                        borderRadius: '20px',
                        padding: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>Academic Status</h3>
                            <p style={{ fontSize: '0.85rem', color: '#666' }}>Currently enrolled in Bachelors of Technology</p>
                        </div>
                        <div style={{
                            backgroundColor: '#4caf5015',
                            color: '#4caf50',
                            padding: '8px 20px',
                            borderRadius: '100px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            border: '1px solid #4caf5030'
                        }}>
                            ACTIVE STUDENT
                        </div>
                    </div>
                </div>

                {/* Right Column: QR Pass */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '4px' }}>Institutional Digital Pass</h2>
                        <p style={{ fontSize: '0.8rem', color: '#666' }}>Show this QR to faculty for attendance</p>
                    </div>

                    <div style={{ transform: 'scale(1.05)', marginTop: '1rem' }}>
                        <StudentQRPass />
                    </div>

                    <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        backgroundColor: '#111',
                        borderRadius: '16px',
                        border: '1px solid #222',
                        display: 'flex',
                        gap: '12px'
                    }}>
                        <div style={{ color: '#d32f2f' }}>
                            <ShieldCheck size={24} />
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: '1.5' }}>
                            This digital pass is verified and linked to your student registration. It is used for event entry and automated attendance tracking across the campus.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </DashboardLayout>
    );
};

export default StudentProfile;
