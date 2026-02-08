import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../context/AuthContext';
import { User, ShieldCheck, Download } from 'lucide-react';

const StudentQRPass = () => {
    const { user } = useAuth();

    if (!user) return null;

    // The QR data is just the student ID
    const qrData = user.studentId || 'N/A';

    return (
        <div style={{
            backgroundColor: '#0a0505',
            border: '1px solid #1a1a1a',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            color: '#fff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            maxWidth: '320px',
            margin: '0 auto'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '1.5rem',
                color: '#d32f2f'
            }}>
                <ShieldCheck size={20} />
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Institutional Pass</span>
            </div>

            <div style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '12px',
                display: 'inline-block',
                marginBottom: '1.5rem',
                boxShadow: '0 0 20px rgba(211, 47, 47, 0.2)'
            }}>
                <QRCodeSVG
                    value={qrData}
                    size={160}
                    level="H"
                    includeMargin={false}
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '4px' }}>{user.name}</h3>
                <p style={{ fontSize: '0.75rem', color: '#666' }}>ID: {user.studentId || 'N/A'}</p>
            </div>

            <div style={{
                borderTop: '1px solid #1a1a1a',
                paddingTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#444' }}>
                    <span>ROLE</span>
                    <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>STUDENT</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#444' }}>
                    <span>STATUS</span>
                    <span style={{ color: '#4caf50', fontWeight: 'bold' }}>VERIFIED</span>
                </div>
            </div>

            <button style={{
                marginTop: '1.5rem',
                width: '100%',
                padding: '10px',
                backgroundColor: '#111',
                border: '1px solid #222',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
            }}>
                <Download size={14} /> Download Pass
            </button>
        </div>
    );
};

export default StudentQRPass;
