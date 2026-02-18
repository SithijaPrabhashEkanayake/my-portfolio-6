import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { getServices } from '../utils/dataStore';
import {
    HiGlobeAlt,
    HiShieldCheck,
    HiDeviceMobile,
    HiCog,
    HiCode,
    HiLightBulb,
} from 'react-icons/hi';

const iconMap = {
    web: HiGlobeAlt,
    security: HiShieldCheck,
    mobile: HiDeviceMobile,
    automation: HiCog,
    software: HiCode,
    consulting: HiLightBulb,
};

const ServiceCard = ({ service, index }) => {
    const Icon = iconMap[service.icon] || HiCode;

    return (
        <motion.div
            className="glass-card rounded-2xl p-8 group cursor-pointer relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
        >
            {/* Gradient accent on hover */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 flex items-center justify-center mb-6 group-hover:from-accent-purple/30 group-hover:to-accent-cyan/30 transition-all duration-300">
                <Icon className="text-2xl text-accent-purple group-hover:text-accent-cyan transition-colors" />
            </div>

            <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-accent-cyan transition-colors">
                {service.title}
            </h3>

            <p className="text-gray-400 leading-relaxed text-sm">
                {service.description}
            </p>

            <div className="mt-6 flex items-center gap-2 text-accent-purple text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </motion.div>
    );
};

const ServicesSection = () => {
    const services = getServices();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="services" className="relative py-24 overflow-hidden">
            <div className="orb orb-1 opacity-10" style={{ top: '20%', right: '-10%' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase">
                        What I Do
                    </span>
                    <h2 className="section-title mt-3">
                        My <span className="gradient-text">Services</span>
                    </h2>
                    <p className="section-subtitle">
                        Comprehensive IT solutions to transform your digital presence and operations
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <ServiceCard key={service.id} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
