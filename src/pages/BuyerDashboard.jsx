import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockProducts, mockOrders } from '../data';
import { ShoppingCart, ShoppingBag, CheckCircle, Package } from 'lucide-react';

export default function BuyerDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('shop'); // 'shop', 'cart', 'orders'
    const [cart, setCart] = useState([]);

    if (user.role !== 'buyer' && user.role !== 'admin') {
        return <div className="page" style={{ padding: '2rem', textAlign: 'center' }}><h2>Access Denied</h2><p>Please login as a Buyer.</p></div>;
    }

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const handleCheckout = () => {
        alert(`Checkout complete. Total: $${cartTotal.toFixed(2)}`);
        setCart([]);
        setActiveTab('orders');
    };

    return (
        <div className="page" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>

            {/* Sidebar sidebar */}
            <aside className="card" style={{ width: '250px', height: 'fit-content' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary-dark)' }}>Buyer Portal</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                        <button
                            className={`btn ${activeTab === 'shop' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'shop' ? 'none' : '1px solid transparent' }}
                            onClick={() => setActiveTab('shop')}
                        >
                            <ShoppingBag size={18} /> Shop Handlooms
                        </button>
                    </li>
                    <li>
                        <button
                            className={`btn ${activeTab === 'cart' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'cart' ? 'none' : '1px solid transparent' }}
                            onClick={() => setActiveTab('cart')}
                        >
                            <ShoppingCart size={18} /> My Cart ({cart.reduce((a, b) => a + b.qty, 0)})
                        </button>
                    </li>
                    <li>
                        <button
                            className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'orders' ? 'none' : '1px solid transparent' }}
                            onClick={() => setActiveTab('orders')}
                        >
                            <Package size={18} /> Order History
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1 }}>
                {activeTab === 'shop' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>Global Handloom Catalog</h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                            {mockProducts.map(product => (
                                <div key={product.id} className="card product-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                                        onError={(e) => {
                                            const tried = parseInt(e.target.dataset.tried || '0');
                                            if (tried < product.alternateImages?.length) {
                                                e.target.dataset.tried = (tried + 1).toString();
                                                e.target.src = product.alternateImages[tried];
                                            }
                                        }}
                                    />
                                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', lineHeight: 1.2 }}>{product.name}</h3>
                                            <span style={{ fontWeight: '700', color: 'var(--color-primary)', fontSize: '1.1rem' }}>${product.price}</span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>By {product.artisan}</p>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{product.description}</p>
                                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => addToCart(product)}>
                                            <ShoppingCart size={18} /> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'cart' && (
                    <div className="card">
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Shopping Cart</h2>
                        {cart.length === 0 ? (
                            <p style={{ color: 'var(--color-text-muted)' }}>Your cart is empty.</p>
                        ) : (
                            <div>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                    {cart.map(item => (
                                        <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                                                    onError={(e) => {
                                                        const tried = parseInt(e.target.dataset.tried || '0');
                                                        if (tried < item.alternateImages?.length) {
                                                            e.target.dataset.tried = (tried + 1).toString();
                                                            e.target.src = item.alternateImages[tried];
                                                        }
                                                    }}
                                                />
                                                <div>
                                                    <p style={{ fontWeight: '600' }}>{item.name}</p>
                                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Qty: {item.qty} x ${item.price}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                                <p style={{ fontWeight: '700' }}>${(item.price * item.qty).toFixed(2)}</p>
                                                <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', borderColor: 'red', color: 'red' }} onClick={() => removeFromCart(item.id)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--color-bg-main)', borderRadius: 'var(--radius-md)' }}>
                                    <h3 style={{ fontSize: '1.5rem' }}>Total:</h3>
                                    <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)' }}>${cartTotal.toFixed(2)}</h3>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                                    <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={handleCheckout}>
                                        <CheckCircle size={20} /> Checkout Securely
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="card">
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Order History</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {mockOrders.map(order => (
                                <div key={order.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div>
                                            <h4 style={{ fontWeight: '600', fontSize: '1.1rem' }}>Order {order.id}</h4>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Placed on {order.date}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>${order.total.toFixed(2)}</p>
                                            <span style={{
                                                display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem', fontWeight: '600',
                                                backgroundColor: order.status === 'Delivered' ? '#e2f5e9' : '#e0f2fe',
                                                color: order.status === 'Delivered' ? '#065f46' : '#0369a1'
                                            }}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Items:</h5>
                                        <ul style={{ listStyle: 'inside', fontSize: '0.9rem' }}>
                                            {order.items.map((item, i) => (
                                                <li key={i}>{item.name} (x{item.qty})</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
