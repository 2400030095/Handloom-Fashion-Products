import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Briefcase, Megaphone, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
    const { login, quickLogin, loginWithGoogle, authError, setAuthError } = useAuth();
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
        if (setAuthError) setAuthError('');
        try {
            await loginWithGoogle();
            navigate('/buyer');
        } catch {
            // error handled in context
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

                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    No account?{' '}
                    <Link to="/register" style={{ color: 'var(--color-secondary)', fontWeight: 600, textDecoration: 'none' }}>Create one free</Link>
                </p>

                {/* Google Sign-In */}
                <button onClick={handleGoogleLogin}
                    style={{ width: '100%', padding: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-primary)', marginBottom: '1.5rem', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-bg-main)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}>
                    <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>
                    Continue with Google
                </button>

                <div style={{ position: 'relative', margin: '1.5rem 0', borderTop: '1px solid var(--color-border)' }}>
                    <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 10px', fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>OR DEMO LOGIN AS</span>
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
