import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEvents } from '../../context/EventContext';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Camera, CheckCircle, XCircle, Search, AlertCircle, RefreshCw, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

const FacultyScanner = () => {
    const { events, markAttendance, fetchEventDetails } = useEvents();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [detailedEvent, setDetailedEvent] = useState(null);
    const [scanResult, setScanResult] = useState(null); // { success: boolean, message: string, studentName?: string }
    const [isScanning, setIsScanning] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const isProcessingRef = React.useRef(false); // keep ref for immediate sync check

    const loadEventDetails = React.useCallback(async () => {
        const result = await fetchEventDetails(selectedEvent._id);
        if (result.success) {
            setDetailedEvent(result.data);
        }
    }, [fetchEventDetails, selectedEvent?._id]);

    useEffect(() => {
        if (selectedEvent) {
            loadEventDetails();
        } else {
            setDetailedEvent(null);
        }
    }, [selectedEvent, loadEventDetails]);

    useEffect(() => {
        let scanner = null;

        async function onScanSuccess(decodedText) {
            // Prevent duplicate triggers in the exact same millisecond
            if (isProcessingRef.current) return;
            isProcessingRef.current = true;

            // Instantly unmount the scanner from the DOM to physically prevent another read
            setIsScanning(false);
            setIsProcessing(true);

            try {
                // decodedText should be the studentId
                const result = await markAttendance(selectedEvent._id, decodedText);
                setScanResult(result);
                if (result.success) {
                    await loadEventDetails(); // Refresh the populated list
                }
            } finally {
                setIsProcessing(false);
                isProcessingRef.current = false;
            }
        }

        function onScanFailure() {
            // We usually don't want to show every failure (e.g. "no QR code found in frame")
            // but we could log it or show a subtle indicator
        }

        if (isScanning && selectedEvent && !isProcessing) {
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
    }, [isScanning, isProcessing, selectedEvent, markAttendance, loadEventDetails]);

    const resetScanner = () => {
        setScanResult(null);
        setIsProcessing(false);
        isProcessingRef.current = false;
        setIsScanning(true);
    };

    const exportToExcel = () => {
        if (!detailedEvent || !detailedEvent.attendance || detailedEvent.attendance.length === 0) {
            alert("No attendance data to export.");
            return;
        }

        const workbook = XLSX.utils.book_new();

        // 1. Create Event Details Sheet
        const eventDetailsData = [
            { Field: 'Event Title', Value: detailedEvent.title },
            { Field: 'Category', Value: detailedEvent.category },
            { Field: 'Date', Value: detailedEvent.date },
            { Field: 'Time', Value: detailedEvent.time },
            { Field: 'Location', Value: detailedEvent.location },
            { Field: 'Total Attended', Value: detailedEvent.attendance.length }
        ];
        const detailsSheet = XLSX.utils.json_to_sheet(eventDetailsData);
        XLSX.utils.book_append_sheet(workbook, detailsSheet, "Event Details");

        // 2. Create Attendance Sheet
        const attendanceData = detailedEvent.attendance.map(att => ({
            Name: att.studentName || 'Unknown',
            'Student ID': att.studentId,
            Department: att.department || 'Unknown',
            Year: att.year || 'Unknown',
            'Time Marked': new Date(att.markedAt).toLocaleString()
        }));
        const attendanceSheet = XLSX.utils.json_to_sheet(attendanceData);
        XLSX.utils.book_append_sheet(workbook, attendanceSheet, "Attendance List");

        // Format filename: EventName_Attendance.xlsx
        const fileName = `${selectedEvent.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_attendance.xlsx`;
        XLSX.writeFile(workbook, fileName);
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

                        {/* Attendance List */}
                        {detailedEvent && detailedEvent.attendance && detailedEvent.attendance.length > 0 && (
                            <div style={{ marginTop: '2rem', textAlign: 'left', backgroundColor: '#0a0505', border: '1px solid #1a1a1a', borderRadius: '16px', padding: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', margin: 0 }}>
                                        <CheckCircle size={18} color="#4caf50" /> Successfully Marked ({detailedEvent.attendance.length})
                                    </h3>
                                    <button
                                        onClick={exportToExcel}
                                        style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}
                                    >
                                        <Download size={14} /> Export Data
                                    </button>
                                </div>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                        <thead>
                                            <tr style={{ color: '#666', borderBottom: '1px solid #222', textAlign: 'left' }}>
                                                <th style={{ padding: '10px 8px' }}>Name</th>
                                                <th style={{ padding: '10px 8px' }}>Student ID</th>
                                                <th style={{ padding: '10px 8px', textAlign: 'right' }}>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...detailedEvent.attendance].sort((a, b) => new Date(b.markedAt) - new Date(a.markedAt)).map((att, idx) => (
                                                <tr key={idx} style={{ borderBottom: '1px solid #1a1a1a' }}>
                                                    <td style={{ padding: '10px 8px', color: '#fff' }}>{att.studentName || 'Unknown'}</td>
                                                    <td style={{ padding: '10px 8px', color: '#888' }}>{att.studentId}</td>
                                                    <td style={{ padding: '10px 8px', color: '#888', textAlign: 'right' }}>{new Date(att.markedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
