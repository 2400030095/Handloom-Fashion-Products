import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Megaphone, TrendingUp, Users, Target, Calendar } from 'lucide-react';

export default function MarketingDashboard() {
    const { user, quickLogin } = useAuth();

    const [campaigns, setCampaigns] = useState([
        { id: 1, name: 'Winter Warmth (Pashmina)', status: 'Active', reach: '45.2K', queries: 320 },
        { id: 2, name: 'Festive Silk Fair', status: 'Scheduled', reach: '-', queries: '-' },
        { id: 3, name: 'Eco-Friendly Khadi Push', status: 'Completed', reach: '102K', queries: 850 }
    ]);

    if (user.role !== 'marketing' && user.role !== 'admin') {
        return <div className="page" style={{ padding: '2rem', textAlign: 'center' }}><h2>Access Denied</h2><p>Marketing privileges required.</p></div>;
    }

    const demoRoles = [
        { id: 'buyer', name: 'Buyer', icon: '🛒' },
        { id: 'artisan', name: 'Artisan', icon: '🧵' },
        { id: 'marketing', name: 'Marketing', icon: '📊' },
        { id: 'admin', name: 'Admin', icon: '⚙️' }
    ];

    const handleDemoLogin = (roleId) => {
        const roleNames = { buyer: 'Buyer User', artisan: 'Artisan User', marketing: 'Marketing User', admin: 'Admin User' };
        quickLogin(roleId, roleNames[roleId]);
        // Navigate to the appropriate dashboard
        const paths = { buyer: '/buyer', artisan: '/artisan', marketing: '/marketing', admin: '/admin' };
        window.location.href = paths[roleId];
    };

    return (
        <div className="page" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem 0' }}>
            {/* Demo Login Banner */}
            <div style={{ background: 'linear-gradient(135deg, #8b5a2b 0%, #a67c52 100%)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>🔄 <strong>Demo Mode:</strong> Switch roles to test different dashboards</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {demoRoles.map(role => (
                        <button
                            key={role.id}
                            onClick={() => handleDemoLogin(role.id)}
                            style={{
                                padding: '0.4rem 0.8rem',
                                background: user.role === role.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = user.role === role.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}
                        >
                            {role.icon} {role.name}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--color-primary-light)', padding: '1rem', borderRadius: '50%', color: 'white' }}>
                    <Megaphone size={32} />
                </div>
                <div>
                    <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>Marketing & Promotions</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Manage global outreach and artisan campaigns.</p>
                </div>
            </div>

            {/* Analytics Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <TrendingUp size={32} color="#059669" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '2rem', margin: 0 }}>+24%</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Global Traffic (MoM)</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <Users size={32} color="#0284c7" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '2rem', margin: 0 }}>12.5K</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>New Buyers Acquired</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <Target size={32} color="#ca8a04" style={{ margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '2rem', margin: 0 }}>4.8%</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Conversion Rate</p>
                </div>
            </div>

            {/* Campaign Management */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} /> Ongoing & Upcoming Campaigns
                    </h3>
                    <button className="btn btn-primary">Create Campaign</button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
                            <th style={{ padding: '1rem' }}>Campaign Name</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Est. Reach</th>
                            <th style={{ padding: '1rem' }}>Engagement</th>
                            <th style={{ padding: '1rem' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map(c => (
                            <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{c.name}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem',
                                        background: c.status === 'Active' ? '#e2f5e9' : c.status === 'Scheduled' ? '#e0f2fe' : '#f5f5f5',
                                        color: c.status === 'Active' ? '#065f46' : c.status === 'Scheduled' ? '#0369a1' : '#6b6b6b'
                                    }}>
                                        {c.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{c.reach}</td>
                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{c.queries}</td>
                                <td style={{ padding: '1rem' }}>
                                    <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
                                        View Stats
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}
