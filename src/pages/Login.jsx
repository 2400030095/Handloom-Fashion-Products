import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Briefcase, Megaphone } from 'lucide-react';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const roles = [
        { id: 'buyer', name: 'Buyer', icon: <User size={24} />, path: '/buyer' },
        { id: 'artisan', name: 'Artisan', icon: <Briefcase size={24} />, path: '/artisan' },
        { id: 'marketing', name: 'Marketing', icon: <Megaphone size={24} />, path: '/marketing' },
        { id: 'admin', name: 'Admin', icon: <Shield size={24} />, path: '/admin' }
    ];

    const handleMockLogin = (role) => {
        login(role.id, `${role.name} User`);
        navigate(role.path);
    };

    return (
        <div className="page login-page" style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <div className="card text-center">
                <h2 style={{ marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Welcome Back</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                    Connect with the global handloom community.
                </p>

                <form onSubmit={(e) => { e.preventDefault(); handleMockLogin(roles[0]); }}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '2rem' }}>
                        Sign In
                    </button>
                </form>

                <div className="divider" style={{ margin: '1.5rem 0', borderTop: '1px solid var(--color-border)', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-bg-card)', padding: '0 10px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                        OR QUICK LOGIN AS
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
                    {roles.map(role => (
                        <button
                            key={role.id}
                            className="btn btn-secondary"
                            style={{ padding: '1rem 0.5rem', flexDirection: 'column', gap: '0.5rem' }}
                            onClick={() => handleMockLogin(role)}
                        >
                            <div style={{ color: 'var(--color-primary)' }}>{role.icon}</div>
                            <span style={{ fontSize: '0.875rem' }}>{role.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
