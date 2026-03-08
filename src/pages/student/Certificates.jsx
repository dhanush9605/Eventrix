import React, { useEffect, useState, useRef } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Award, Download, Calendar, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import * as api from '../../services/api';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CertificateTemplate from '../../components/CertificateTemplate';

const StudentCertificates = () => {
    const { user } = useAuth();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCert, setActiveCert] = useState(null);
    const certRef = useRef(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            if (!user?.studentId) return;
            try {
                const { data } = await api.getAttendedEvents(user.studentId);
                // Map event data to certificate format
                const mappedCerts = data.map(event => ({
                    id: `CERT-${event._id.substring(0, 8).toUpperCase()}`,
                    title: event.title,
                    issueDate: new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }),
                    issuer: event.category || 'Eventrix',
                    grade: 'Attended',
                    image: event.bannerImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop'
                }));
                setCertificates(mappedCerts);
            } catch (error) {
                console.error('Fetch Certificates Error:', error);
                toast.error('Failed to load certificates');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, [user]);

    const handleDownload = async (cert) => {
        setActiveCert(cert);
        const toastId = toast.loading(`Generating certificate for ${cert.title}...`);

        // Wait for state update and render
        setTimeout(async () => {
            try {
                const element = document.getElementById('certificate-render');
                if (!element) throw new Error('Render element not found');

                const canvas = await html2canvas(element, {
                    scale: 2, // High resolution
                    useCORS: true,
                    backgroundColor: '#050505'
                });

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'px',
                    format: [canvas.width, canvas.height]
                });

                pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                pdf.save(`${cert.title.replace(/\s+/g, '_')}_Certificate.pdf`);

                toast.success('Certificate downloaded!', { id: toastId });
            } catch (error) {
                console.error('PDF Generation Error:', error);
                toast.error('Failed to generate certificate', { id: toastId });
            } finally {
                setActiveCert(null);
            }
        }, 500);
    };

    return (
        <DashboardLayout role="student" title="My Certificates">
            {/* Hidden template for PDF generation */}
            {activeCert && (
                <CertificateTemplate
                    ref={certRef}
                    certData={activeCert}
                    studentName={user?.name || 'Student'}
                    studentId={user?.studentId || 'N/A'}
                />
            )}

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <Loader2 size={40} className="animate-spin" color="#d32f2f" />
                </div>
            ) : certificates.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                    <Award size={64} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                    <p>No certificates earned yet. Attend events to receive certificates!</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {certificates.map(cert => (
                        <div key={cert.id} className="hover-card" style={{
                            backgroundColor: '#0a0505',
                            border: '1px solid #1a1a1a',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ position: 'relative', height: '140px', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: '#d32f2f', color: '#fff' }}>
                                        <Award size={32} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>{cert.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1.5rem' }}>Issued by {cert.issuer}</p>

                                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #1a1a1a', paddingTop: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Calendar size={14} /> {cert.issueDate}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <CheckCircle size={14} color="#4caf50" /> {cert.grade}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDownload(cert)}
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#fff',
                                            color: '#000',
                                            border: 'none',
                                            padding: '10px',
                                            borderRadius: '6px',
                                            fontWeight: '600',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <Download size={16} /> Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
};

export default StudentCertificates;
