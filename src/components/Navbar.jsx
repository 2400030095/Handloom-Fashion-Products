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
                background: scrolled ? 'rgba(250, 250, 248, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
                padding: scrolled ? '1rem 5%' : '1.5rem 5%',
                boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.03)' : 'none',
            }}
        >
            <div className="logo">
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>
                        Handloom<span style={{ color: 'var(--color-secondary)' }}>.</span>
                    </span>
                </Link>
            </div>

            <div className="links desktop-links" style={{ display: 'none', gap: '2.5rem' }}>
                {['Home', 'Collections', 'Our Story'].map((item, i) => (
                    <Link
                        key={i}
                        to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                        style={{ position: 'relative', fontSize: '0.95rem', fontWeight: 500 }}
                    >
                        {item}
                        {location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`) && (
                            <motion.div
                                layoutId="nav-indicator"
                                style={{ position: 'absolute', bottom: '-6px', left: 0, right: 0, height: '2px', background: 'var(--color-secondary)' }}
                            />
                        )}
                    </Link>
                ))}
            </div>

            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-main)' }}>
                    <Search size={20} strokeWidth={2} />
                </button>
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <ShoppingBag size={20} strokeWidth={2} color="var(--color-text-main)" />
                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--color-secondary)', color: 'white', fontSize: '0.65rem', fontWeight: 700, width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        0
                    </span>
                </div>

                <div style={{ width: '1px', height: '24px', background: 'var(--color-border)', margin: '0 0.5rem' }}></div>

                {user.role === 'guest' ? (
                    <Link to="/login" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
                        Sign In
                    </Link>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to={`/${user.role}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
                                <User size={16} />
                            </div>
                            <span className="user-name-hide">{user.name}</span>
                        </Link>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
                            <LogOut size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* In a real scenario, you'd add mobile menu logic here. Added CSS for desktop-links to handle hiding on very small screens if needed */}
            <style>{`
                .desktop-links {
                    display: flex !important;
                }
                @media (max-width: 768px) {
                    .desktop-links { display: none !important; }
                    .user-name-hide { display: none !important; }
                }
            `}</style>
        </motion.nav>
    );
}
