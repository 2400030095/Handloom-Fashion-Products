import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Megaphone, TrendingUp, Users, Target, Calendar } from 'lucide-react';

export default function MarketingDashboard() {
    const { user } = useAuth();

    const [campaigns, setCampaigns] = useState([
        { id: 1, name: 'Winter Warmth (Pashmina)', status: 'Active', reach: '45.2K', queries: 320 },
        { id: 2, name: 'Festive Silk Fair', status: 'Scheduled', reach: '-', queries: '-' },
        { id: 3, name: 'Eco-Friendly Khadi Push', status: 'Completed', reach: '102K', queries: 850 }
    ]);

    if (user.role !== 'marketing' && user.role !== 'admin') {
        return <div className="page" style={{ padding: '2rem', textAlign: 'center' }}><h2>Access Denied</h2><p>Marketing privileges required.</p></div>;
    }

    return (
        <div className="page" style={{ padding: '2rem 0' }}>
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
    );
}
