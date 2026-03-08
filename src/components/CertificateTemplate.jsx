import React, { forwardRef } from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const EventrixLogo = ({ height = 30 }) => {
    const width = height * (473.53 / 143.57);
    return (
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 473.53 143.57" width={width} height={height} style={{ display: 'block' }}>
            <g>
                <path style={{ fill: '#fff' }} d="M1.97,50.41h42.15c1.09,0,1.97.88,1.97,1.97v6.15c0,1.09-.88,1.97-1.97,1.97h-26.8c-1.09,0-1.97.88-1.97,1.97v1.11c0,1.09.88,1.97,1.97,1.97h26.8c1.09,0,1.97.88,1.97,1.97v5.18c0,1.09-.88,1.97-1.97,1.97h-26.8c-1.09,0-1.97.88-1.97,1.97v1.11c0,1.09.88,1.97,1.97,1.97h26.8c1.09,0,1.97.88,1.97,1.97v6.17c0,1.09-.88,1.97-1.97,1.97H1.97c-1.09,0-1.97-.88-1.97-1.97v-35.44c0-1.09.88-1.97,1.97-1.97Z" />
                <path style={{ fill: '#fff' }} d="M78.36,73.63l9.69-22.05c.31-.72,1.02-1.18,1.81-1.18h12.77c1.48,0,2.43,1.56,1.76,2.87l-18.16,35.43c-.34.66-1.02,1.07-1.76,1.07h-15.84c-.74,0-1.42-.41-1.76-1.07l-18.14-35.43c-.67-1.31.28-2.87,1.76-2.87h12.77c.78,0,1.49.46,1.81,1.18l9.69,22.05c.69,1.57,2.92,1.57,3.61,0Z" />
                <path style={{ fill: '#fff' }} d="M109.04,50.41h42.05c1.11,0,2.02.9,2.02,2.02v6.04c0,1.11-.9,2.02-2.02,2.02h-26.69c-1.11,0-2.02.9-2.02,2.02v1c0,1.11.9,2.02,2.02,2.02h26.69c1.11,0,2.02.9,2.02,2.02v5.07c0,1.11-.9,2.02-2.02,2.02h-26.69c-1.11,0-2.02.9-2.02,2.02v1c0,1.11.9,2.02,2.02,2.02h26.69c1.11,0,2.02.9,2.02,2.02v6.07c0,1.11-.9,2.02-2.02,2.02h-42.05c-1.11,0-2.02-.9-2.02-2.02v-35.34c0-1.11.9-2.02,2.02-2.02Z" />
                <path style={{ fill: '#fff' }} d="M201.64,50.35h11.42c1.09,0,1.98.89,1.98,1.98v35.42c0,1.09-.89,1.98-1.98,1.98h-14.41c-.57,0-1.11-.24-1.49-.67l-17.1-19.44c-1.2-1.37-3.46-.52-3.46,1.31v16.83c0,1.09-.89,1.98-1.98,1.98h-11.39c-1.09,0-1.98-.89-1.98-1.98v-35.42c0-1.09.89-1.98,1.98-1.98h18.21c.59,0,1.15.26,1.52.72l13.19,15.92c1.18,1.43,3.5.59,3.5-1.26v-13.39c0-1.09.89-1.98,1.98-1.98Z" />
                <path style={{ fill: '#fff' }} d="M238.62,86.81v-20.95c0-1.64-1.33-2.97-2.97-2.97h-12.31c-1.64,0-2.97-1.33-2.97-2.97v-6.53c0-1.64,1.33-2.97,2.97-2.97h45.91c1.64,0,2.97,1.33,2.97,2.97v6.53c0,1.64-1.33,2.97-2.97,2.97h-12.31c-1.64,0-2.97,1.33-2.97,2.97v20.95c0,1.64-1.33,2.97-2.97,2.97h-9.4c-1.64,0-2.97-1.33-2.97-2.97Z" />
                <path style={{ fill: '#fff' }} d="M315.29,50.38c8.12-.09,15,6.74,14.88,14.88,0,2.96-.79,5.65-2.37,8.06-1.16,1.77-2.61,3.23-4.35,4.36-.96.62-1.14,1.96-.44,2.87l4.65,5.98c1.02,1.31.08,3.23-1.58,3.23h-11.28c-.62,0-1.2-.29-1.58-.78l-6.21-8.05c-.38-.49-.96-.78-1.58-.78h-10.73c-1.1,0-2,.9-2,2v5.61c0,1.1-.9,2-2,2h-11.35c-1.1,0-2,.9-2,2v-35.38c0-1.1.9-2,2-2h35.94ZM292.7,63.89v2.71c0,1.1.9,2,2,2h16.72c.94,0,1.73-.32,2.37-.97.59-.59.91-1.26.98-2.02.2-2.03-1.57-3.72-3.6-3.72h-16.47c-1.1,0-2,.9-2,2Z" />
                <path style={{ fill: '#fff' }} d="M350.27,52.35v35.37c0,1.1-.9,2-2,2h-11.35c-1.1,0-2-.9-2-2v-35.37c0-1.1.9-2,2-2h11.35c1.1,0,2,.9,2,2Z" />
            </g>
            <g>
                <path style={{ fill: '#ed1c24' }} d="M342.3,0h-23.14c-2.64,0-3.96,3.19-2.1,5.06l64.56,64.72c1.16,1.16,3.03,1.16,4.19,0l11.68-11.63c1.16-1.16,1.17-3.04,0-4.2L344.4.87c-.56-.56-1.31-.87-2.1-.87Z" />
                <path style={{ fill: '#ed1c24' }} d="M472.66,129.13l-55.42-55.42c-1.16-1.16-3.04-1.16-4.19,0l-11.68,11.68c-1.16,1.16-1.16,3.03,0,4.19l43.64,43.76c.56.56,1.31.87,2.1.87l23.45-.02c2.64,0,3.96-3.2,2.09-5.06Z" />
                <path style={{ fill: '#ed1c24' }} d="M470.3,9.33l-22.28-.2c-.79,0-1.56.3-2.12.86l-44.19,43.98c-1.16,1.16-1.17,3.04,0,4.2l11.35,11.35c1.16,1.16,3.04,1.16,4.19,0l55.13-55.13c1.86-1.86.56-5.04-2.07-5.06Z" />
                <path style={{ fill: '#ed1c24' }} d="M318.85,143.57h23.11c.79,0,1.54-.31,2.1-.87l53.12-53.12c1.16-1.16,1.16-3.03,0-4.19l-11.38-11.41c-1.16-1.16-3.03-1.16-4.19,0l-64.85,64.54c-1.88,1.87-.55,5.07,2.09,5.07Z" />
            </g>
            <path style={{ fill: '#ed1c24' }} d="M349.63,40.91l-11.09-10.84c-1.34-1.32-3.61-.36-3.61,1.52v14.77c0,1.17.95,2.12,2.12,2.12h11.09c1.17,0,2.12-.95,2.12-2.12v-3.93c0-.57-.23-1.12-.64-1.52Z" />
            <g>
                <path style={{ fill: '#ed1c24' }} d="M387.96,56.95h-4.76c-.54,0-.81.66-.43,1.04l13.27,13.31c.24.24.62.24.86,0l2.4-2.39c.24-.24.24-.62,0-.86l-10.92-10.92c-.11-.11-.27-.18-.43-.18Z" />
                <path style={{ fill: '#ed1c24' }} d="M414.75,83.49l-11.39-11.39c-.24-.24-.62-.24-.86,0l-2.4,2.4c-.24.24-.24.62,0,.86l8.97,9c.11.11.27.18.43.18h4.82c.54,0,.81-.66.43-1.04Z" />
                <path style={{ fill: '#ed1c24' }} d="M414.27,58.86l-4.58-.04c-.16,0-.32.06-.44.18l-9.08,9.04c-.24.24-.24.62,0,.86l2.33,2.33c.24.24.62.24.86,0l11.33-11.33c.38-.38.11-1.04-.43-1.04Z" />
                <path style={{ fill: '#ed1c24' }} d="M383.13,86.46h4.75c.16,0,.32-.06.43-.18l10.92-10.92c.24-.24.24-.62,0-.86l-2.34-2.35c-.24-.24-.62-.24-.86,0l-13.33,13.27c-.39.38-.11,1.04.43,1.04Z" />
            </g>
        </svg>
    );
};

