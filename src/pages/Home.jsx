import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, Heart, ShoppingBag, Eye, Leaf, Infinity, Award } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { mockProducts } from '../data';

export default function Home() {
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const { scrollY } = useScroll();

    // Parallax effect for hero section
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
    const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

    const featuredProducts = mockProducts.filter(p => p.featured).slice(0, 4);

    const categories = [
        { id: 1, name: 'Sarees', image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800' },
        { id: 2, name: 'Kurtas & Shirts', image: 'https://images.unsplash.com/photo-1595341595011-82d8c3066d4f?auto=format&fit=crop&q=80&w=800' },
        { id: 3, name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800' },
        { id: 4, name: 'Accessories', image: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&q=80&w=800' }
    ];

    const handleAddToCart = (productName) => {
        setToastMessage(`Added ${productName} to your cart!`);
        setTimeout(() => setToastMessage(''), 3000);
    };

    // Reusable animation variants
    const fadeUpVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="page home-page" style={{ paddingBottom: '0' }}>

            {/* Toast Notification */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: toastMessage ? 0 : 100, opacity: toastMessage ? 1 : 0 }}
                style={{
                    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
                    background: 'var(--color-primary)', color: 'white', padding: '1rem 2rem',
                    borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                <ShoppingBag size={20} /> <span style={{ fontWeight: 500 }}>{toastMessage}</span>
            </motion.div>

            {/* Hero Section */}
            <section className="hero" style={{
                position: 'relative',
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                background: 'var(--color-bg-main)',
                overflow: 'hidden',
                padding: '4rem 0'
            }}>
                {/* Premium Abstract Background Elements */}
                <motion.div style={{ y: y1, position: 'absolute', top: '-10%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(155,112,78,0.06) 0%, rgba(250,250,248,0) 70%)', borderRadius: '50%', zIndex: 0, filter: 'blur(40px)' }} />
                <motion.div style={{ y: y2, position: 'absolute', bottom: '-20%', left: '-5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(26,26,26,0.04) 0%, rgba(250,250,248,0) 70%)', borderRadius: '50%', zIndex: 0, filter: 'blur(40px)' }} />

                <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(450px, 1.1fr) 1fr', gap: '5rem', alignItems: 'center', width: '100%' }}>

                    {/* Text Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        style={{ opacity: opacityHero }}
                    >
                        <motion.div variants={fadeUpVariant}>
                            <span style={{
                                display: 'inline-block', padding: '0.4rem 1.2rem', background: 'rgba(155, 112, 78, 0.1)',
                                color: 'var(--color-secondary-dark)', borderRadius: 'var(--radius-full)', fontWeight: 600,
                                fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '2rem',
                                border: '1px solid rgba(155, 112, 78, 0.2)'
                            }}>
                                Authentic & Sustainable Platform
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeUpVariant} style={{ fontSize: '4rem', fontWeight: '400', lineHeight: '1.05', marginBottom: '1.5rem', color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
                            Woven with <span style={{ fontStyle: 'italic', color: 'var(--color-secondary)' }}>Tradition</span>,<br />
                            <span style={{ fontWeight: 600 }}>Tailored for the World.</span>
                        </motion.h1>

                        <motion.p variants={fadeUpVariant} style={{ fontSize: '1.15rem', marginBottom: '3rem', color: 'var(--color-text-muted)', maxWidth: '550px', lineHeight: 1.8, fontWeight: 300 }}>
                            Discover authentic, ethically sourced handloom fashion. Buying directly from master artisans ensures fair trade and preserves irreplaceable ancient crafts.
                        </motion.p>

                        <motion.div variants={fadeUpVariant} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <button onClick={() => {
                                document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
                            }} className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1rem' }}>
                                Shop Collection <ArrowRight size={18} />
                            </button>
                            <Link to="/login" className="btn btn-secondary" style={{ padding: '1.2rem 2.5rem', fontSize: '1rem', border: '1px solid transparent', borderBottom: '1px solid var(--color-border)', borderRadius: 0 }}>
                                Artisan Portal
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={fadeUpVariant} style={{ display: 'flex', gap: '3.5rem', marginTop: '4.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '2.5rem' }}>
                            <div>
                                <h4 style={{ fontSize: '2.2rem', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-main)', letterSpacing: '-0.03em' }}>500+</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Master Artisans</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '2.2rem', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'var(--font-main)', letterSpacing: '-0.03em' }}>12k+</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Authentic Pieces</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Hero Image Collage */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        style={{ position: 'relative', height: '650px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <motion.img
                            src="https://images.unsplash.com/photo-1583391733959-b1d6db0b5b15?auto=format&fit=crop&q=80&w=800"
                            alt="Jamdani Saree"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                width: '70%', height: '85%', objectFit: 'cover', borderRadius: '4px',
                                boxShadow: 'var(--shadow-xl)', position: 'absolute', right: '0', zIndex: 1,
                            }}
                        />
                        <motion.img
                            src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=600"
                            alt="Silk Saree"
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            style={{
                                width: '55%', height: '65%', objectFit: 'cover', borderRadius: '4px',
                                boxShadow: 'var(--shadow-lg)', position: 'absolute', left: '-5%', bottom: '5%', zIndex: 2,
                                border: '12px solid var(--color-bg-main)'
                            }}
                        />
                        {/* Glass badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="glass-panel" style={{
                                position: 'absolute', top: '15%', left: '-10%', display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '1rem 1.5rem', zIndex: 3
                            }}>
                            <div style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-primary)', padding: '0.6rem', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
                                <Leaf size={20} />
                            </div>
                            <div>
                                <p style={{ fontWeight: 600, margin: 0, color: 'var(--color-primary)', fontSize: '0.9rem' }}>100% Organic</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>Natural Fibers</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ padding: '8rem 0', background: 'white' }}>
                <div className="container">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariant}
                        style={{ textAlign: 'center', marginBottom: '5rem' }}
                    >
                        <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', fontWeight: 400 }}>The Handloom Promise</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto 0', fontWeight: 300, lineHeight: 1.8 }}>
                            We're changing how the world buys ethnic fashion. Transparent, ethical, and incredibly high quality.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
                        {[
                            { icon: Infinity, title: 'Sustainable', desc: 'Slow fashion made with pure natural fibers and eco-friendly dyes reducing carbon footprint.' },
                            { icon: ShieldCheck, title: 'Authentic & Verified', desc: 'Every product is hand-checked for authenticity, ensuring no power-loom fakes.' },
                            { icon: Heart, title: 'Fair Trade', desc: 'Direct market access empowers artisans to earn exactly what they deserve.' },
                            { icon: Award, title: 'Heirloom Quality', desc: 'Craftsmanship passed down through generations, built to last a lifetime.' }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }
                                }}
                                style={{ textAlign: 'center', padding: '2rem 1rem' }}
                            >
                                <div style={{
                                    color: 'white', width: '64px', height: '64px',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 1.5rem', background: 'var(--color-secondary)', boxShadow: 'var(--shadow-md)'
                                }}>
                                    <feature.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-primary)', fontWeight: 700 }}>{feature.title}</h3>
                                <p style={{ color: 'var(--color-text-main)', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 400 }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Payable Catalog - Trending Now */}
            <section id="trending" style={{ padding: '8rem 0', background: 'var(--color-bg-main)' }}>
                <div className="container">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariant}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}
                    >
                        <div>
                            <span style={{ color: 'var(--color-secondary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Curated Collection</span>
                            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginTop: '0.5rem', fontWeight: 400 }}>Trending Pieces</h2>
                        </div>
                        <Link to="/buyer" className="btn btn-secondary" style={{ padding: '0.8rem 2rem' }}>View Full Catalog</Link>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
                        {featuredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="product-card"
                                style={{ padding: 0, display: 'flex', flexDirection: 'column', position: 'relative', background: 'transparent' }}
                            >

                                {/* Image & Quick View Hover */}
                                <div style={{ position: 'relative', height: '400px', overflow: 'hidden', borderRadius: '4px', marginBottom: '1.5rem' }} className="image-container">
                                    <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', color: 'var(--color-primary)', padding: '0.3rem 0.8rem', borderRadius: '2px', fontSize: '0.75rem', fontWeight: 600, zIndex: 2, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                        {product.category}
                                    </span>
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }} className="product-image" />

                                    {/* Overlay Actions */}
                                    <div className="overlay-actions" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.4))', display: 'flex', gap: '0.5rem', zIndex: 2, opacity: 0, transform: 'translateY(10px)', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                        <button className="btn btn-primary" style={{ flex: 1, padding: '0.8rem', background: 'white', color: 'var(--color-primary)', borderRadius: '2px' }} onClick={() => handleAddToCart(product.name)}>
                                            <ShoppingBag size={18} /> Quick Add
                                        </button>
                                        <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', padding: '0.8rem', borderRadius: '2px' }}>
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)' }}>{product.name}</h3>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-primary)' }}>${product.price}</span>
                                    </div>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 300 }}>
                                        <Star size={14} fill="var(--color-secondary)" color="var(--color-secondary)" /> Artisan {product.artisan}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Explore Categories */}
            <section style={{ padding: '8rem 0', background: 'white' }}>
                <div className="container">
                    <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariant}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', fontWeight: 400 }}>Explore by Craft</h2>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="category-card" style={{
                                    position: 'relative', overflow: 'hidden', height: '400px', cursor: 'pointer', borderRadius: '4px'
                                }}>
                                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="cat-image" />
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem 2rem',
                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: 'white',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2
                                }}>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: '400', fontFamily: 'var(--font-serif)', letterSpacing: '0.02em' }}>{cat.name}</h3>
                                    <div className="cat-arrow" style={{ padding: '0.5rem', display: 'flex', transition: 'transform 0.3s ease' }}>
                                        <ArrowRight size={24} color="white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section style={{ padding: '8rem 0', background: 'var(--color-primary)', color: 'white' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{ fontSize: '3.5rem', fontWeight: 400, marginBottom: '1.5rem', color: 'white', fontFamily: 'var(--font-serif)' }}>Join the Movement</h2>
                        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem', fontWeight: 300, lineHeight: 1.8 }}>
                            Subscribe to get exclusive early access to new collections and artisanal stories. Get 10% off your first authentic handloom purchase.
                        </p>
                        <form style={{ display: 'flex', gap: '0.5rem', maxWidth: '500px', margin: '0 auto', background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: 'var(--radius-full)' }} onSubmit={e => { e.preventDefault(); alert('Subscribed successfully!'); }}>
                            <input type="email" placeholder="Email address..." style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: 'var(--radius-full)', border: 'none', fontSize: '1rem', outline: 'none', background: 'transparent', color: 'white' }} required />
                            <button type="submit" className="btn" style={{ padding: '1rem 2rem', background: 'white', color: 'var(--color-primary)', borderRadius: 'var(--radius-full)' }}>Subscribe</button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Comprehensive Footer */}
            <footer style={{ background: 'var(--color-primary-dark)', color: 'white', padding: '5rem 0 2rem 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
                    <div>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: 'var(--font-serif)', color: 'white' }}>
                                Handloom<span style={{ color: 'var(--color-secondary)' }}>.</span>
                            </span>
                        </Link>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '300px' }}>Empowering artisans worldwide by connecting them directly with conscious consumers.</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 600 }}>Shop</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Sarees</Link></li>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Kurtas</Link></li>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Home Decor</Link></li>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Accessories</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 600 }}>About</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Our Story</Link></li>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Artisans</Link></li>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Sustainability</Link></li>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 600 }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Terms of Service</Link></li>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Privacy Policy</Link></li>
                            <li><Link to="#" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                    <p>&copy; {new Date().getFullYear()} Handloom. All rights reserved.</p>
                </div>
            </footer>

            {/* Dynamic CSS injections for hover effects */}
            <style>{`
                .product-card:hover .product-image { transform: scale(1.05); }
                .product-card:hover .overlay-actions { opacity: 1; transform: translateY(0); }
                .category-card:hover .cat-image { transform: scale(1.08); }
                .category-card:hover .cat-arrow { transform: translateX(8px); }
                input::placeholder { color: rgba(255,255,255,0.5); }
            `}</style>
        </div>
    );
}
