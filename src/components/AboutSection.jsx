import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    HiAcademicCap,
    HiCode,
    HiShieldCheck,
    HiDeviceMobile,
    HiCog,
    HiGlobeAlt,
} from 'react-icons/hi';

const skills = [
    { name: 'React / Next.js', level: 90 },
    { name: 'Node.js / Express', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Cybersecurity', level: 88 },
    { name: 'React Native', level: 75 },
    { name: 'Docker / DevOps', level: 70 },
    { name: 'MongoDB / SQL', level: 82 },
    { name: 'Tailwind / CSS', level: 92 },
];

const timeline = [
    { year: '2021', title: 'O/L Examination', desc: 'Successfully passed Ordinary Level examination' },
    { year: '2023', title: 'A/L Examination', desc: 'Successfully passed Advanced Level examination' },
    { year: '2024', title: 'HND in Cyber Security', desc: 'Higher National Diploma in Cybersecurity' },
    { year: '2025', title: 'BSc in Computing', desc: 'Bachelor of Science degree in Computing' },
    { year: '2025', title: 'Founded EON SYNTAX', desc: 'Established IT company specializing in digital solutions' },
];

const SkillBar = ({ name, level, delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <div ref={ref} className="mb-4">
            <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-300">{name}</span>
                <span className="text-sm font-mono text-accent-purple">{level}%</span>
            </div>
            <div className="h-2 rounded-full bg-dark-100 overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{
                        background: 'linear-gradient(90deg, #8b5cf6, #00d4ff)',
                    }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: delay * 0.1, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};

const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="relative py-24 overflow-hidden">
            <div className="orb orb-3 opacity-20" />

            <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase">
                        About Me
                    </span>
                    <h2 className="section-title mt-3">
                        Know <span className="gradient-text">Who I Am</span>
                    </h2>
                    <p className="section-subtitle">
                        A passionate IT professional from Sri Lanka, turning ideas into reality
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Left - Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Profile Card */}
                        <div className="glass-card rounded-2xl p-8 mb-8">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center text-3xl font-display font-bold text-white">
                                    SP
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white font-display">
                                        Sithija Prabhash Ekanayake
                                    </h3>
                                    <p className="text-accent-cyan font-mono text-sm">
                                        Founder & CEO @ EON SYNTAX
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                I'm a 23-year-old IT professional born on March 22, 2003, based in the beautiful island of Sri Lanka.
                                With a strong foundation in both cybersecurity and software engineering, I founded
                                <span className="text-accent-cyan font-semibold"> EON SYNTAX</span> — an IT company
                                dedicated to delivering innovative digital solutions that empower businesses and individuals.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                My expertise spans across web development, mobile app development, system automation,
                                and software development. I believe in creating technology that not only looks stunning
                                but also makes a meaningful impact. Every line of code I write is driven by passion
                                and a commitment to excellence.
                            </p>
                        </div>

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: <HiGlobeAlt />, label: 'Location', value: 'Sri Lanka' },
                                { icon: <HiAcademicCap />, label: 'Education', value: 'BSc Computing' },
                                { icon: <HiShieldCheck />, label: 'Specialty', value: 'Cybersecurity' },
                                { icon: <HiCode />, label: 'Company', value: 'EON SYNTAX' },
                            ].map((item) => (
                                <div key={item.label} className="glass-card rounded-xl p-4 text-center">
                                    <span className="text-2xl text-accent-purple block mb-2">{item.icon}</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</span>
                                    <p className="text-white font-semibold text-sm mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Skills & Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Skills */}
                        <div className="glass-card rounded-2xl p-8 mb-8">
                            <h3 className="text-lg font-bold text-white mb-6 font-display flex items-center gap-2">
                                <HiCode className="text-accent-cyan" /> Technical Skills
                            </h3>
                            {skills.map((skill, i) => (
                                <SkillBar key={skill.name} {...skill} delay={i} />
                            ))}
                        </div>

                        {/* Timeline */}
                        <div className="glass-card rounded-2xl p-8">
                            <h3 className="text-lg font-bold text-white mb-6 font-display flex items-center gap-2">
                                <HiAcademicCap className="text-accent-purple" /> Education & Journey
                            </h3>
                            <div className="relative">
                                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent-purple to-accent-cyan" />
                                {timeline.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex gap-4 mb-5 last:mb-0"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.5 + i * 0.1 }}
                                    >
                                        <div className="w-4 h-4 rounded-full bg-accent-purple border-2 border-dark mt-1 shrink-0 relative z-10" />
                                        <div>
                                            <span className="text-xs font-mono text-accent-cyan">{item.year}</span>
                                            <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                                            <p className="text-gray-500 text-xs">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
