import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    HiMail,
    HiPhone,
    HiLocationMarker,
} from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send to a backend
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const contactInfo = [
        { icon: <HiMail />, label: 'Email', value: 'sithija@eonsyntax.com', href: 'mailto:sithija@eonsyntax.com' },
        { icon: <HiPhone />, label: 'Phone', value: '+94 764421332', href: 'tel:+94XXXXXXXX' },
        { icon: <HiLocationMarker />, label: 'Location', value: 'Sri Lanka', href: '#' },
    ];

    const socials = [
        { icon: <FaGithub />, href: '#', label: 'GitHub' },
        { icon: <FaLinkedin />, href: '#', label: 'LinkedIn' },
        { icon: <FaInstagram />, href: '#', label: 'Instagram' },

    ];

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            <div className="orb orb-1 opacity-10" style={{ top: '30%', right: '-15%' }} />
            <div className="orb orb-2 opacity-10" style={{ bottom: '-10%', left: '10%' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase">
                        Get in Touch
                    </span>
                    <h2 className="section-title mt-3">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="section-subtitle">
                        Have a project in mind? Let's discuss how we can work together
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Left - Contact Info */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="glass-card rounded-2xl p-8 h-full">
                            <h3 className="text-xl font-bold text-white font-display mb-6">
                                Contact Information
                            </h3>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                Feel free to reach out. I'm always open to discussing new projects,
                                creative ideas, or opportunities to be part of your visions.
                            </p>

                            <div className="space-y-6 mb-10">
                                {contactInfo.map((info) => (
                                    <a
                                        key={info.label}
                                        href={info.href}
                                        className="flex items-center gap-4 group"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center text-accent-purple group-hover:bg-accent-purple/20 transition-colors">
                                            <span className="text-xl">{info.icon}</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 uppercase tracking-wider">
                                                {info.label}
                                            </span>
                                            <p className="text-white text-sm font-medium group-hover:text-accent-cyan transition-colors">
                                                {info.value}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-wider mb-4">Follow Me</p>
                                <div className="flex gap-3">
                                    {socials.map((s) => (
                                        <motion.a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent-purple/20 transition-all"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {s.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Contact Form */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-dark-100 border border-white/5 text-white placeholder-gray-600 focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Your Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-dark-100 border border-white/5 text-white placeholder-gray-600 focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="text-sm text-gray-400 mb-2 block">Subject</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-dark-100 border border-white/5 text-white placeholder-gray-600 focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all"
                                    placeholder="Project Discussion"
                                />
                            </div>

                            <div className="mb-8">
                                <label className="text-sm text-gray-400 mb-2 block">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-dark-100 border border-white/5 text-white placeholder-gray-600 focus:border-accent-purple focus:outline-none focus:ring-1 focus:ring-accent-purple/50 transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="btn-primary w-full text-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {submitted ? '✓ Message Sent!' : 'Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
