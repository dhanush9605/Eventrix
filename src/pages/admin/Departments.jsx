import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Building } from 'lucide-react';

const AdminDepartments = () => {
    return (
        <DashboardLayout role="admin" title="Departments">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#444' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#111', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <Building size={40} color="#333" />
                </div>
                <h2 style={{ color: '#fff', marginBottom: '0.5rem' }}>Department Management</h2>
                <p>Manage campus departments and faculty allocation here.</p>
                <span style={{ marginTop: '2rem', fontSize: '0.8rem', padding: '8px 16px', backgroundColor: '#1a1a1a', borderRadius: '100px', color: '#888' }}>COMING SOON</span>
            </div>
        </DashboardLayout>
    );
};

export default AdminDepartments;
