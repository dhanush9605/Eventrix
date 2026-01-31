import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Download, UserPlus, ChevronDown, MoreHorizontal, ChevronLeft, ChevronRight, UserCheck, ShieldOff, Clock } from 'lucide-react';

const AdminUserManagement = () => {
    const stats = [
        { label: 'ACTIVE ACCOUNTS', value: '231', icon: UserCheck, color: '#00c853', bg: '#00c85310' },
        { label: 'BLOCKED ACCOUNTS', value: '17', icon: ShieldOff, color: '#d32f2f', bg: '#d32f2f10' },
        { label: 'PENDING VERIFICATION', value: '12', icon: Clock, color: '#2979ff', bg: '#2979ff10' }
    ];

    const users = [
        { name: 'Alexander Bennett', email: 'a.bennett@college.edu', role: 'STUDENT', dept: 'Computer Science', status: 'Active' },
        { name: 'Dr. Sarah Jenkins', email: 's.jenkins@faculty.edu', role: 'FACULTY', dept: 'Applied Arts', status: 'Active' },
        { name: 'Michael Thompson', email: 'm.thompson@admin.edu', role: 'ADMIN', dept: 'Central Administration', status: 'Active' },
        { name: 'Jessica Williams', email: 'j.williams@college.edu', role: 'STUDENT', dept: 'Mechanical Engineering', status: 'Blocked' }
    ];

    return (
        <DashboardLayout role="admin" title="User Management">
            <div style={{ marginBottom: '3rem' }}>
                <p style={{ color: '#666', fontSize: '0.9rem', maxWidth: '600px' }}>
                    Manage system users, adjust roles, and monitor account statuses across all departments.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '-2rem', justifyContent: 'flex-end' }}>
                    <button style={{ backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={16} /> Export CSV
                    </button>
                    <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', border: 'none' }}>
                        <UserPlus size={16} /> Add New User
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search by name, email, or student ID..."
                            style={{ width: '100%', backgroundColor: '#050505', border: '1px solid #111', padding: '12px 1rem', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
                        />
                    </div>
                </div>
                <FilterSelect label="Role: All" />
                <FilterSelect label="Status: All" />
                <FilterSelect label="Department" hasIcon />
            </div>

            {/* User Table Header */}
            <div style={{ backgroundColor: '#fff', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0' }}>
                        <tr style={{ color: '#888', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <th style={{ padding: '1.5rem 2rem' }}>User Details</th>
                            <th style={{ padding: '1.5rem' }}>Role</th>
                            <th style={{ padding: '1.5rem' }}>Department</th>
                            <th style={{ padding: '1.5rem' }}>Status</th>
                            <th style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f9f9f9', color: '#333', fontSize: '0.85rem' }}>
                                <td style={{ padding: '1.25rem 2rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#eee' }}>
                                            <img src={`https://i.pravatar.cc/150?u=${user.name}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div>
                                            <span style={{ display: 'block', fontWeight: 'bold' }}>{user.name}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#999' }}>{user.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1.5rem' }}>
                                    <span style={{
                                        fontSize: '0.6rem',
                                        fontWeight: '800',
                                        backgroundColor: user.role === 'ADMIN' ? '#fff5f5' : user.role === 'FACULTY' ? '#f5f5ff' : '#f0f9ff',
                                        color: user.role === 'ADMIN' ? '#d32f2f' : user.role === 'FACULTY' ? '#2979ff' : '#0398f4',
                                        padding: '4px 10px',
                                        borderRadius: '100px'
                                    }}>{user.role}</span>
                                </td>
                                <td style={{ padding: '1.5rem', color: '#666' }}>{user.dept}</td>
                                <td style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: user.status === 'Active' ? '#00c853' : '#d32f2f' }}></span>
                                        <span style={{ fontWeight: '600', color: user.status === 'Active' ? '#00c853' : '#d32f2f', fontSize: '0.8rem' }}>{user.status}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                        <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}>EDIT ROLE</button>
                                        <span style={{ color: '#eee' }}>|</span>
                                        <button style={{ background: 'none', border: 'none', color: user.status === 'Active' ? '#d32f2f' : '#00c853', cursor: 'pointer' }}>
                                            {user.status === 'Active' ? 'BLOCK' : 'UNBLOCK'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Table Footer */}
                <div style={{ backgroundColor: '#fff', padding: '1.5rem 2rem', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#999' }}>SHOWING <strong style={{ color: '#333' }}>1 TO 4</strong> OF 248 USERS</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{ border: '1px solid #eee', background: 'none', padding: '6px', borderRadius: '4px', color: '#ccc' }}><ChevronLeft size={16} /></button>
                        <button style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' }}>1</button>
                        <button style={{ border: '1px solid #eee', background: 'none', padding: '6px 12px', borderRadius: '4px', color: '#666' }}>2</button>
                        <button style={{ border: '1px solid #eee', background: 'none', padding: '6px 12px', borderRadius: '4px', color: '#666' }}>3</button>
                        <button style={{ border: '1px solid #eee', background: 'none', padding: '6px', borderRadius: '4px', color: '#666' }}><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem' }}>
                {stats.map((s, i) => (
                    <div key={i} style={{ backgroundColor: '#0a0a0a', border: '1px solid #111', borderRadius: '16px', padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: s.bg, color: s.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <s.icon size={24} />
                        </div>
                        <div>
                            <span style={{ display: 'block', fontSize: '0.65rem', color: '#444', fontWeight: '800', marginBottom: '4px' }}>{s.label}</span>
                            <span style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{s.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
};

const FilterSelect = ({ label, hasIcon }) => (
    <button style={{
        backgroundColor: '#050505',
        border: '1px solid #111',
        padding: '12px 1.5rem',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer'
    }}>
        {label}
        {hasIcon ? <Download size={14} style={{ transform: 'rotate(180deg)' }} /> : <ChevronDown size={14} />}
    </button>
);

export default AdminUserManagement;
