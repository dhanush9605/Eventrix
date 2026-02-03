import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { BarChart3 } from 'lucide-react';

const AdminReports = () => {
    return (
        <DashboardLayout role="admin" title="Reports & Analytics">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#444' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <BarChart3 size={40} color="#333" />
                </div>
                <h2 style={{ color: '#fff', marginBottom: '0.5rem' }}>System Reports</h2>
                <p>Generate detailed insights and downloadable reports.</p>
                <span style={{ marginTop: '2rem', fontSize: '0.8rem', padding: '8px 16px', backgroundColor: '#1a1a1a', borderRadius: '100px', color: '#888' }}>COMING SOON</span>
            </div>
        </DashboardLayout>
    );
};

export default AdminReports;
