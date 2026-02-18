import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center font-display font-bold text-white text-lg">
                            S
                        </div>
                        <span className="font-display font-bold text-xl text-white">
                            Sithija<span className="text-accent-purple">.</span>
                        </span>
                    </div>

                    {/* Links removed as per request */}

                    {/* Social */}
                    <div className="flex gap-3">
                        {[
                            { icon: <FaGithub />, href: '#' },
                            { icon: <FaLinkedin />, href: '#' },
                            { icon: <FaTwitter />, href: '#' },
                            { icon: <FaInstagram />, href: '#' },
                        ].map((s, i) => (
                            <motion.a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent-purple/20 transition-all"
                                whileHover={{ scale: 1.1, y: -2 }}
                            >
                                {s.icon}
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Sithija Ekanayake. Made with{' '}
                        <FaHeart className="inline text-accent-pink text-xs animate-pulse" />{' '}
                        in Sri Lanka. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
