import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, X, Star, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockProducts } from '../data';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['All', 'Sarees', 'Kurtas', 'Shawls', 'Accessories', 'Home Decor', 'Shirts'];

export default function Collections() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [sort, setSort] = useState('featured');
    const { addToCart, cartItems } = useCart();
    const [toast, setToast] = useState('');

    useEffect(() => {
        const newParams = {};
        if (search) newParams.q = search;
        if (category && category !== 'All') newParams.category = category;
        setSearchParams(newParams, { replace: true });
    }, [search, category]);

    const handleAddToCart = (product) => {
        addToCart(product);
        setToast(`${product.name} added to cart!`);
        setTimeout(() => setToast(''), 3000);
    };

    let filtered = [...mockProducts];
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.artisan.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'All') filtered = filtered.filter(p => p.category === category);
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-main)', paddingBottom: '6rem' }}>
            {/* Toast */}
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: toast ? 0 : 100, opacity: toast ? 1 : 0 }}
                style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, background: 'var(--color-primary)', color: 'white', padding: '1rem 2rem', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShoppingBag size={18} /><span>{toast}</span>
            </motion.div>

            {/* Header */}
            <div style={{ background: 'white', borderBottom: '1px solid var(--color-border)', padding: '4rem 5% 3rem', marginTop: '80px' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <p style={{ color: 'var(--color-secondary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Handcrafted With Love</p>
                        <h1 style={{ fontSize: '3rem', fontWeight: 400, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>Our Collections</h1>
                        <p style={{ color: 'var(--color-text-muted)' }}>{filtered.length} of {mockProducts.length} pieces available</p>
                    </motion.div>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '3rem' }}>
                {/* Filters */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search products or artisans..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', fontSize: '0.95rem', background: 'white', outline: 'none' }}
                        />
                        {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><X size={16} /></button>}
                    </div>
                    <select
                        value={sort}
                        onChange={e => setSort(e.target.value)}
                        style={{ padding: '0.9rem 1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', fontSize: '0.95rem', background: 'white', cursor: 'pointer', outline: 'none' }}
                    >
                        <option value="featured">Featured First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>

                {/* Category Tabs */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)}
                            style={{
                                padding: '0.55rem 1.4rem', borderRadius: 'var(--radius-full)', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                                background: category === cat ? 'var(--color-primary)' : 'white',
                                color: category === cat ? 'white' : 'var(--color-text-main)',
                                border: category === cat ? '1px solid var(--color-primary)' : '1px solid var(--color-border)'
                            }}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--color-text-muted)' }}>
                        <p style={{ fontSize: '1.2rem' }}>No products match your search.</p>
                        <button onClick={() => { setSearch(''); setCategory('All'); }} style={{ marginTop: '1rem', padding: '0.75rem 2rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-full)', cursor: 'pointer' }}>Clear Filters</button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {filtered.map((product, i) => {
                            const inCart = cartItems.find(c => c.id === product.id);
                            return (
                                <motion.div key={product.id}
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="product-card"
                                    style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}
                                >
                                    <Link to={`/product/${product.id}`} style={{ display: 'block', position: 'relative', overflow: 'hidden', height: '280px' }}>
                                        <img src={product.image} alt={product.name} className="product-image"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                                        {product.featured && (
                                            <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--color-secondary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>Featured</span>
                                        )}
                                        {product.stock <= 3 && (
                                            <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>Only {product.stock} left!</span>
                                        )}
                                    </Link>
                                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.category}</span>
                                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)', margin: '0.4rem 0', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>{product.name}</h3>
                                        </Link>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <Star size={12} fill="var(--color-secondary)" color="var(--color-secondary)" />
                                            {product.artisan}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                            <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)' }}>${product.price}</span>
                                            <button onClick={() => handleAddToCart(product)}
                                                style={{
                                                    padding: '0.65rem 1.3rem', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-primary)',
                                                    background: inCart ? 'var(--color-primary)' : 'white',
                                                    color: inCart ? 'white' : 'var(--color-primary)',
                                                    fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s'
                                                }}>
                                                <ShoppingBag size={16} /> {inCart ? `In Cart (${inCart.qty})` : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
