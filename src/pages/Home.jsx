import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, Heart, ShoppingBag, Eye, Leaf, Infinity, Award } from 'lucide-react';
import { mockProducts } from '../data';

export default function Home() {
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState('');

    const featuredProducts = mockProducts.filter(p => p.featured).slice(0, 4);

    const categories = [
        { id: 1, name: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800' },
        { id: 2, name: 'Kurtas & Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800' },
        { id: 3, name: 'Home Decor', image: 'https://images.unsplash.com/photo-1575414003593-eea4025ea031?auto=format&fit=crop&q=80&w=800' },
        { id: 4, name: 'Accessories', image: 'https://images.unsplash.com/photo-1584968153915-d7286ab2e535?auto=format&fit=crop&q=80&w=800' }
    ];

    const handleAddToCart = (productName) => {
        setToastMessage(`Added ${productName} to your cart!`);
        setTimeout(() => setToastMessage(''), 3000);
    };

    return (
        <div className="page home-page" style={{ paddingBottom: '0' }}>

            {/* Toast Notification */}
            {toastMessage && (
                <div style={{
                    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
                    background: 'var(--color-secondary)', color: 'white', padding: '1rem 2rem',
                    borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.5rem',
                    boxShadow: 'var(--shadow-lg)', animation: 'slideUp 0.3s ease-out'
                }}>
                    <ShoppingBag size={20} /> <span style={{ fontWeight: 500 }}>{toastMessage}</span>
                </div>
            )}

            {/* Hero Section */}
            <section className="hero" style={{
                position: 'relative',
                minHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                background: 'var(--color-bg-main)',
                overflow: 'hidden',
                padding: '2rem'
            }}>
                {/* Abstract shapes for premium feel */}
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(233,196,106,0.3) 0%, rgba(250,249,246,0) 70%)', borderRadius: '50%', zIndex: 0 }}></div>
                <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,90,43,0.15) 0%, rgba(250,249,246,0) 70%)', borderRadius: '50%', zIndex: 0 }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(400px, 1.2fr) 1fr', gap: '4rem', alignItems: 'center', width: '100%' }}>

                    {/* Text Content */}
                    <div style={{ animation: 'slideUp 0.8s ease-out' }}>
                        <span style={{
                            display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(139, 90, 43, 0.1)',
                            color: 'var(--color-primary)', borderRadius: 'var(--radius-full)', fontWeight: 600,
                            fontSize: '0.875rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem'
                        }}>
                            Authentic & Sustainable Platform
                        </span>
                        <h1 style={{ fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>
                            Woven with <span className="gradient-text">Tradition</span>, <br />Tailored for the World.
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'var(--color-text-muted)', maxWidth: '600px', lineHeight: 1.8 }}>
                            Discover authentic, ethically sourced handloom fashion and decor. Buying directly from master artisans ensures fair trade and preserves irreplaceable ancient crafts.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button onClick={() => {
                                document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
                            }} className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
                                Shop Collection <ArrowRight size={20} />
                            </button>
                            <Link to="/login" className="btn btn-secondary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', background: 'transparent' }}>
                                Artisan Portal
                            </Link>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: '3rem', marginTop: '4rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                            <div>
                                <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>500+</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Master Artisans</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>12k+</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Authentic Products</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>50+</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>Countries Shipped</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image Collage */}
                    <div style={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            src="https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=800"
                            alt="Jamdani Saree"
                            style={{
                                width: '65%', height: '80%', objectFit: 'cover', borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-xl)', position: 'absolute', right: '0', zIndex: 1,
                                animation: 'float 6s ease-in-out infinite'
                            }}
                        />
                        <img
                            src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600"
                            alt="Khadi Shirt"
                            style={{
                                width: '50%', height: '60%', objectFit: 'cover', borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-lg)', position: 'absolute', left: '0', bottom: '5%', zIndex: 2,
                                border: '8px solid white', animation: 'float 7s ease-in-out infinite reverse'
                            }}
                        />
                        {/* Glass badge */}
                        <div className="glass-panel" style={{
                            position: 'absolute', top: '15%', left: '-5%', display: 'flex', alignItems: 'center', gap: '1rem',
                            padding: '1rem 1.5rem', zIndex: 3
                        }}>
                            <div style={{ background: '#e2f5e9', color: '#065f46', padding: '0.5rem', borderRadius: '50%' }}>
                                <Leaf size={24} />
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, margin: 0, color: 'var(--color-text-main)' }}>100% Organic</p>
                                <p style={{ fontSize: '0.8rem', color: 'white', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Natural Fibers</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ padding: '6rem 0', background: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-secondary)' }}>The Handloom Promise</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            We're changing how the world buys ethnic fashion. Transparent, ethical, and incredibly high quality.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: Infinity, title: 'Sustainable', desc: 'Slow fashion made with pure natural fibers and eco-friendly dyes reducing carbon footprint.' },
                            { icon: ShieldCheck, title: 'Authentic & Verified', desc: 'Every product is hand-checked for authenticity, ensuring no power-loom fakes.' },
                            { icon: Heart, title: 'Fair Trade', desc: 'Direct market access empowers artisans to earn exactly what they deserve.' },
                            { icon: Award, title: 'Heirloom Quality', desc: 'Craftsmanship passed down through generations, built to last a lifetime.' }
                        ].map((feature, i) => (
                            <div key={i} className="card" style={{ textAlign: 'center', padding: '3rem 2rem', background: 'var(--color-bg-main)', border: 'none' }}>
                                <div style={{
                                    background: 'var(--color-primary)', color: 'white', width: '60px', height: '60px',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem', boxShadow: '0 4px 15px rgba(139, 90, 43, 0.4)'
                                }}>
                                    <feature.icon size={28} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-secondary)' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Payable Catalog - Trending Now */}
            <section id="trending" style={{ padding: '6rem 0', background: 'var(--color-bg-main)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                        <div>
                            <span style={{ color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Curated Collection</span>
                            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-secondary)', marginTop: '0.5rem' }}>Trending Handlooms</h2>
                        </div>
                        <Link to="/buyer" className="btn btn-secondary">View All Catalog</Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {featuredProducts.map(product => (
                            <div key={product.id} className="card product-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>

                                {/* Image & Quick View Hover */}
                                <div style={{ position: 'relative', height: '350px', overflow: 'hidden' }} className="image-container">
                                    <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'white', color: 'var(--color-secondary)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700, zIndex: 2 }}>
                                        {product.category}
                                    </span>
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)' }} className="product-image" />

                                    {/* Overlay Actions */}
                                    <div className="overlay-actions" style={{ position: 'absolute', bottom: '-4rem', left: 0, right: 0, padding: '1rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', display: 'flex', gap: '0.5rem', transition: 'bottom 0.3s ease', zIndex: 2 }}>
                                        <button className="btn btn-primary" style={{ flex: 1, padding: '0.75rem' }} onClick={() => handleAddToCart(product.name)}>
                                            <ShoppingBag size={18} /> Quick Add
                                        </button>
                                        <button className="btn" style={{ background: 'white', color: 'var(--color-secondary)', padding: '0.75rem' }}>
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-secondary)', lineHeight: 1.3 }}>{product.name}</h3>
                                    </div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Star size={16} fill="var(--color-accent)" color="var(--color-accent)" /> By {product.artisan}
                                    </p>
                                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>${product.price}</span>
                                        <span style={{ fontSize: '0.8rem', color: product.stock > 5 ? '#065f46' : '#991b1b', background: product.stock > 5 ? '#e2f5e9' : '#fee2e2', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                                            {product.stock} in stock
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore Categories */}
            <section style={{ padding: '6rem 0', background: 'white' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-secondary)' }}>Explore by Craft</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {categories.map(cat => (
                            <div key={cat.id} className="category-card" style={{
                                position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '300px', cursor: 'pointer', boxShadow: 'var(--shadow-md)'
                            }}>
                                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} className="cat-image" />
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.5rem',
                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', color: 'white',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2
                                }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{cat.name}</h3>
                                    <div className="cat-arrow" style={{ background: 'var(--color-primary)', padding: '0.5rem', borderRadius: '50%', display: 'flex' }}>
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section style={{ padding: '6rem 0', background: 'var(--color-secondary)', color: 'white' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem' }}>Join the Handloom Movement</h2>
                    <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', marginBottom: '3rem' }}>
                        Subscribe to get exclusive early access to new collections and artisanal stories. Get 10% off your first authentic handloom purchase.
                    </p>
                    <form style={{ display: 'flex', gap: '1rem', maxWidth: '600px', margin: '0 auto' }} onSubmit={e => { e.preventDefault(); alert('Subscribed successfully!'); }}>
                        <input type="email" placeholder="Enter your email address" style={{ flex: 1, padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-full)', border: 'none', fontSize: '1.1rem', outline: 'none' }} required />
                        <button type="submit" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', border: '2px solid var(--color-primary)' }}>Subscribe</button>
                    </form>
                </div>
            </section>

            {/* Dynamic CSS injections for hover effects */}
            <style>{`
        .product-card:hover .product-image { transform: scale(1.08); }
        .product-card:hover .overlay-actions { bottom: 0 !important; }
        .category-card:hover .cat-image { transform: scale(1.05); }
        .category-card .cat-arrow { transition: transform 0.3s ease; }
        .category-card:hover .cat-arrow { transform: translateX(5px); }
      `}</style>
        </div>
    );
}
