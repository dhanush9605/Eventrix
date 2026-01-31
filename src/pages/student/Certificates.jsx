import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Award, Download, Calendar, CheckCircle } from 'lucide-react';

const StudentCertificates = () => {
    const certificates = [
        {
            id: 'CERT-2024-001',
            title: 'Intro to Robotics Workshop',
            issueDate: 'Sep 15, 2024',
            issuer: 'Robotics Club',
            grade: 'Distinction',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop'
        },
        {
            id: 'CERT-2023-089',
            title: 'Web Development Bootcamp',
            issueDate: 'Dec 10, 2023',
            issuer: 'Computer Science Dept',
            grade: 'Pass',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=400&auto=format&fit=crop'
        },
        {
            id: 'CERT-2023-045',
            title: 'Data Science Fundamentals',
            issueDate: 'Aug 20, 2023',
            issuer: 'Data Science Society',
            grade: 'Merit',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop'
        }
    ];

    return (
        <DashboardLayout role="student" title="My Certificates">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {certificates.map(cert => (
                    <div key={cert.id} style={{
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

                                <button style={{
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
                                }}>
                                    <Download size={16} /> Download PDF
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
};

export default StudentCertificates;
