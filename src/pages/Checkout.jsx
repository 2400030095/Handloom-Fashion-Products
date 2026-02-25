import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState('address');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: user.name !== 'Guest' ? user.name : '',
        email: user.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
    });

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                userId: user.uid || 'guest',
                userName: form.fullName,
                userEmail: form.email,
                items: cartItems.map(item => ({ id: item.id, name: item.name, price: item.price, qty: item.qty, image: item.image })),
                total: cartTotal,
                address: form,
                status: 'Confirmed',
                createdAt: new Date().toISOString(),
                orderId: `ORD-${Date.now()}`,
            };

            let savedId = orderData.orderId;

            // Try to save to Firestore, fall back gracefully if Firebase not configured
            try {
                const docRef = await addDoc(collection(db, 'orders'), orderData);
                savedId = docRef.id;
            } catch (firebaseErr) {
                console.warn('Firebase not configured, using local order id.');
            }

            clearCart();
            navigate('/order-success', { state: { orderId: savedId, total: cartTotal, items: cartItems.length } });
        } catch (err) {
            console.error('Order failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '0.9rem 1.2rem', border: '1px solid var(--color-border)',
        borderRadius: '8px', fontSize: '0.95rem', outline: 'none', background: 'white',
        boxSizing: 'border-box', fontFamily: 'var(--font-main)'
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-main)', paddingBottom: '6rem' }}>
            <div className="container" style={{ paddingTop: '7rem', maxWidth: '1100px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 400, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', marginBottom: '3rem', textAlign: 'center' }}>
                    Checkout
                </h1>

                {/* Progress */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                    {['address', 'payment'].map((s, i) => (
                        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step === s || (step === 'payment' && s === 'address') ? 'var(--color-primary)' : 'var(--color-border)', color: step === s || (step === 'payment' && s === 'address') ? 'white' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                                {i + 1}
                            </div>
                            <span style={{ fontWeight: step === s ? 600 : 400, color: step === s ? 'var(--color-primary)' : 'var(--color-text-muted)', textTransform: 'capitalize' }}>{s}</span>
                            {i === 0 && <ChevronRight size={16} color="var(--color-text-muted)" />}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '3rem', alignItems: 'start' }}>
                    {/* Form */}
                    <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ background: 'white', borderRadius: '12px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
                        {step === 'address' && (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                    <MapPin size={22} color="var(--color-secondary)" />
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--color-primary)' }}>Delivery Address</h2>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'block' }}>Full Name *</label>
                                        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" style={inputStyle} required />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'block' }}>Email *</label>
                                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" style={inputStyle} required />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'block' }}>Phone *</label>
                                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} required />
                                    </div>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'block' }}>Street Address *</label>
                                        <input name="address" value={form.address} onChange={handleChange} placeholder="House no., Street name, Area" style={inputStyle} required />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'block' }}>City *</label>
                                        <input name="city" value={form.city} onChange={handleChange} placeholder="Hyderabad" style={inputStyle} required />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'block' }}>State *</label>
                                        <input name="state" value={form.state} onChange={handleChange} placeholder="Telangana" style={inputStyle} required />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'block' }}>PIN Code *</label>
                                        <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="500001" style={inputStyle} required />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem', display: 'block' }}>Country</label>
                                        <input name="country" value={form.country} onChange={handleChange} style={inputStyle} />
                                    </div>
                                </div>
                                <button onClick={() => setStep('payment')}
                                    disabled={!form.fullName || !form.email || !form.phone || !form.address || !form.city || !form.pincode}
                                    style={{ marginTop: '2rem', width: '100%', padding: '1rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', opacity: (!form.fullName || !form.email || !form.phone || !form.address || !form.city || !form.pincode) ? 0.5 : 1 }}>
                                    Continue to Payment →
                                </button>
                            </>
                        )}

                        {step === 'payment' && (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                    <CreditCard size={22} color="var(--color-secondary)" />
                                    <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--color-primary)' }}>Payment</h2>
                                </div>

                                {/* Payment options (demo) */}
                                {['Credit / Debit Card', 'UPI', 'Net Banking', 'Cash on Delivery'].map((method, i) => (
                                    <div key={i} onClick={() => { }} style={{ padding: '1.2rem 1.5rem', border: i === 0 ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', borderRadius: '8px', marginBottom: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--color-primary)', background: i === 0 ? 'var(--color-primary)' : 'white' }} />
                                            <span style={{ fontWeight: i === 0 ? 600 : 400, color: 'var(--color-primary)' }}>{method}</span>
                                        </div>
                                        {i === 3 && <span style={{ fontSize: '0.8rem', background: '#dcfce7', color: '#16a34a', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 600 }}>Safe</span>}
                                    </div>
                                ))}

                                <div style={{ background: 'rgba(155, 112, 78, 0.08)', borderRadius: '8px', padding: '1rem', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    🔒 This is a demo. No real payment is processed.
                                </div>

                                <button onClick={handlePlaceOrder} disabled={loading}
                                    style={{ marginTop: '2rem', width: '100%', padding: '1.1rem', background: '#16a34a', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                    {loading ? 'Placing Order...' : `✓ Place Order — $${cartTotal.toFixed(2)}`}
                                </button>
                                <button onClick={() => setStep('address')} style={{ marginTop: '1rem', width: '100%', padding: '0.8rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                                    ← Back to Address
                                </button>
                            </>
                        )}
                    </motion.div>

                    {/* Summary Sidebar */}
                    <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: '6rem' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Your Order</h3>
                        {cartItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'center' }}>
                                <img src={item.image} alt={item.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Qty: {item.qty}</p>
                                </div>
                                <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.95rem', flexShrink: 0 }}>${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))}
                        <div style={{ height: '1px', background: 'var(--color-border)', margin: '1.5rem 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                            <span>Total</span><span>${cartTotal.toFixed(2)}</span>
                        </div>
                        {form.city && (
                            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--color-bg-main)', borderRadius: '8px' }}>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.3rem' }}>📦 Delivering To</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{form.address && `${form.address}, `}{form.city}{form.pincode && `, ${form.pincode}`}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
