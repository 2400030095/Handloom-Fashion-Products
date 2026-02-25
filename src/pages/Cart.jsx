import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { cartItems, removeFromCart, updateQty, cartTotal, clearCart, cartCount } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', textAlign: 'center', paddingTop: '80px' }}>
                <ShoppingBag size={80} color="var(--color-border)" />
                <h2 style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--color-text-muted)' }}>Discover our handcrafted pieces and add something beautiful to your collection.</p>
                <Link to="/collections" style={{ padding: '1rem 2.5rem', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-full)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShoppingBag size={20} /> Browse Collections
                </Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-main)', paddingBottom: '6rem' }}>
            <div className="container" style={{ paddingTop: '7rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                        <ArrowLeft size={18} /> Continue Shopping
                    </button>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 400, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', marginLeft: 'auto', marginRight: 'auto' }}>
                        Shopping Cart <span style={{ color: 'var(--color-text-muted)', fontSize: '1.5rem' }}>({cartCount})</span>
                    </h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
                    {/* Cart Items */}
                    <div>
                        <AnimatePresence>
                            {cartItems.map(item => (
                                <motion.div key={item.id}
                                    layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                                    style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-sm)', alignItems: 'flex-start' }}
                                >
                                    <Link to={`/product/${item.id}`}>
                                        <img src={item.image} alt={item.name} style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                                    </Link>
                                    <div style={{ flex: 1 }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.category}</span>
                                        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                                            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', margin: '0.3rem 0 0.3rem' }}>{item.name}</h3>
                                        </Link>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>By {item.artisan}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                                <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}><Minus size={14} /></button>
                                                <span style={{ padding: '0.5rem 1rem', fontWeight: 600, borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', minWidth: '40px', textAlign: 'center' }}>{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}><Plus size={14} /></button>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>${(item.price * item.qty).toFixed(2)}</span>
                                                <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center' }}><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <button onClick={clearCart} style={{ background: 'none', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', padding: '0.7rem 1.5rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: '0.9rem' }}>
                            Clear Cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '6rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '2rem' }}>Order Summary</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                                <span>Subtotal ({cartCount} items)</span><span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                                <span>Shipping</span><span style={{ color: '#16a34a', fontWeight: 600 }}>Free</span>
                            </div>
                            <div style={{ height: '1px', background: 'var(--color-border)' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                                <span>Total</span><span>${cartTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button onClick={() => navigate('/checkout')}
                            style={{ width: '100%', padding: '1.1rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                            Proceed to Checkout <ArrowRight size={20} />
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
                            🔒 Secure checkout. Ships from India in 5–10 days.
                        </p>

                        {/* Promo */}
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(155, 112, 78, 0.08)', borderRadius: '8px', border: '1px dashed var(--color-secondary)' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', fontWeight: 600, textAlign: 'center' }}>🎁 Use code <strong>HANDLOOM10</strong> for 10% off</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
