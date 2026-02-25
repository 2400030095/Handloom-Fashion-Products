import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
    const { state } = useLocation();
    const orderId = state?.orderId || 'ORD-' + Date.now();
    const total = state?.total || 0;
    const itemCount = state?.items || 0;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: 'white', borderRadius: '16px', padding: '4rem 3rem', textAlign: 'center', maxWidth: '560px', width: '100%', boxShadow: 'var(--shadow-xl)' }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}
                >
                    <CheckCircle size={42} color="#16a34a" />
                </motion.div>

                <h1 style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem' }}>
                    Order Placed Successfully!
                </h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                    Thank you for supporting Indian artisans. Your handcrafted piece is on its way!
                </p>

                <div style={{ background: 'var(--color-bg-main)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Order ID</span>
                        <span style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--color-primary)' }}>{String(orderId).slice(0, 20)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Items ordered</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{itemCount}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Amount paid</span>
                        <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.1rem' }}>${total.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Estimated delivery</span>
                        <span style={{ fontWeight: 600, color: '#16a34a' }}>5–10 Business Days</span>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: 'rgba(155, 112, 78, 0.08)', borderRadius: '8px', marginBottom: '2.5rem' }}>
                    <Package size={20} color="var(--color-secondary)" />
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>A confirmation email has been sent. Track your order in your dashboard.</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link to="/buyer" style={{ padding: '0.9rem 2rem', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        View Orders <ArrowRight size={18} />
                    </Link>
                    <Link to="/collections" style={{ padding: '0.9rem 2rem', border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontWeight: 600 }}>
                        Shop More
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
