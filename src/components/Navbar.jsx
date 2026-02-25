import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Search, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
                background: scrolled ? 'rgba(250, 250, 248, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(24px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
                padding: scrolled ? '1rem 5%' : '1.5rem 5%',
                boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.04)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <div className="logo" style={{ width: '25%' }}>
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>
                        Handloom<span style={{ color: 'var(--color-secondary)' }}>.</span>
                    </span>
                </Link>
            </div>

            <div className="links desktop-links" style={{ display: 'none', gap: '3.5rem', flex: 1, justifyContent: 'center' }}>
                {['Home', 'Collections', 'Our Story'].map((item, i) => (
                    <Link
                        key={i}
                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                        style={{ position: 'relative', fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-text-main)' }}
                    >
                        {item}
                        {location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`) && (
                            <motion.div
                                layoutId="nav-indicator"
                                style={{ position: 'absolute', bottom: '-8px', left: 0, right: 0, height: '2px', background: 'var(--color-secondary)' }}
                            />
                        )}
                    </Link>
                ))}
            </div>

            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '25%', justifyContent: 'flex-end' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-main)' }}>
                    <Search size={22} strokeWidth={1.5} />
                </button>
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <ShoppingBag size={22} strokeWidth={1.5} color="var(--color-text-main)" />
                    <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: 'var(--color-secondary)', color: 'white', fontSize: '0.65rem', fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        0
                    </span>
                </div>

                <div style={{ width: '1px', height: '28px', background: 'var(--color-border)', margin: '0 0.5rem' }}></div>

                {user.role === 'guest' ? (
                    <Link to="/login" className="btn btn-primary" style={{ padding: '0.6rem 1.6rem', fontSize: '0.9rem' }}>
                        Sign In
                    </Link>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to={`/${user.role}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
                                <User size={18} />
                            </div>
                            <span className="user-name-hide">{user.name}</span>
                        </Link>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
                            <LogOut size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .desktop-links {
                    display: flex !important;
                }
                @media (max-width: 768px) {
                    .desktop-links, .user-name-hide { display: none !important; }
                    .logo { width: auto !important; }
                    .nav-actions { width: auto !important; }
                }
            `}</style>
        </motion.nav>
    );
}
