import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Briefcase, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Register() {
    const { register, authError, setAuthError } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'buyer' });
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        if (setAuthError) setAuthError('');
        if (form.password !== form.confirmPassword) { setLocalError("Passwords don't match."); return; }
        if (form.password.length < 6) { setLocalError("Password must be at least 6 characters."); return; }
        setLoading(true);
        try {
            await register(form.email, form.password, form.name, form.role);
            navigate(`/${form.role}`);
        } catch {
            // Error already set in AuthContext
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = { width: '100%', padding: '0.9rem 1.2rem', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.95rem', outline: 'none', background: 'var(--color-bg-main)', boxSizing: 'border-box', fontFamily: 'var(--font-main)' };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-main)', padding: '2rem' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                style={{ background: 'white', borderRadius: '16px', padding: '3rem', width: '100%', maxWidth: '480px', boxShadow: 'var(--shadow-xl)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                            Handloom<span style={{ color: 'var(--color-secondary)' }}>.</span>
                        </h2>
                    </Link>
                    <p style={{ color: 'var(--color-text-muted)' }}>Create your account</p>
                </div>

                {(authError || localError) && (
                    <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '0.9rem 1.2rem', marginBottom: '1.5rem', color: '#dc2626', fontSize: '0.9rem' }}>
                        {localError || authError}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem', display: 'block' }}>Full Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Priya Sharma" style={inputStyle} required />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem', display: 'block' }}>Email Address *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" style={inputStyle} required />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem', display: 'block' }}>Password *</label>
                        <div style={{ position: 'relative' }}>
                            <input name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Min. 6 characters" style={{ ...inputStyle, paddingRight: '3rem' }} required />
                            <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem', display: 'block' }}>Confirm Password *</label>
                        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" style={inputStyle} required />
                    </div>

                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.75rem', display: 'block' }}>I am joining as *</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            {[{ id: 'buyer', label: 'Buyer', icon: <User size={20} />, desc: 'Shop handloom products' },
                            { id: 'artisan', label: 'Artisan', icon: <Briefcase size={20} />, desc: 'Sell my craft' }].map(r => (
                                <button type="button" key={r.id} onClick={() => setForm(f => ({ ...f, role: r.id }))}
                                    style={{ padding: '1rem', border: form.role === r.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: '8px', background: form.role === r.id ? 'rgba(26,26,26,0.05)' : 'white', cursor: 'pointer', textAlign: 'center' }}>
                                    <div style={{ color: form.role === r.id ? 'var(--color-primary)' : 'var(--color-text-muted)', marginBottom: '0.4rem', display: 'flex', justifyContent: 'center' }}>{r.icon}</div>
                                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-primary)', marginBottom: '0.2rem' }}>{r.label}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{r.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button type="submit" disabled={loading}
                        style={{ padding: '1rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--color-secondary)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
}
