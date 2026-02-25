import { motion } from 'framer-motion';
import { Leaf, Heart, Globe, Award } from 'lucide-react';

export default function OurStory() {
    const milestones = [
        { year: '2018', title: 'The Beginning', desc: 'Founded in a small workshop in Varanasi, with 5 artisan families and a dream to take Indian handlooms global.' },
        { year: '2020', title: 'Going Digital', desc: 'Launched our digital marketplace, connecting artisans directly to conscious consumers across 40+ countries.' },
        { year: '2022', title: '500 Artisans Strong', desc: 'Our community grew to over 500 master artisans from 18 states, preserving dying textile traditions.' },
        { year: '2024', title: 'Global Recognition', desc: 'Featured in Vogue India, Business Standard, and awarded the National Textile Excellence Award.' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--color-bg-main)', paddingBottom: '0' }}>
            {/* Hero */}
            <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', background: 'var(--color-primary)', padding: '8rem 5%', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=40&w=1800)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
                <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '750px' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Our Story</span>
                        <h1 style={{ fontSize: '4rem', fontWeight: 400, color: 'white', fontFamily: 'var(--font-serif)', margin: '1rem 0 2rem', lineHeight: 1.1 }}>
                            Where Every Thread Tells a <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>Story</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontWeight: 300 }}>
                            We believe handloom is not just fabric — it is heritage, it is livelihood, it is art. Our mission is to bridge the gap between master artisans and the world.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Cards */}
            <section style={{ padding: '6rem 0', background: 'white' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>What We Stand For</h2>
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
                        {[
                            { icon: <Heart size={28} />, title: 'Artisan First', desc: 'Artisans earn 70-80% of the product price — far above the industry average of 15-20%. We believe creators should be compensated fairly.' },
                            { icon: <Leaf size={28} />, title: 'Sustainably Made', desc: 'All products use natural fibers and eco-friendly dyes. We have a zero-plastic packaging policy and offset our carbon footprint.' },
                            { icon: <Globe size={28} />, title: 'Globally Loved', desc: 'Shipping to 50+ countries, making authentic Indian handloom accessible to conscious consumers worldwide.' },
                            { icon: <Award size={28} />, title: 'Heritage Preserved', desc: 'We document and teach 40+ endangered weaving techniques to the next generation, ensuring they are never lost.' },
                        ].map((item, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                style={{ padding: '2.5rem 2rem', background: 'var(--color-bg-main)', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.75rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section style={{ padding: '6rem 0', background: 'var(--color-bg-main)' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', marginBottom: '4rem', textAlign: 'center' }}>Our Journey</h2>
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--color-border)', transform: 'translateX(-50%)' }} />
                        {milestones.map((m, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                                style={{ display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', gap: '2rem', alignItems: 'center', marginBottom: '3rem' }}>
                                <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                                    <h3 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{m.title}</h3>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>{m.desc}</p>
                                </div>
                                <div style={{ flexShrink: 0, width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', zIndex: 1 }}>{m.year}</div>
                                <div style={{ flex: 1 }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team / Stats */}
            <section style={{ padding: '6rem 0', background: 'var(--color-primary)', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 400, fontFamily: 'var(--font-serif)', marginBottom: '4rem' }}>The Numbers Speak</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
                        {[['500+', 'Master Artisans'], ['12,000+', 'Products Listed'], ['50+', 'Countries Served'], ['₹2.5Cr+', 'Paid to Artisans']].map(([num, label]) => (
                            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <p style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>{num}</p>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
