import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const roles = [
    'Web Developer',
    'Cybersecurity Specialist',
    'Mobile App Developer',
    'System Automator',
    'Software Engineer',
    'IT Entrepreneur',
];

const HeroSection = () => {
    const orbRef = useRef(null);
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Orb GSAP animation
    useEffect(() => {
        if (orbRef.current) {
            gsap.to(orbRef.current, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: 'none',
            });
        }
    }, []);

    // Typewriter effect
    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (!isDeleting && displayText === currentRole) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else if (isDeleting) {
            timeout = setTimeout(() => {
                setDisplayText((prev) => prev.slice(0, -1));
            }, 30);
        } else {
            timeout = setTimeout(() => {
                setDisplayText(currentRole.slice(0, displayText.length + 1));
            }, 80);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, roleIndex]);

    // Floating particles
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const particles = Array.from({ length: isMobile ? 6 : 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 8 + 4,
        delay: Math.random() * 4,
    }));

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background grid */}
            <div className="absolute inset-0 line-grid opacity-30" />

            {/* Orbs */}
            <div className="orb orb-1 animate-float" />
            <div className="orb orb-2 animate-float-slow" />

            {/* Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="particle"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: p.id % 2 === 0 ? 'rgba(139,92,246,0.5)' : 'rgba(0,212,255,0.5)',
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">


                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-4"
                        >
                            I'm{' '}
                            <span className="gradient-text">Sithija</span>
                            <br />
                            <span className="text-white">Ekanayake</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-xl md:text-2xl text-gray-400 mb-8 h-10"
                        >
                            <span className="text-accent-purple font-mono">{displayText}</span>
                            <span className="animate-pulse text-accent-cyan">|</span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0"
                        >
                            Founder & CEO of <span className="text-accent-cyan font-semibold">EON SYNTAX</span>.
                            Passionate about building innovative digital solutions — from secure enterprise systems
                            to cutting-edge web & mobile applications.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        >
                            <a href="#projects" className="btn-primary">
                                View My Work
                            </a>
                            <a href="#contact" className="btn-outline">
                                Get in Touch
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex gap-8 mt-12 justify-center lg:justify-start"
                        >
                            {[
                                { num: '50+', label: 'Projects' },
                                { num: '30+', label: 'Clients' },
                                { num: '3+', label: 'Years Exp' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold gradient-text font-display">
                                        {stat.num}
                                    </div>
                                    <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right - Orb */}
                    <motion.div
                        className="flex-1 flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className="hero-orb-container" ref={orbRef}>
                            <div className="hero-orb" />
                            {/* Orbiting rings */}
                            <div className="absolute inset-[-20px] rounded-full border border-accent-purple/20 animate-spin-slow" />
                            <div className="absolute inset-[-40px] rounded-full border border-accent-cyan/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
                            <div className="absolute inset-[-60px] rounded-full border border-accent-pink/10 animate-spin-slow" style={{ animationDuration: '40s' }} />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center pt-2">
                    <div className="w-1.5 h-3 rounded-full bg-accent-purple animate-pulse" />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
