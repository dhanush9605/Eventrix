import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Calendar, MapPin, Clock, Filter, Search } from 'lucide-react';

const StudentEvents = () => {
    const [filter, setFilter] = useState('all');

    const events = [
        {
            id: 1,
            title: 'AI Workshop 2024',
            date: 'Oct 24, 2024',
            time: '10:00 AM - 12:00 PM',
            location: 'Main Auditorium',
            category: 'Workshop',
            status: 'Live',
            image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=400&auto=format&fit=crop',
            description: 'Dive deep into the world of Artificial Intelligence with industry experts.'
        },
        {
            id: 2,
            title: 'Annual Tech Symposium',
            date: 'Oct 24, 2024',
            time: '09:00 AM - 05:00 PM',
            location: 'Virtual Hall A',
            category: 'Conference',
            status: 'Live',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop',
            description: 'A day filled with talks, panels, and networking opportunities for tech enthusiasts.'
        },
        {
            id: 3,
            title: 'Hackathon Finals',
            date: 'Oct 25, 2024',
            time: '10:00 AM',
            location: 'Innovation Lab',
            category: 'Competition',
            status: 'Upcoming',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400&auto=format&fit=crop',
            description: 'Witness the top teams compete for the grand prize in our annual hackathon.'
        },
        {
            id: 4,
            title: 'Web3 Fundamentals',
            date: 'Oct 28, 2024',
            time: '02:00 PM',
            location: 'Room 304',
            category: 'Seminar',
            status: 'Upcoming',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=400&auto=format&fit=crop',
            description: 'Understanding the building blocks of the decentralized web.'
        },
        {
            id: 5,
            title: 'Career Fair Spring',
            date: 'Nov 05, 2024',
            time: '09:00 AM',
            location: 'University Grounds',
            category: 'Career',
            status: 'Upcoming',
            image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop',
            description: 'Connect with top employers and explore internship opportunities.'
        },
        {
            id: 6,
            title: 'Intro to Robotics',
            date: 'Sep 15, 2024',
            time: 'Completed',
            location: 'Lab 2',
            category: 'Workshop',
            status: 'Past',
            image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop',
            description: 'Hands-on workshop on building your first robot.'
        }
    ];

    const filteredEvents = filter === 'all'
        ? events
        : events.filter(e => e.status.toLowerCase() === filter.toLowerCase());

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'live': return '#d32f2f';
            case 'upcoming': return '#2196f3';
            case 'past': return '#666';
            default: return '#666';
        }
    };

    return (
        <DashboardLayout role="student" title="Events Directory">
            {/* Filters and Controls */}
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {['all', 'live', 'upcoming', 'past'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '100px',
                                border: filter === f ? '1px solid #d32f2f' : '1px solid #333',
                                backgroundColor: filter === f ? '#d32f2f15' : '#0a0a0a',
                                color: filter === f ? '#d32f2f' : '#666',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                textTransform: 'capitalize',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.9rem' }}>
                    <Filter size={16} />
                    <span>Sort by: Date</span>
                </div>
            </div>

            {/* Events Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {filteredEvents.map(event => (
                    <div key={event.id} style={{
                        backgroundColor: '#0a0505',
                        border: '1px solid #1a1a1a',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ position: 'relative', height: '160px' }}>
                            <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                            <div style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontSize: '0.65rem',
                                fontWeight: 'bold',
                                border: `1px solid ${getStatusColor(event.status)}`,
                                color: getStatusColor(event.status),
                                textTransform: 'uppercase'
                            }}>
                                {event.status === 'Live' && <span style={{ marginRight: '6px' }}>●</span>}
                                {event.status}
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                background: 'linear-gradient(to top, #0a0505, transparent)',
                                padding: '20px 1.5rem 10px',
                            }}>
                                <span style={{ fontSize: '0.7rem', color: '#ccc', backgroundColor: '#333', padding: '2px 8px', borderRadius: '4px' }}>{event.category}</span>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: 'auto' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>{event.title}</h3>
                                <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem', lineHeight: '1.5' }}>{event.description}</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                        <Calendar size={16} /> <span>{event.date}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                        <Clock size={16} /> <span>{event.time}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#666', fontSize: '0.85rem' }}>
                                        <MapPin size={16} /> <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>

                            <button style={{
                                marginTop: '1.5rem',
                                width: '100%',
                                padding: '12px',
                                backgroundColor: event.status === 'Past' ? '#1a1a1a' : '#fff',
                                color: event.status === 'Past' ? '#666' : '#000',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                fontSize: '0.85rem',
                                cursor: event.status === 'Past' ? 'default' : 'pointer',
                                opacity: event.status === 'Past' ? 0.7 : 1
                            }}>
                                {event.status === 'Live' ? 'Join Now' : event.status === 'Past' ? 'Event Ended' : 'Register Now'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
};

export default StudentEvents;
