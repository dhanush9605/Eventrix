import React, { useState, useEffect } from 'react';

import DashboardLayout from '../../layouts/DashboardLayout';
import { Download, FileText } from 'lucide-react';
import { getAdminStatDetails } from '../../services/api';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

const AdminReports = () => {

    const [loading, setLoading] = useState(true);
    const [engagementData, setEngagementData] = useState([]);
    const [eventData, setEventData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [engRes, eventRes] = await Promise.all([
                    getAdminStatDetails('engagement'),
                    getAdminStatDetails('events')
                ]);
                // Removed unused data processing
                // setStats(statsRes.data);
                // setDepartmentData(deptRes.data);
                setEngagementData(engRes.data);
                setEventData(eventRes.data);
                // setUsersData(usersRes.data);

            } catch (error) {
                console.error('Error fetching reports:', error);
                toast.error('Failed to load report data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!loading) {
            console.log("Event Data Loaded:", eventData);
            // toast.success(`Loaded ${eventData.length} events`);
        }
    }, [loading, eventData]);


    const downloadExcel = () => {
        const wb = XLSX.utils.book_new();

        // 1. Department Performance
        const deptDataFormatted = engagementData.map(dept => ({
            "Department": dept.name,
            "Total Students": dept.totalStudents,
            "Participating Students": dept.activeStudents,
            "Participation %": `${dept.rate}%`
        }));
        const wsEng = XLSX.utils.json_to_sheet(deptDataFormatted);
        XLSX.utils.book_append_sheet(wb, wsEng, "Department Performance");

        // 2. Event Insights
        const eventDataFormatted = eventData.map(event => ({
            "Event Title": event.title,
            "Date": new Date(event.date).toLocaleDateString(),
            "Location": event.location,
            "Registrations": event.registeredCount || 0,
            "Status": event.status
        }));
        const wsEvents = XLSX.utils.json_to_sheet(eventDataFormatted);
        XLSX.utils.book_append_sheet(wb, wsEvents, "Event Insights");

        XLSX.writeFile(wb, "Eventrix_Detailed_Report_v2.xlsx"); // Versioned to force new file
        toast.success("Detailed report downloaded");
    };

    if (loading) {
        return (
            <DashboardLayout role="admin" title="Reports & Analytics">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#666' }}>
                    Loading analytics...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="admin" title="Reports & Analytics">
            <div style={{ paddingBottom: '2rem', position: 'relative' }}>
                {/* Header Controls */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem', gap: '1rem' }}>
                    <button
                        onClick={downloadExcel}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '8px 16px', borderRadius: '8px', border: '1px solid #333', cursor: 'pointer',
                            backgroundColor: '#0a0a0a', color: '#fff', fontWeight: '500'
                        }}
                    >
                        <Download size={16} /> Export
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Detailed Department Performance */}
                    <div style={{ backgroundColor: '#0a0a0a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #111' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Department Performance</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ccc', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #222', textAlign: 'left' }}>
                                        <th style={{ padding: '12px' }}>Department</th>
                                        <th style={{ padding: '12px' }}>Total Students</th>
                                        <th style={{ padding: '12px' }}>Participating Students</th>
                                        <th style={{ padding: '12px' }}>Participation %</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {engagementData.length > 0 ? (
                                        engagementData.map((dept, index) => (
                                            <tr key={index} style={{ borderBottom: '1px solid #111' }}>
                                                <td style={{ padding: '12px', color: '#fff', fontWeight: '500' }}>{dept.name}</td>
                                                <td style={{ padding: '12px' }}>{dept.totalStudents}</td>
                                                <td style={{ padding: '12px' }}>{dept.activeStudents}</td>
                                                <td style={{ padding: '12px', color: dept.rate > 50 ? '#00c853' : '#ff8042' }}>{dept.rate}%</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No department data available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Detailed Event Performance */}
                    <div style={{ backgroundColor: '#0a0a0a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #111' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Event Insights</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ccc', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #222', textAlign: 'left' }}>
                                        <th style={{ padding: '12px' }}>Event Title</th>
                                        <th style={{ padding: '12px' }}>Date</th>
                                        <th style={{ padding: '12px' }}>Location</th>
                                        <th style={{ padding: '12px' }}>Registrations</th>
                                        <th style={{ padding: '12px' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventData.length > 0 ? (
                                        eventData.map((event, index) => (
                                            <tr key={index} style={{ borderBottom: '1px solid #111' }}>
                                                <td style={{ padding: '12px', color: '#fff', fontWeight: '500' }}>{event.title}</td>
                                                <td style={{ padding: '12px' }}>{new Date(event.date).toLocaleDateString()}</td>
                                                <td style={{ padding: '12px' }}>{event.location}</td>
                                                <td style={{ padding: '12px' }}>{event.registeredCount || 0}</td>
                                                <td style={{ padding: '12px' }}>
                                                    <span style={{
                                                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold',
                                                        backgroundColor: event.status === 'Upcoming' ? 'rgba(0, 200, 83, 0.1)' : 'rgba(100, 100, 100, 0.1)',
                                                        color: event.status === 'Upcoming' ? '#00c853' : '#888'
                                                    }}>
                                                        {event.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                                                No events found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminReports;
