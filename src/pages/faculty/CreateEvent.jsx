import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useEvents } from '../../context/EventContext';
import {
    Calendar,
    MapPin,
    Users,
    Info,
    DollarSign,
    CreditCard,
    Upload,
    ChevronRight,
    Loader2
} from 'lucide-react';

const CreateEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL if editing
    const { addEvent, updateEvent, getEventById } = useEvents(); // Assuming getEventById is available and synchronous enough or we fetch
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Technical',
        date: '',
        time: '',
        location: '',
        description: '',
        maxParticipants: '',
        deadline: '',
        isPaid: false,
        fee: '',
        upiId: '',
        paymentQr: null,
        bannerImage: null
    });

    const [qrPreview, setQrPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    // Fetch data if editing
    React.useEffect(() => {
        if (id) {
            const event = getEventById(id);
            if (event) {
                setFormData({
                    title: event.title,
                    category: event.category,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    description: event.description,
                    maxParticipants: event.maxParticipants,
                    deadline: event.deadline,
                    isPaid: event.isPaid,
                    fee: event.fee || '',
                    upiId: event.upiId || '',
                    paymentQr: event.paymentQr, // Keep url
                    bannerImage: event.bannerImage // Keep url
                });
                setBannerPreview(event.bannerImage);
                setQrPreview(event.paymentQr);
                setFetching(false);
            } else {
                // If not found in context (reloaded page), might need to fetch from API or redirect
                // For simplicity, let's assume context has it or we redirect
                // Ideally useEvents should have a fetchEventById async function
                setFetching(false);
            }
        }
    }, [id, getEventById]);

    const [bannerFile, setBannerFile] = useState(null);
    const [qrFile, setQrFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            // Store file for upload
            if (field === 'paymentQr') {
                setQrFile(file);
            } else if (field === 'bannerImage') {
                setBannerFile(file);
            }

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                if (field === 'paymentQr') {
                    setQrPreview(reader.result);
                } else if (field === 'bannerImage') {
                    setBannerPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            // Append text fields
            Object.keys(formData).forEach(key => {
                // Don't append existing URLs as strings if we are sending files
                // But we DO need to keep them if no new file is selected.
                // However, our backend checks req.files. If not present, it leaves existing.
                // So we just need to append text fields.
                if (key !== 'bannerImage' && key !== 'paymentQr') {
                    data.append(key, formData[key]);
                }
            });

            // Append files ONLY if they are new File objects
            if (bannerFile) {
                data.append('bannerImage', bannerFile);
            }
            if (qrFile) {
                data.append('paymentQr', qrFile);
            }

            let result;
            if (id) {
                result = await updateEvent(id, data);
            } else {
                result = await addEvent(data);
            }

            if (result.success) {
                navigate('/faculty/manage-events');
            } else {
                alert(result.message || "Failed to save event");
            }
        } catch (error) {
            console.error("Error saving event:", error);
            alert("Something went wrong while saving the event.");
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem'
    };

    const cardStyle = {
        backgroundColor: '#0a0a0a',
        border: '1px solid #1a1a1a',
        borderRadius: '16px',
        padding: '2.5rem',
        marginBottom: '2rem'
    };

    const inputGroupStyle = {
        marginBottom: '1.5rem'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.75rem',
        fontWeight: '700',
        color: '#666',
        marginBottom: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    };

    const inputStyle = {
        width: '100%',
        backgroundColor: '#050505',
        border: '1px solid #222',
        borderRadius: '8px',
        padding: '12px 16px',
        color: '#fff',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    };

    const sectionTitleStyle = {
        fontSize: '1.25rem',
        fontWeight: '800',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    };

    if (fetching) {
        return (
            <DashboardLayout role="faculty" title={id ? "Edit Event" : "Create New Event"}>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
                    <Loader2 className="animate-spin" size={32} />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="faculty" title={id ? "Edit Event" : "Create New Event"}>
            <div style={containerStyle}>
                <div style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '0.5rem' }}>
                        {id ? 'Edit Your Event' : 'Launch Your Event'}
                    </h2>
                    <p style={{ color: '#666' }}>
                        {id ? 'Update the details of your event below.' : 'Fill in the details below to broadcast your event to students.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <div style={cardStyle}>
                        <h3 style={sectionTitleStyle}>
                            <Info size={20} color="#d32f2f" /> Basic Information
                        </h3>

                        {/* Banner Image Upload */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={labelStyle}>Event Banner / Poster</label>
                            <div
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    border: '2px dashed #333',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#050505',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    backgroundImage: bannerPreview ? `url(${bannerPreview})` : 'none',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                                onClick={() => document.getElementById('banner-upload').click()}
                            >
                                {!bannerPreview && (
                                    <>
                                        <Upload size={32} color="#666" style={{ marginBottom: '12px' }} />
                                        <span style={{ fontSize: '0.9rem', color: '#888', fontWeight: 'bold' }}>Click to upload event banner</span>
                                        <span style={{ fontSize: '0.75rem', color: '#555' }}>Recommended size: 1200x600px (JPG/PNG)</span>
                                    </>
                                )}
                                <input
                                    id="banner-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'bannerImage')}
                                    style={{ display: 'none' }}
                                />
                                {bannerPreview && (
                                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.7)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Upload size={14} /> Change Image
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Event Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g. Annual Tech Symposium 2026"
                                style={inputStyle}
                                required
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}>Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                >
                                    <option>Technical</option>
                                    <option>Cultural</option>
                                    <option>Seminar</option>
                                    <option>Workshop</option>
                                    <option>Sports</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Max Participants</label>
                                <input
                                    type="number"
                                    name="maxParticipants"
                                    value={formData.maxParticipants}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 200"
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                placeholder="Describe what happens at this event..."
                                style={{ ...inputStyle, resize: 'none' }}
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Logistics */}
                    <div style={cardStyle}>
                        <h3 style={sectionTitleStyle}>
                            <Calendar size={20} color="#d32f2f" /> Logistics & Schedule
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                    required
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                    required
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={labelStyle}>Venue / Location</label>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Main Auditorium"
                                        style={{ ...inputStyle, paddingLeft: '40px' }}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Registration Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ ...sectionTitleStyle, marginBottom: 0 }}>
                                <DollarSign size={20} color="#d32f2f" /> Payment Details
                            </h3>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    name="isPaid"
                                    checked={formData.isPaid}
                                    onChange={handleInputChange}
                                    style={{ width: '18px', height: '18px', accentColor: '#d32f2f' }}
                                />
                                <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>This is a paid event</span>
                            </label>
                        </div>

                        {formData.isPaid && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div>
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>Registration Fee (₹)</label>
                                        <input
                                            type="number"
                                            name="fee"
                                            value={formData.fee}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 199"
                                            style={inputStyle}
                                            required
                                        />
                                    </div>
                                    <div style={inputGroupStyle}>
                                        <label style={labelStyle}>UPI ID</label>
                                        <div style={{ position: 'relative' }}>
                                            <CreditCard size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#444' }} />
                                            <input
                                                type="text"
                                                name="upiId"
                                                value={formData.upiId}
                                                onChange={handleInputChange}
                                                placeholder="username@bank"
                                                style={{ ...inputStyle, paddingLeft: '40px' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>Payment QR Code</label>
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '140px',
                                            border: '2px dashed #222',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            backgroundColor: '#050505',
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}
                                        onClick={() => document.getElementById('qr-upload').click()}
                                    >
                                        {qrPreview ? (
                                            <img src={qrPreview} alt="QR Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        ) : (
                                            <>
                                                <Upload size={24} color="#444" style={{ marginBottom: '8px' }} />
                                                <span style={{ fontSize: '0.75rem', color: '#444' }}>Upload QR (JPG/PNG)</span>
                                            </>
                                        )}
                                        <input
                                            id="qr-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, 'paymentQr')}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            backgroundColor: '#d32f2f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '1.25rem',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 8px 30px rgba(211, 47, 47, 0.3)'
                        }}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                {id ? 'Update Event' : 'Create Event'} <ChevronRight size={20} />
                            </>
                        )}
                    </button>

                    <p style={{ textAlign: 'center', color: '#444', fontSize: '0.75rem', marginTop: '1.5rem' }}>
                        By creating this event, you agree to follow the university event guidelines.
                    </p>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default CreateEvent;
