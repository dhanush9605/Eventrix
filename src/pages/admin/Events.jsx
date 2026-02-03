import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Calendar } from 'lucide-react';

const AdminEvents = () => {
    return (
        <DashboardLayout role="admin" title="Event Management">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#444' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <Calendar size={40} color="#333" />
                </div>
                <h2 style={{ color: '#fff', marginBottom: '0.5rem' }}>System Events</h2>
                <p>Oversee all campus events, approvals, and scheduling.</p>
                <span style={{ marginTop: '2rem', fontSize: '0.8rem', padding: '8px 16px', backgroundColor: '#1a1a1a', borderRadius: '100px', color: '#888' }}>COMING SOON</span>
            </div>
        </DashboardLayout>
    );
};

export default AdminEvents;
