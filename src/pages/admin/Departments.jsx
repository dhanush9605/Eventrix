import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Building, Users, Calendar, ArrowLeft, Search, MapPin, ChevronRight, Clock } from 'lucide-react';
import { getDepartmentHierarchy } from '../../services/api';
import toast from 'react-hot-toast';

const AdminDepartments = () => {
    const [hierarchy, setHierarchy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewLevel, setViewLevel] = useState('departments'); // departments, faculty, events
    const [selectedDept, setSelectedDept] = useState(null);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchHierarchy();
    }, []);

    const fetchHierarchy = async () => {
        try {
            const { data } = await getDepartmentHierarchy();
            setHierarchy(data || []);
        } catch (error) {
            console.error('Error fetching hierarchy:', error);
            toast.error('Failed to load department data');
        } finally {
            setLoading(false);
        }
    };

    const handleDeptClick = (dept) => {
        setSelectedDept(dept);
        setViewLevel('faculty');
        setSearchTerm('');
    };

    const handleFacultyClick = (faculty) => {
        setSelectedFaculty(faculty);
        setViewLevel('events');
        setSearchTerm('');
    };

    const handleBack = () => {
        if (viewLevel === 'events') {
            setViewLevel('faculty');
            setSelectedFaculty(null);
        } else if (viewLevel === 'faculty') {
            setViewLevel('departments');
            setSelectedDept(null);
        }
        setSearchTerm('');
    };

    // Filter Logic
    const getFilteredData = () => {
        if (viewLevel === 'departments') {
            return hierarchy.filter(dept =>
                dept.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (viewLevel === 'faculty') {
            return selectedDept?.faculty.filter(fac =>
                fac.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) || [];
        }
        if (viewLevel === 'events') {
            return selectedFaculty?.events.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) || [];
        }
        return [];
    };

    const filteredData = getFilteredData();

    // Styles (using inline styles to match Users.jsx pattern)
    const cardStyle = {
        backgroundColor: '#0a0a0a',
        border: '1px solid #111',
        borderRadius: '16px',
        padding: '24px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '180px'
    };

    const iconBoxStyle = (color) => ({
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: `${color}15`, // 15% opacity
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px'
    });

    return (
        <DashboardLayout role="admin" title="Departments">
            <div>
                {/* Header & Navigation */}
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {viewLevel !== 'departments' && (
                        <button
                            onClick={handleBack}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#111',
                                border: '1px solid #222',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>
                            {viewLevel === 'departments' && 'Department Overview'}
                            {viewLevel === 'faculty' && selectedDept?.name}
                            {viewLevel === 'events' && `${selectedFaculty?.name}'s Events`}
                        </h2>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>
                            {viewLevel === 'departments' && 'Select a department to view faculty members and their events.'}
                            {viewLevel === 'faculty' && 'Select a faculty member to see the events they are conducting.'}
                            {viewLevel === 'events' && 'Viewing detailed event information.'}
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div style={{ marginBottom: '2rem', position: 'relative', maxWidth: '400px' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={18} />
                    <input
                        type="text"
                        placeholder={`Search ${viewLevel}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            backgroundColor: '#050505',
                            border: '1px solid #111',
                            padding: '12px 1rem 12px 2.5rem',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.9rem',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div style={{ color: '#666', textAlign: 'center', padding: '4rem' }}>Loading data...</div>
                ) : filteredData.length === 0 ? (
                    <div style={{ color: '#666', textAlign: 'center', padding: '4rem' }}>
                        No records found {searchTerm && `matching "${searchTerm}"`}.
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>

                        {/* Level 1: Departments */}
                        {viewLevel === 'departments' && filteredData.map((dept) => (
                            <div
                                key={dept.name}
                                onClick={() => handleDeptClick(dept)}
                                style={cardStyle}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={iconBoxStyle('#ff3d00')}>
                                            <Building size={24} />
                                        </div>
                                        <span style={{
                                            backgroundColor: '#1a1a1a',
                                            color: '#888',
                                            fontSize: '0.75rem',
                                            padding: '4px 8px',
                                            borderRadius: '100px',
                                            fontWeight: '600'
                                        }}>
                                            {dept.totalEvents} EVENTS
                                        </span>
                                    </div>
                                    <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>{dept.name}</h3>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', color: '#666', fontSize: '0.85rem' }}>
                                    <Users size={16} style={{ marginRight: '8px' }} />
                                    {dept.faculty.length} Faculty Members
                                </div>
                            </div>
                        ))}

                        {/* Level 2: Faculty */}
                        {viewLevel === 'faculty' && filteredData.map((fac) => (
                            <div
                                key={fac._id || fac.facultyId}
                                onClick={() => handleFacultyClick(fac)}
                                style={cardStyle}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={iconBoxStyle('#2979ff')}>
                                            <Users size={24} />
                                        </div>
                                        <span style={{
                                            backgroundColor: '#1a1a1a',
                                            color: '#888',
                                            fontSize: '0.75rem',
                                            padding: '4px 8px',
                                            borderRadius: '100px',
                                            fontWeight: '600'
                                        }}>
                                            {fac.events.length} EVENTS
                                        </span>
                                    </div>
                                    <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '4px' }}>{fac.name}</h3>
                                    <p style={{ color: '#666', fontSize: '0.8rem' }}>{fac.email}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '1rem', color: '#444' }}>
                                    <span style={{ fontSize: '0.8rem', marginRight: '6px' }}>View Events</span>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        ))}

                        {/* Level 3: Events */}
                        {viewLevel === 'events' && filteredData.map((event) => (
                            <div
                                key={event._id}
                                onClick={() => setSelectedEvent(event)}
                                style={{
                                    backgroundColor: '#0a0a0a',
                                    border: '1px solid #111',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <div style={{ height: '160px', backgroundColor: '#111', position: 'relative' }}>
                                    {event.bannerImage ? (
                                        <img
                                            src={event.bannerImage}
                                            alt={event.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#333' }}>
                                            <Calendar size={48} />
                                        </div>
                                    )}
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        color: '#fff',
                                        fontSize: '0.7rem',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold'
                                    }}>
                                        {event.category}
                                    </div>
                                </div>
                                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '12px' }}>{event.title}</h3>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', fontSize: '0.85rem', color: '#888' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={14} />
                                            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <MapPin size={14} />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{
                                            color: event.isPaid ? '#ffd700' : '#00c853',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem'
                                        }}>
                                            {event.isPaid ? `₹${event.fee}` : 'Free'}
                                        </span>
                                        <span style={{ color: '#666', fontSize: '0.8rem' }}>
                                            Click for Details
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}

                {/* Event Details Modal */}
                {selectedEvent && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }} onClick={() => setSelectedEvent(null)}>
                        <div style={{
                            backgroundColor: '#0a0a0a',
                            border: '1px solid #333',
                            borderRadius: '24px',
                            width: '100%',
                            maxWidth: '600px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            position: 'relative'
                        }} onClick={e => e.stopPropagation()}>

                            {/* Modal Header Image */}
                            <div style={{ height: '200px', backgroundColor: '#111', position: 'relative' }}>
                                {selectedEvent.bannerImage ? (
                                    <img
                                        src={selectedEvent.bannerImage}
                                        alt={selectedEvent.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#333' }}>
                                        <Calendar size={64} />
                                    </div>
                                )}
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        border: 'none',
                                        color: '#fff',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem'
                                    }}
                                >
                                    &times;
                                </button>
                            </div>

                            <div style={{ padding: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                    <div>
                                        <span style={{
                                            backgroundColor: '#2979ff15',
                                            color: '#2979ff',
                                            fontSize: '0.75rem',
                                            padding: '4px 12px',
                                            borderRadius: '100px',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }}>
                                            {selectedEvent.category}
                                        </span>
                                        <h2 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 'bold', marginTop: '12px' }}>
                                            {selectedEvent.title}
                                        </h2>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{
                                            color: selectedEvent.isPaid ? '#ffd700' : '#00c853',
                                            fontWeight: 'bold',
                                            fontSize: '1.25rem',
                                            display: 'block'
                                        }}>
                                            {selectedEvent.isPaid ? `₹${selectedEvent.fee}` : 'Free'}
                                        </span>
                                    </div>
                                </div>

                                <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '32px', whiteSpace: 'pre-wrap' }}>
                                    {selectedEvent.description}
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                                    <div>
                                        <label style={{ color: '#666', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Date & Time</label>
                                        <div style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Calendar size={18} />
                                            <span>
                                                {new Date(selectedEvent.date).toLocaleDateString()} <br />
                                                <span style={{ color: '#888', fontSize: '0.9rem' }}>{selectedEvent.time}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ color: '#666', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Location</label>
                                        <div style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <MapPin size={18} />
                                            <span>{selectedEvent.location}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ color: '#666', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Participants</label>
                                        <div style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Users size={18} />
                                            <span>
                                                {selectedEvent.registrations?.length || 0} / {selectedEvent.maxParticipants || 'Unlimited'} <br />
                                                <span style={{ color: '#888', fontSize: '0.9rem' }}>Registered</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ color: '#666', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Registration Deadline</label>
                                        <div style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Clock size={18} />
                                            <span>{selectedEvent.deadline ? new Date(selectedEvent.deadline).toLocaleDateString() : 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                {selectedEvent.isPaid && selectedEvent.paymentQr && (
                                    <div style={{ backgroundColor: '#111', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
                                        <label style={{ color: '#666', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Payment QR</label>
                                        <img
                                            src={selectedEvent.paymentQr}
                                            alt="Payment QR"
                                            style={{ width: '150px', height: '150px', objectFit: 'contain', borderRadius: '8px' }}
                                        />
                                        <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '12px' }}>
                                            UPI ID: {selectedEvent.upiId}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AdminDepartments;
