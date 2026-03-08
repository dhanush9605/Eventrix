import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../context/AuthContext';
import { User, ShieldCheck, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

const StudentQRPass = () => {
    const { user } = useAuth();
    const [downloading, setDownloading] = useState(false);
    const passRef = useRef(null);

    if (!user) return null;

    // The QR data is just the student ID
    const qrData = user.studentId || 'N/A';

    const handleDownload = async () => {
        if (!passRef.current) return;
        setDownloading(true);

        try {
            const canvas = await html2canvas(passRef.current, {
                scale: 2, // High resolution
                backgroundColor: '#0a0505',
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `Eventrix_Pass_${user.studentId || 'N_A'}.png`;
            link.click();
        } catch (error) {
            console.error('Failed to download pass:', error);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div ref={passRef} style={{
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
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Eventrix Pass</span>
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

            <button
                data-html2canvas-ignore="true"
                onClick={handleDownload}
                disabled={downloading}
                style={{
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
                    cursor: downloading ? 'not-allowed' : 'pointer',
                    opacity: downloading ? 0.7 : 1
                }}
            >
                {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                {downloading ? 'Downloading...' : 'Download Pass'}
            </button>
        </div>
    );
};

export default StudentQRPass;
