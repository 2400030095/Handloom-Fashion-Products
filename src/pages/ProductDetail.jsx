import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Heart, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { mockProducts } from '../data';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = mockProducts.find(p => p.id === parseInt(id));
    const { addToCart, cartItems } = useCart();
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const [selectedImage, setSelectedImage] = useState(product?.image);

    // Reset selected image when product changes
    if (product && selectedImage !== product.image && !product.alternateImages?.includes(selectedImage)) {
        setSelectedImage(product.image);
    }

    if (!product) {
        return (
            <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
                <h2 style={{ color: 'var(--color-primary)' }}>Product not found</h2>
                <Link to="/collections" style={{ color: 'var(--color-secondary)', textDecoration: 'underline', marginTop: '1rem', display: 'inline-block' }}>Back to Collections</Link>
            </div>
        );
    }

    const related = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    const inCart = cartItems.find(c => c.id === product.id);

    const handleAddToCart = () => {
        for (let i = 0; i < qty; i++) addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 3000);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-main)', paddingBottom: '6rem' }}>
            <div className="container" style={{ paddingTop: '6rem' }}>
                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Home</Link>
                    <span>/</span>
                    <Link to="/collections" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Collections</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{product.name}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start', marginBottom: '6rem' }}>
                    {/* Image */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
                        style={{ position: 'sticky', top: '6rem' }}>
                        <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', position: 'relative', marginBottom: '1rem' }}>
                            <img src={selectedImage} alt={product.name}
                                onError={(e) => {
                                    if (!e.target.dataset.tried && product.alternateImages?.[0]) {
                                        e.target.dataset.tried = '1';
                                        e.target.src = product.alternateImages[0];
                                    }
                                }}
                                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', transition: 'opacity 0.3s' }}
                            />
                            {product.featured && (
                                <span style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'var(--color-secondary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '4px', fontWeight: 600 }}>
                                    Featured Piece
                                </span>
                            )}
                        </div>
                        {/* Thumbnails */}
                        {product.alternateImages && product.alternateImages.length > 0 && (
                            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                                {[product.image, ...product.alternateImages].map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        style={{
                                            width: '80px', height: '80px', flexShrink: 0, padding: 0, border: selectedImage === img ? '2px solid var(--color-primary)' : '2px solid transparent',
                                            borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s'
                                        }}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Details */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                        <span style={{ color: 'var(--color-secondary)', fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.8rem', textTransform: 'uppercase' }}>{product.category}</span>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 400, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', margin: '0.5rem 0 1rem', lineHeight: 1.2 }}>{product.name}</h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '2px' }}>
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="var(--color-secondary)" color="var(--color-secondary)" />)}
                            </div>
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>4.9 (128 reviews)</span>
                        </div>

                        <p style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1.5rem', lineHeight: 1 }}>${product.price}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1.2rem', background: 'rgba(155, 112, 78, 0.08)', borderRadius: '8px', marginBottom: '2rem' }}>
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-primary)' }}>{product.artisan[0]}</span>
                            </div>
                            <div>
                                <p style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.95rem' }}>By {product.artisan}</p>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>Verified Master Artisan</p>
                            </div>
                        </div>

                        <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1rem' }}>{product.description}</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Stock:</span>
                            <span style={{ color: product.stock <= 3 ? '#ef4444' : '#16a34a', fontWeight: 600 }}>
                                {product.stock <= 3 ? `⚠ Only ${product.stock} left` : `${product.stock} available`}
                            </span>
                        </div>

                        {/* Qty Selector */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>Quantity:</span>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '0.6rem 1.2rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--color-primary)' }}>−</button>
                                <span style={{ padding: '0.6rem 1.5rem', fontWeight: 600, borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}>{qty}</span>
                                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} style={{ padding: '0.6rem 1.2rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--color-primary)' }}>+</button>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
                            <button onClick={handleAddToCart}
                                style={{ flex: 1, padding: '1.1rem', borderRadius: 'var(--radius-full)', background: added ? '#16a34a' : 'var(--color-primary)', color: 'white', border: 'none', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.3s' }}>
                                <ShoppingBag size={20} /> {added ? '✓ Added to Cart' : inCart ? `Add More (${inCart.qty} in cart)` : 'Add to Cart'}
                            </button>
                            <button onClick={() => setWishlist(w => !w)}
                                style={{ padding: '1.1rem 1.5rem', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-border)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                                <Heart size={22} fill={wishlist ? '#ef4444' : 'none'} color={wishlist ? '#ef4444' : 'var(--color-primary)'} />
                            </button>
                        </div>

                        {/* View Cart */}
                        {(inCart || added) && (
                            <Link to="/cart" style={{ display: 'block', textAlign: 'center', padding: '0.9rem', borderRadius: 'var(--radius-full)', border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600, marginBottom: '2rem' }}>
                                View Cart →
                            </Link>
                        )}

                        {/* Trust Badges */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            {[
                                { icon: <Truck size={18} />, text: 'Free Shipping', sub: 'Orders over $50' },
                                { icon: <ShieldCheck size={18} />, text: 'Authentic', sub: 'Verified Handloom' },
                                { icon: <RefreshCcw size={18} />, text: 'Easy Returns', sub: '30-day policy' }
                            ].map((badge, i) => (
                                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: 'white', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                                    <div style={{ color: 'var(--color-secondary)', marginBottom: '0.4rem', display: 'flex', justifyContent: 'center' }}>{badge.icon}</div>
                                    <p style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-primary)' }}>{badge.text}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{badge.sub}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', marginBottom: '2.5rem' }}>You May Also Love</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
                            {related.map(p => (
                                <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                                    <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
                                        <img src={p.image} alt={p.name}
                                            onError={(e) => {
                                                if (p.alternateImages?.[0]) e.target.src = p.alternateImages[0];
                                            }}
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                        <div style={{ padding: '1rem' }}>
                                            <h4 style={{ fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', marginBottom: '0.3rem' }}>{p.name}</h4>
                                            <p style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>${p.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
