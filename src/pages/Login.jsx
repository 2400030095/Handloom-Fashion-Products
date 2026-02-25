import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Briefcase, Megaphone, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
    const { login, googleLogin, quickLogin, authError, setAuthError } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const roles = [
        { id: 'buyer', name: 'Buyer', icon: <User size={22} />, path: '/buyer' },
        { id: 'artisan', name: 'Artisan', icon: <Briefcase size={22} />, path: '/artisan' },
        { id: 'marketing', name: 'Marketing', icon: <Megaphone size={22} />, path: '/marketing' },
        { id: 'admin', name: 'Admin', icon: <Shield size={22} />, path: '/admin' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setAuthError) setAuthError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/buyer');
        } catch {
            // error handled in context
        } finally {
            setLoading(false);
        }
    };

    const handleQuickLogin = (role) => {
        quickLogin(role.id, `${role.name} User`);
        navigate(role.path);
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleLogin();
            navigate('/buyer');
        } catch {
            // error handled in context
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-main)', padding: '2rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                style={{ background: 'white', borderRadius: '16px', padding: '3rem', width: '100%', maxWidth: '440px', boxShadow: 'var(--shadow-xl)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                            Handloom<span style={{ color: 'var(--color-secondary)' }}>.</span>
                        </h2>
                    </Link>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Welcome back. Sign in to continue.</p>
                </div>

                {authError && (
                    <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '0.9rem 1.2rem', marginBottom: '1.5rem', color: '#dc2626', fontSize: '0.9rem' }}>
                        {authError}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem', display: 'block' }}>Email Address</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required
                            style={{ width: '100%', padding: '0.9rem 1.2rem', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', background: 'var(--color-bg-main)', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem', display: 'block' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                                style={{ width: '100%', padding: '0.9rem 3rem 0.9rem 1.2rem', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', background: 'var(--color-bg-main)', boxSizing: 'border-box' }} />
                            <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" disabled={loading}
                        style={{ padding: '1rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ position: 'relative', margin: '1.5rem 0', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 10px', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>OR</span>
                </div>

                <button onClick={handleGoogleLogin} disabled={loading}
                    style={{ width: '100%', padding: '1rem', background: '#4285f4', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {loading ? 'Signing In...' : 'Continue with Google'}
                </button>

                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    No account?{' '}
                    <Link to="/register" style={{ color: 'var(--color-secondary)', fontWeight: 600, textDecoration: 'none' }}>Create one free</Link>
                </p>

                <div style={{ position: 'relative', margin: '1.5rem 0', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 10px', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>DEMO LOGIN AS</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '2rem' }}>
                    {roles.map(role => (
                        <button key={role.id} onClick={() => handleQuickLogin(role)}
                            style={{ padding: '0.9rem 0.5rem', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-bg-main)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.background = 'white'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.background = 'var(--color-bg-main)'; }}>
                            <div style={{ color: 'var(--color-secondary)' }}>{role.icon}</div>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>{role.name}</span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