const CertificateTemplate = forwardRef(({ certData, studentName, studentId }, ref) => {
    if (!certData) return null;

    return (
        <div
            ref={ref}
            id="certificate-render"
            style={{
                width: '1000px',
                height: '700px',
                padding: '40px',
                backgroundColor: '#050505',
                color: '#fff',
                position: 'fixed',
                left: '-9999px',
                top: 0,
                fontFamily: "'Inter', sans-serif",
                border: '20px solid #111',
                boxSizing: 'border-box'
            }}
        >
            <div style={{
                height: '100%',
                border: '2px solid #d32f2f50',
                padding: '60px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    border: '1px solid #d32f2f20',
                    borderRadius: '50%',
                }} />

                {/* Top Left Branding */}
                <div style={{
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: 0.8
                }}>
                    <EventrixLogo height={24} />
                </div>

                <div style={{ marginBottom: '25px', color: '#d32f2f' }}>
                    <Award size={90} strokeWidth={1} />
                </div>

                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '300',
                    letterSpacing: '8px',
                    textTransform: 'uppercase',
                    marginBottom: '15px'
                }}>
                    Certificate
                </h1>
                <p style={{ color: '#888', fontStyle: 'italic', marginBottom: '50px', fontSize: '1.1rem' }}>
                    of Participation and Achievement
                </p>

                <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '15px' }}>This is to certify that</p>
                <h2 style={{
                    fontSize: '3.5rem',
                    fontWeight: '700',
                    color: '#fff',
                    marginBottom: '15px',
                    borderBottom: '3px solid #d32f2f',
                    paddingBottom: '10px'
                }}>
                    {studentName}
                </h2>
                <p style={{ color: '#888', marginBottom: '50px', fontSize: '1.1rem' }}>ID: {studentId}</p>

                <p style={{ textAlign: 'center', maxWidth: '600px', lineHeight: '1.8', color: '#aaa', marginBottom: '60px', fontSize: '1.1rem' }}>
                    has successfully participated in the event <br />
                    <strong style={{ color: '#fff', fontSize: '1.4rem' }}>"{certData.title}"</strong>, held on {certData.issueDate}.
                </p>

                {/* Bottom Section Layout */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: 'auto',
                    padding: '0 20px'
                }}>
                    {/* Signatures Group */}
                    <div style={{ display: 'flex', gap: '60px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '180px', borderBottom: '1px solid #333', marginBottom: '10px' }}></div>
                            <p style={{ fontSize: '0.8rem', color: '#666' }}>Director, Eventrix</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: '180px', borderBottom: '1px solid #333', marginBottom: '10px' }}></div>
                            <p style={{ fontSize: '0.8rem', color: '#666' }}>Event Coordinator</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '30px' }}>
                        {/* QR Code */}
                        <div style={{ padding: '4px', backgroundColor: '#fff', borderRadius: '4px', display: 'flex' }}>
                            <QRCodeSVG
                                value={`Certificate ID: ${certData.id}\nName: ${studentName}\nEvent: ${certData.title}`}
                                size={60}
                                level="L"
                            />
                        </div>

                        {/* Certificate ID */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '0.6rem', color: '#444', letterSpacing: '2px', marginBottom: '2px' }}>CERTIFICATE ID</p>
                                <p style={{ fontSize: '0.75rem', color: '#666', fontWeight: 'bold' }}>{certData.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badge Bottom Left */}
                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    opacity: 0.3
                }}>
                    <ShieldCheck size={20} color="#d32f2f" />
                    <span style={{ fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px' }}>VERIFIED BY EVENTRIX</span>
                </div>
            </div>
        </div>
    );
});

export default CertificateTemplate;
