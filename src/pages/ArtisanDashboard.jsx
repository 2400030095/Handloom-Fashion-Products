import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockProducts } from '../data';
import { PlusCircle, LayoutDashboard, List, MessageSquare, DollarSign, Package } from 'lucide-react';

export default function ArtisanDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'products', 'messages'
    const [products, setProducts] = useState(mockProducts.filter(p => p.artisan === 'Ramesh Weavers' || p.id % 2 !== 0)); // mock filter for this artisan

    // New Product Form State
    const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: 'Sarees' });

    if (user.role !== 'artisan' && user.role !== 'admin') {
        return <div className="page" style={{ padding: '2rem', textAlign: 'center' }}><h2>Access Denied</h2><p>Please login as an Artisan.</p></div>;
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price) return;

        const prod = {
            id: Date.now(),
            name: newProduct.name,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock) || 1,
            category: newProduct.category,
            artisan: user.name,
            image: 'https://images.unsplash.com/photo-1605022600390-071c6efec2aa?auto=format&fit=crop&q=80&w=800',
            description: 'Newly added handloom product.',
        };

        setProducts([...products, prod]);
        setNewProduct({ name: '', price: '', stock: '', category: 'Sarees' });
        alert('Product added successfully!');
    };

    const removeProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const totalSales = 1250.00; // Mock stat
    const pendingOrders = 3;

    return (
        <div className="page" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            {/* Sidebar */}
            <aside className="card" style={{ width: '250px', height: 'fit-content' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary-dark)' }}>Artisan Portal</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>
                        <button
                            className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'overview' ? 'none' : '1px solid transparent' }}
                            onClick={() => setActiveTab('overview')}
                        >
                            <LayoutDashboard size={18} /> Overview
                        </button>
                    </li>
                    <li>
                        <button
                            className={`btn ${activeTab === 'products' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'products' ? 'none' : '1px solid transparent' }}
                            onClick={() => setActiveTab('products')}
                        >
                            <List size={18} /> My Products
                        </button>
                    </li>
                    <li>
                        <button
                            className={`btn ${activeTab === 'messages' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ width: '100%', justifyContent: 'flex-start', border: activeTab === 'messages' ? 'none' : '1px solid transparent' }}
                            onClick={() => setActiveTab('messages')}
                        >
                            <MessageSquare size={18} /> Messages
                        </button>
                    </li>
                </ul>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1 }}>
                {activeTab === 'overview' && (
                    <div>
                        <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>Welcome, {user.name}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#e0f2fe', padding: '1rem', borderRadius: '50%', color: '#0284c7' }}>
                                    <DollarSign size={24} />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Total Earnings</p>
                                    <h3 style={{ fontSize: '1.5rem' }}>${totalSales.toFixed(2)}</h3>
                                </div>
                            </div>
                            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#fef08a', padding: '1rem', borderRadius: '50%', color: '#ca8a04' }}>
                                    <Package size={24} />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Active Products</p>
                                    <h3 style={{ fontSize: '1.5rem' }}>{products.length}</h3>
                                </div>
                            </div>
                            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#e2f5e9', padding: '1rem', borderRadius: '50%', color: '#059669' }}>
                                    <MessageSquare size={24} />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Pending Orders</p>
                                    <h3 style={{ fontSize: '1.5rem' }}>{pendingOrders}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions / Recent Activity */}
                        <div className="card">
                            <h3 style={{ marginBottom: '1rem' }}>Recent Order Activity</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Order #ORD-8945 (Ikat Cotton Kurta) was marked as Shipped.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div>
                        <div className="card" style={{ marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
                                <PlusCircle size={20} /> Add New Listing
                            </h3>
                            <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Product Name</label>
                                    <input type="text" className="form-input" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select className="form-input" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
                                        <option>Sarees</option>
                                        <option>Kurtas</option>
                                        <option>Shawls</option>
                                        <option>Accessories</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Price ($)</label>
                                    <input type="number" step="0.01" className="form-input" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Stock Quantity</label>
                                    <input type="number" className="form-input" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} required />
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <button type="submit" className="btn btn-primary">List Product</button>
                                </div>
                            </form>
                        </div>

                        <h3 style={{ marginBottom: '1rem' }}>My Inventory</h3>
                        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)' }}>
                                        <th style={{ padding: '1rem' }}>Product</th>
                                        <th style={{ padding: '1rem' }}>Category</th>
                                        <th style={{ padding: '1rem' }}>Price</th>
                                        <th style={{ padding: '1rem' }}>Stock</th>
                                        <th style={{ padding: '1rem' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                            <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                                    onError={(e) => {
                                                        const tried = parseInt(e.target.dataset.tried || '0');
                                                        if (tried < product.alternateImages?.length) {
                                                            e.target.dataset.tried = (tried + 1).toString();
                                                            e.target.src = product.alternateImages[tried];
                                                        }
                                                    }}
                                                />
                                                <span style={{ fontWeight: '500' }}>{product.name}</span>
                                            </td>
                                            <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{product.category}</td>
                                            <td style={{ padding: '1rem', fontWeight: '600' }}>${product.price}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem',
                                                    background: product.stock > 5 ? '#e2f5e9' : '#fef08a',
                                                    color: product.stock > 5 ? '#065f46' : '#ca8a04'
                                                }}>
                                                    {product.stock} units
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem' }}>
                                                <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', borderColor: 'red', color: 'red' }} onClick={() => removeProduct(product.id)}>
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No products found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="card">
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Buyer Messages</h2>
                        <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: '600' }}>Alice (Buyer)</span>
                                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>2 hours ago</span>
                            </div>
                            <p style={{ color: 'var(--color-text-main)' }}>Hi, I'm interested in the Kanjeevaram Saree. Can this be customized with a different border color?</p>
                            <div style={{ marginTop: '1rem' }}>
                                <textarea className="form-input" placeholder="Type your reply..." style={{ width: '100%', minHeight: '80px', marginBottom: '0.5rem' }}></textarea>
                                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Send Reply</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
