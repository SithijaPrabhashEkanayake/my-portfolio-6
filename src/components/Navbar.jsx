import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'py-5 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#home"
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center font-display font-bold text-white text-lg">
                        S
                    </div>
                    <span className="font-display font-bold text-xl text-white hidden sm:block">
                        Sithija<span className="text-accent-purple">.</span>
                    </span>
                </motion.a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-gray-300 hover:text-white text-sm font-medium tracking-wide relative group transition-colors"
                            whileHover={{ y: -2 }}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-purple to-accent-cyan group-hover:w-full transition-all duration-300" />
                        </motion.a>
                    ))}
                    <motion.a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="btn-primary text-sm !px-6 !py-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Hire Me
                    </motion.a>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-white text-2xl"
                >
                    {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-gray-300 hover:text-white py-2 text-lg font-medium"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, '#contact')}
                                className="btn-primary text-center mt-2"
                            >
                                Hire Me
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
