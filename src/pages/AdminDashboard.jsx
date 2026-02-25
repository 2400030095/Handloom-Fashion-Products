import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Shield, FileCheck, Check, X, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('users'); // 'users', 'moderation'

    // Mock Users
    const [usersList, setUsersList] = useState([
        { id: 1, name: 'Ramesh Weavers', role: 'artisan', status: 'active', email: 'ramesh@weavers.in' },
        { id: 2, name: 'Alice Buyer', role: 'buyer', status: 'active', email: 'alice@buyer.com' },
        { id: 3, name: 'Global Marketing', role: 'marketing', status: 'active', email: 'promo@handloom.org' },
        { id: 4, name: 'Suspicious User', role: 'buyer', status: 'suspended', email: 'spam@bot.com' },
    ]);

    // Mock Products Pending Verification
    const [pendingProducts, setPendingProducts] = useState([
        { id: 101, name: 'Neon Power Loom Saree', artisan: 'Fake Crafts', reason: 'Suspected non-handloom' }
    ]);

    if (user.role !== 'admin') {
        return <div className="page" style={{ padding: '2rem', textAlign: 'center' }}><h2>Access Denied</h2><p>Admin privileges required.</p></div>;
    }

    const toggleUserStatus = (id) => {
        setUsersList(usersList.map(u => {
            if (u.id === id) {
                return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
            }
            return u;
        }));
    };

    const handleProductAction = (id, approved) => {
        setPendingProducts(pendingProducts.filter(p => p.id !== id));
        alert(approved ? 'Product approved to catalog.' : 'Product rejected and removed.');
    };

    return (
        <div className="page" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            <aside className="card" style={{ width: '250px', height: 'fit-content' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary-dark)' }}>Admin Panel</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                        <button
                            className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'users' ? 'none' : '1px solid transparent' }}
                            onClick={() => setActiveTab('users')}
                        >
                            <Users size={18} /> User Management
                        </button>
                    </li>
                    <li>
                        <button
                            className={`btn ${activeTab === 'moderation' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'moderation' ? 'none' : '1px solid transparent' }}
                            onClick={() => setActiveTab('moderation')}
                        >
                            <FileCheck size={18} /> Content Moderation
                        </button>
                    </li>
                </ul>
            </aside>

            <main style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Shield size={32} color="var(--color-primary)" />
                    <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>System Administration</h2>
                </div>

                {activeTab === 'users' && (
                    <div className="card">
                        <h3 style={{ marginBottom: '1.5rem' }}>Manage Platform Users</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
                                    <th style={{ padding: '1rem' }}>User</th>
                                    <th style={{ padding: '1rem' }}>Email</th>
                                    <th style={{ padding: '1rem' }}>Role</th>
                                    <th style={{ padding: '1rem' }}>Status</th>
                                    <th style={{ padding: '1rem' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList.map(u => (
                                    <tr key={u.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>{u.name}</td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{u.email}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem',
                                                background: '#e0e0e0', color: '#333', textTransform: 'capitalize'
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem',
                                                background: u.status === 'active' ? '#e2f5e9' : '#fee2e2',
                                                color: u.status === 'active' ? '#065f46' : '#991b1b',
                                                textTransform: 'capitalize'
                                            }}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <button
                                                className="btn btn-secondary"
                                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderColor: u.status === 'active' ? 'red' : 'green', color: u.status === 'active' ? 'red' : 'green' }}
                                                onClick={() => toggleUserStatus(u.id)}
                                            >
                                                {u.status === 'active' ? 'Suspend' : 'Reactivate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'moderation' && (
                    <div className="card">
                        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertTriangle size={20} color="#ca8a04" /> Pending Approvals
                        </h3>
                        {pendingProducts.length === 0 ? (
                            <p style={{ color: 'var(--color-text-muted)' }}>No products pending review.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {pendingProducts.map(p => (
                                    <div key={p.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h4 style={{ fontWeight: '600', fontSize: '1.1rem' }}>{p.name}</h4>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Submitted by {p.artisan}</p>
                                            <p style={{ fontSize: '0.875rem', color: '#991b1b', background: '#fee2e2', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'inline-block' }}>
                                                Flag: {p.reason}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <button className="btn btn-secondary" style={{ borderColor: 'green', color: 'green', padding: '0.5rem' }} onClick={() => handleProductAction(p.id, true)}>
                                                <Check size={20} /> Approve
                                            </button>
                                            <button className="btn btn-secondary" style={{ borderColor: 'red', color: 'red', padding: '0.5rem' }} onClick={() => handleProductAction(p.id, false)}>
                                                <X size={20} /> Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: 'var(--radius-md)' }}>
                            <h4 style={{ marginBottom: '0.5rem' }}>Moderation Guidelines</h4>
                            <ul style={{ listStyle: 'inside', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                <li>Ensure all products use natural fibers and dyes.</li>
                                <li>Verify artisan background if flagged as mass-produced.</li>
                                <li>Check imagery for authenticity (no stock photos of power-loom items).</li>
                            </ul>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
