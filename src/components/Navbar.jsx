import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { LogOut, User, Search, ShoppingBag, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/collections?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchOpen(false);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'Collections', to: '/collections' },
        { label: 'Our Story', to: '/our-story' },
    ];

    return (
        <>
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
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
            >
                {/* Logo */}
                <div style={{ width: '25%' }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <span style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>
                            Handloom<span style={{ color: 'var(--color-secondary)' }}>.</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="desktop-links" style={{ display: 'none', gap: '3.5rem', flex: 1, justifyContent: 'center' }}>
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            style={{ position: 'relative', fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-text-main)', textDecoration: 'none' }}
                        >
                            {item.label}
                            {location.pathname === item.to && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    style={{ position: 'absolute', bottom: '-8px', left: 0, right: 0, height: '2px', background: 'var(--color-secondary)' }}
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '25%', justifyContent: 'flex-end' }}>
                    {/* Search */}
                    <button onClick={() => setSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center' }}>
                        <Search size={22} strokeWidth={1.5} />
                    </button>

                    {/* Cart */}
                    <Link to="/cart" style={{ position: 'relative', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <ShoppingBag size={22} strokeWidth={1.5} color="var(--color-text-main)" />
                        {cartCount > 0 && (
                            <motion.span
                                key={cartCount}
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
                                style={{ position: 'absolute', top: '-8px', right: '-10px', background: 'var(--color-secondary)', color: 'white', fontSize: '0.65rem', fontWeight: 700, minWidth: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px' }}>
                                {cartCount}
                            </motion.span>
                        )}
                    </Link>

                    <div style={{ width: '1px', height: '28px', background: 'var(--color-border)' }} />

                    {user.role === 'guest' ? (
                        <Link to="/login" className="btn btn-primary" style={{ padding: '0.6rem 1.6rem', fontSize: '0.9rem', textDecoration: 'none' }}>
                            Sign In
                        </Link>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link to={`/${user.role}`} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)', textDecoration: 'none' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-dark)' }}>
                                    <User size={18} />
                                </div>
                                <span className="user-name-hide">{user.name}</span>
                            </Link>
                            <button onClick={handleLogout} title="Logout" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
                                <LogOut size={20} strokeWidth={1.5} />
                            </button>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button onClick={() => setIsMobileMenuOpen(o => !o)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', display: 'none', alignItems: 'center' }}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <style>{`
                    .desktop-links { display: flex !important; }
                    @media (max-width: 768px) {
                        .desktop-links, .user-name-hide { display: none !important; }
                        .mobile-menu-btn { display: flex !important; }
                        .logo, .nav-actions { width: auto !important; }
                    }
                `}</style>
            </motion.nav>

            {/* Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSearchOpen(false)}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9998, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '8rem' }}
                    >
                        <motion.form
                            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                            onSubmit={handleSearch}
                            onClick={e => e.stopPropagation()}
                            style={{ background: 'white', borderRadius: '12px', padding: '0.5rem', display: 'flex', gap: '0.5rem', width: '90%', maxWidth: '600px', boxShadow: 'var(--shadow-xl)' }}
                        >
                            <Search size={22} style={{ margin: '0.9rem', color: 'var(--color-text-muted)', flexShrink: 0 }} />
                            <input
                                autoFocus
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search handloom products..."
                                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1.1rem', color: 'var(--color-primary)', background: 'transparent', fontFamily: 'var(--font-main)' }}
                            />
                            <button type="submit" style={{ padding: '0.7rem 1.5rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Search</button>
                        </motion.form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        style={{ position: 'fixed', top: '70px', left: 0, right: 0, background: 'white', zIndex: 9997, padding: '2rem 5%', display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}
                    >
                        {navLinks.map(item => (
                            <Link key={item.label} to={item.to} style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-primary)', textDecoration: 'none', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                                {item.label}
                            </Link>
                        ))}
                        {user.role === 'guest'
                            ? <Link to="/login" style={{ padding: '0.75rem 1.5rem', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-full)', textDecoration: 'none', textAlign: 'center', fontWeight: 600 }}>Sign In</Link>
                            : <button onClick={handleLogout} style={{ padding: '0.75rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', color: 'var(--color-text-muted)', cursor: 'pointer', fontWeight: 600 }}>Logout</button>
                        }
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
