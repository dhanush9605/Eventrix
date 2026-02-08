import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Download, UserPlus, ChevronDown, ChevronLeft, ChevronRight, UserCheck, ShieldOff, Clock, Search, X } from 'lucide-react';

const AdminUserManagement = () => {
    // Mock Data Generator
    const generateInitialUsers = () => [
        { id: 1, name: 'Alexander Bennett', email: 'a.bennett@college.edu', role: 'STUDENT', dept: 'Computer Science', status: 'Active' },
        { id: 2, name: 'Dr. Sarah Jenkins', email: 's.jenkins@faculty.edu', role: 'FACULTY', dept: 'Applied Arts', status: 'Active' },
        { id: 3, name: 'Michael Thompson', email: 'm.thompson@admin.edu', role: 'ADMIN', dept: 'Central Administration', status: 'Active' },
        { id: 4, name: 'Jessica Williams', email: 'j.williams@college.edu', role: 'STUDENT', dept: 'Mechanical Engineering', status: 'Blocked' },
        { id: 5, name: 'David Chen', email: 'd.chen@college.edu', role: 'STUDENT', dept: 'Physics', status: 'Active' },
        { id: 6, name: 'Emily Davis', email: 'e.davis@faculty.edu', role: 'FACULTY', dept: 'Mathematics', status: 'Pending' },
        { id: 7, name: 'Robert Wilson', email: 'r.wilson@admin.edu', role: 'ADMIN', dept: 'Finance', status: 'Active' },
        { id: 8, name: 'Samantha Brown', email: 's.brown@college.edu', role: 'STUDENT', dept: 'Chemistry', status: 'Active' }
    ];

    const [users, setUsers] = useState(generateInitialUsers());
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [filteredUsers, setFilteredUsers] = useState(users);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'STUDENT', dept: '', status: 'Active' });

    // Stats calculation
    const activeCount = users.filter(u => u.status === 'Active').length;
    const blockedCount = users.filter(u => u.status === 'Blocked').length;
    const pendingCount = users.filter(u => u.status === 'Pending').length;

    const stats = [
        { label: 'ACTIVE ACCOUNTS', value: activeCount, icon: UserCheck, color: '#00c853', bg: '#00c85310' },
        { label: 'BLOCKED ACCOUNTS', value: blockedCount, icon: ShieldOff, color: '#d32f2f', bg: '#d32f2f10' },
        { label: 'PENDING VERIFICATION', value: pendingCount, icon: Clock, color: '#2979ff', bg: '#2979ff10' }
    ];

    // Filter Logic
    useEffect(() => {
        let result = users;

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(user =>
                user.name.toLowerCase().includes(lowerTerm) ||
                user.email.toLowerCase().includes(lowerTerm)
            );
        }

        if (roleFilter !== 'All') {
            result = result.filter(user => user.role === roleFilter.toUpperCase());
        }

        if (statusFilter !== 'All') {
            result = result.filter(user => user.status === statusFilter);
        }

        setFilteredUsers(result);
    }, [users, searchTerm, roleFilter, statusFilter]);

    // Actions
    const handleAddUser = (e) => {
        e.preventDefault();
        const id = users.length + 1;
        setUsers([...users, { ...newUser, id }]);
        setShowAddModal(false);
        setNewUser({ name: '', email: '', role: 'STUDENT', dept: '', status: 'Active' });
    };

    const handleBlockToggle = (id) => {
        setUsers(users.map(user => {
            if (user.id === id) {
                return { ...user, status: user.status === 'Blocked' ? 'Active' : 'Blocked' };
            }
            return user;
        }));
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    return (
        <DashboardLayout role="admin" title="User Management">
            {showAddModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', width: '400px', maxWidth: '90%' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#333' }}>Add New User</h3>
                        <form onSubmit={handleAddUser}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444' }}>Full Name</label>
                                <input
                                    type="text" required
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444' }}>Email Address</label>
                                <input
                                    type="email" required
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444' }}>Role</label>
                                <select
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
                                >
                                    <option value="STUDENT">Student</option>
                                    <option value="FACULTY">Faculty</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#444' }}>Department</label>
                                <input
                                    type="text" required
                                    value={newUser.dept}
                                    onChange={e => setNewUser({ ...newUser, dept: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                                <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: 'none', backgroundColor: '#d32f2f', color: '#fff', cursor: 'pointer', fontWeight: '600' }}>Add User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ marginBottom: '3rem' }}>
                <p style={{ color: '#666', fontSize: '0.9rem', maxWidth: '600px' }}>
                    Manage system users, adjust roles, and monitor account statuses across all departments.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '-2rem', justifyContent: 'flex-end' }}>
                    <button style={{ backgroundColor: '#111', border: '1px solid #222', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <Download size={16} /> Export CSV
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="btn btn-primary"
                        style={{ padding: '10px 20px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', border: 'none' }}
                    >
                        <UserPlus size={16} /> Add New User
                    </button>
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
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #f9f9f9', color: '#333', fontSize: '0.85rem' }}>
                                    <td style={{ padding: '1.25rem 2rem' }}>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#eee' }}>
                                                <img src={`https://i.pravatar.cc/150?u=${user.email}`} alt="" referrerPolicy="no-referrer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                                            <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}>EDIT ROLE</button>
                                            <span style={{ color: '#eee' }}>|</span>
                                            <button
                                                onClick={() => handleBlockToggle(user.id)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: user.status === 'Blocked' ? '#00c853' : '#d32f2f',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {user.status === 'Blocked' ? 'UNBLOCK' : 'BLOCK'}
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

                {/* Table Footer */}
                <div style={{ backgroundColor: '#fff', padding: '1.5rem 2rem', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#999' }}>SHOWING <strong style={{ color: '#333' }}>{filteredUsers.length}</strong> OF {users.length} USERS</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{ border: '1px solid #eee', background: 'none', padding: '6px', borderRadius: '4px', color: '#ccc' }}><ChevronLeft size={16} /></button>
                        <button style={{ backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold' }}>1</button>
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

export default AdminUserManagement;
