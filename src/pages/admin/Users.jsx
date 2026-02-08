import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Download, UserPlus, ChevronDown, ChevronLeft, ChevronRight, UserCheck, ShieldOff, Clock, Search, X } from 'lucide-react';
import { getUsers, updateUserStatus, deleteUser } from '../../services/api';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    // Stats
    const [stats, setStats] = useState({ active: 0, blocked: 0, pending: 0 });

    const fetchUsers = React.useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await getUsers({
                search: searchTerm,
                role: roleFilter,
                status: statusFilter
            });
            setUsers(data);

            setStats({
                active: data.filter(u => u.status === 'Active').length,
                blocked: data.filter(u => u.status === 'Blocked').length,
                pending: data.filter(u => u.status === 'Pending').length
            });

        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, roleFilter, statusFilter]);

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            fetchUsers();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, roleFilter, statusFilter, fetchUsers]);

    const handleBlockToggle = async (user) => {
        if (!window.confirm(`Are you sure you want to ${user.status === 'Blocked' ? 'unblock' : 'block'} this user?`)) return;
        try {
            const newStatus = user.status === 'Blocked' ? 'Active' : 'Blocked';
            await updateUserStatus(user._id, newStatus);
            fetchUsers(); // Refresh
        } catch (error) {
            console.error('Failed to update status', error);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                console.error('Failed to delete user', error);
                alert('Failed to delete user');
            }
        }
    };

    const statCards = [
        { label: 'ACTIVE ACCOUNTS', value: stats.active, icon: UserCheck, color: '#00c853', bg: '#00c85310' },
        { label: 'BLOCKED ACCOUNTS', value: stats.blocked, icon: ShieldOff, color: '#d32f2f', bg: '#d32f2f10' },
        { label: 'PENDING VERIFICATION', value: stats.pending, icon: Clock, color: '#2979ff', bg: '#2979ff10' }
    ];

    return (
        <DashboardLayout role="admin" title="User Management">

            <div style={{ marginBottom: '3rem' }}>
                <p style={{ color: '#666', fontSize: '0.9rem', maxWidth: '600px' }}>
                    Manage system users, adjust roles, and monitor account statuses across all departments.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '-2rem', justifyContent: 'flex-end' }}>
                    <button style={{ backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <Download size={16} /> Export CSV
                    </button>
                    {/* Add User Modal Logic can be re-added here if needed later, currently focusing on listing/managing existing */}
                </div>
            </div>

            {/* Filters Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} size={16} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', backgroundColor: '#050505', border: '1px solid #111', padding: '12px 1rem 12px 2.5rem', borderRadius: '8px', color: '#fff', fontSize: '0.85rem' }}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    style={{
                        backgroundColor: '#050505',
                        border: '1px solid #111',
                        padding: '0 1.5rem',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        outline: 'none',
                        height: '42px'
                    }}
                >
                    <option value="All">Role: All</option>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Admin">Admin</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                        backgroundColor: '#050505',
                        border: '1px solid #111',
                        padding: '0 1.5rem',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        outline: 'none',
                        height: '42px'
                    }}
                >
                    <option value="All">Status: All</option>
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>

            {/* User Table */}
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
                        {loading ? (
                            <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>Loading users...</td></tr>
                        ) : users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user._id} style={{ borderBottom: '1px solid #f9f9f9', color: '#333', fontSize: '0.85rem' }}>
                                    <td style={{ padding: '1.25rem 2rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#eee' }}>
                                                <img
                                                    src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                                                    alt=""
                                                    referrerPolicy="no-referrer"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div>
                                                <span style={{ display: 'block', fontWeight: 'bold' }}>{user.name}</span>
                                                <span style={{ fontSize: '0.7rem', color: '#999' }}>{user.email}</span>
                                                {user.studentId && <span style={{ fontSize: '0.65rem', color: '#bbb', display: 'block' }}>ID: {user.studentId}</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <span style={{
                                            fontSize: '0.6rem',
                                            fontWeight: '800',
                                            backgroundColor: user.role === 'admin' ? '#fff5f5' : user.role === 'faculty' ? '#f5f5ff' : '#f0f9ff',
                                            color: user.role === 'admin' ? '#d32f2f' : user.role === 'faculty' ? '#2979ff' : '#0398f4',
                                            padding: '4px 10px',
                                            borderRadius: '100px',
                                            textTransform: 'uppercase'
                                        }}>{user.role}</span>
                                    </td>
                                    <td style={{ padding: '1.5rem', color: '#666' }}>{user.department || '-'}</td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                backgroundColor: user.status === 'Active' ? '#00c853' : user.status === 'Blocked' ? '#d32f2f' : '#2979ff'
                                            }}></span>
                                            <span style={{
                                                fontWeight: '600',
                                                color: user.status === 'Active' ? '#00c853' : user.status === 'Blocked' ? '#d32f2f' : '#2979ff',
                                                fontSize: '0.8rem'
                                            }}>{user.status}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                            {/* <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}>EDIT</button> 
                                            <span style={{ color: '#eee' }}>|</span> */}
                                            <button
                                                onClick={() => handleBlockToggle(user)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: user.status === 'Blocked' ? '#00c853' : '#d32f2f',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {user.status === 'Blocked' ? 'UNBLOCK' : 'BLOCK'}
                                            </button>
                                            <span style={{ color: '#eee' }}>|</span>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>
                                    No users found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem' }}>
                {statCards.map((s, i) => (
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

export default AdminUserManagement;
