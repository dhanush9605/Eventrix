import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEvents } from '../../context/EventContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Camera, CheckCircle, XCircle, Search, AlertCircle, RefreshCw } from 'lucide-react';

const FacultyScanner = () => {
    const { events, markAttendance } = useEvents();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [scanResult, setScanResult] = useState(null); // { success: boolean, message: string, studentName?: string }
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        let scanner = null;

        function onScanSuccess(decodedText) {
            // decodedText should be the studentId
            const result = markAttendance(selectedEvent._id, decodedText);
            setScanResult(result);
            setIsScanning(false); // Stop scanning after success/error to show result
        }

        function onScanFailure() {
            // We usually don't want to show every failure (e.g. "no QR code found in frame")
            // but we could log it or show a subtle indicator
        }

        if (isScanning && selectedEvent) {
            scanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                /* verbose= */ false
            );

            scanner.render(onScanSuccess, onScanFailure);
        }

        return () => {
            if (scanner) {
                scanner.clear().catch(error => {
                    console.error("Failed to clear scanner", error);
                });
            }
        };
    }, [isScanning, selectedEvent, markAttendance]);

    const resetScanner = () => {
        setScanResult(null);
        setIsScanning(true);
    };

    const facultyEvents = events; // In a real app, filter events created by this faculty

    return (
        <DashboardLayout role="faculty" title="Attendance Scanner">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {!selectedEvent ? (
                    <div style={{ backgroundColor: '#0a0505', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Search size={20} color="#d32f2f" /> Select Event to Scan Attendance
                        </h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {facultyEvents.length > 0 ? facultyEvents.map(event => (
                                <button
                                    key={event._id}
                                    onClick={() => setSelectedEvent(event)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '4px',
                                        textAlign: 'left',
                                        padding: '1.25rem',
                                        backgroundColor: '#111',
                                        border: '1px solid #222',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#d32f2f'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#222'}
                                >
                                    <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>{event.title}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#666' }}>{event.date} • {event.location}</span>
                                    <span style={{ fontSize: '0.7rem', color: '#d32f2f', marginTop: '4px' }}>{event.attendance?.length || 0} Attended</span>
                                </button>
                            )) : (
                                <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No events found. Create an event first.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div style={{ textAlign: 'left' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{selectedEvent.title}</h2>
                                <p style={{ fontSize: '0.8rem', color: '#666' }}>Scanning attendance...</p>
                            </div>
                            <button
                                onClick={() => { setSelectedEvent(null); setScanResult(null); setIsScanning(false); }}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: '1px solid #333',
                                    color: '#888',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Change Event
                            </button>
                        </div>

                        {scanResult ? (
                            <div style={{
                                backgroundColor: '#0a0505',
                                border: '1px solid #1a1a1a',
                                borderRadius: '16px',
                                padding: '3rem 2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1.5rem',
                                animation: 'fadeIn 0.3s ease'
                            }}>
                                {scanResult.success ? (
                                    <>
                                        <div style={{ padding: '20px', borderRadius: '50%', backgroundColor: '#4caf5015', color: '#4caf50' }}>
                                            <CheckCircle size={64} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Attendance Marked!</h3>
                                            <p style={{ fontSize: '1rem', color: '#fff' }}>{scanResult.studentName}</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ padding: '20px', borderRadius: '50%', backgroundColor: '#d32f2f15', color: '#d32f2f' }}>
                                            <XCircle size={64} />
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Scan Failed</h3>
                                            <p style={{ fontSize: '1rem', color: '#fff', maxWidth: '300px' }}>{scanResult.message}</p>
                                        </div>
                                    </>
                                )}

                                <button
                                    onClick={resetScanner}
                                    style={{
                                        marginTop: '1rem',
                                        backgroundColor: '#fff',
                                        color: '#000',
                                        border: 'none',
                                        padding: '12px 30px',
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <RefreshCw size={18} /> Scan Next Student
                                </button>
                            </div>
                        ) : (
                            <div style={{
                                backgroundColor: '#0a0505',
                                border: '1px solid #1a1a1a',
                                borderRadius: '16px',
                                padding: '1rem',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {!isScanning ? (
                                    <div style={{ padding: '4rem 2rem' }}>
                                        <Camera size={48} color="#333" style={{ marginBottom: '1.5rem' }} />
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>Scanner Ready</h3>
                                        <button
                                            onClick={() => setIsScanning(true)}
                                            style={{
                                                backgroundColor: '#d32f2f',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '12px 40px',
                                                borderRadius: '8px',
                                                fontWeight: 'bold',
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                boxShadow: '0 10px 20px rgba(211, 47, 47, 0.2)'
                                            }}
                                        >
                                            Start Camera
                                        </button>
                                    </div>
                                ) : (
                                    <div id="reader" style={{ width: '100%', border: 'none' }}></div>
                                )}

                                <div style={{
                                    marginTop: '1.5rem',
                                    padding: '1rem',
                                    backgroundColor: '#111',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    textAlign: 'left'
                                }}>
                                    <AlertCircle size={18} color="#d32f2f" />
                                    <p style={{ fontSize: '0.75rem', color: '#666', lineHeight: '1.4' }}>
                                        Position the student's profile QR code clearly in the square to mark attendance.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                #reader { border: none !important; }
                #reader img { display: none; }
                #reader__scan_region { background-color: #000 !important; }
                #reader__dashboard_section_csr button {
                    background-color: #222 !important;
                    color: white !important;
                    border: 1px solid #333 !important;
                    padding: 8px 16px !important;
                    border-radius: 4px !important;
                    cursor: pointer !important;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </DashboardLayout>
    );
};

export default FacultyScanner;
