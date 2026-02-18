import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { getProjects } from '../utils/dataStore';
import { HiExternalLink, HiCode } from 'react-icons/hi';

const categories = ['All', 'Web Development', 'Cybersecurity', 'Mobile App', 'System Automation'];

const ProjectCard = ({ project, index }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="glass-card rounded-2xl overflow-hidden group"
    >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
            <img
                src={project.image || 'https://placehold.co/600x400/1a1f35/8b5cf6?text=Project+Preview'}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />

            {/* Overlay Links */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-dark/50">
                <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-accent-purple/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <HiExternalLink className="text-xl" />
                </motion.a>
                <motion.a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-accent-cyan/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <HiCode className="text-xl" />
                </motion.a>
            </div>

            {/* Category badge */}
            <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full glass text-xs font-mono text-accent-cyan">
                    {project.category}
                </span>
            </div>
        </div>

        {/* Content */}
        <div className="p-6">
            <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-accent-cyan transition-colors">
                {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
                {(project.techStack || []).map((tech) => (
                    <span
                        key={tech}
                        className="px-2 py-1 rounded-md bg-dark-100 text-xs font-mono text-gray-400"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

const ProjectsSection = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const projects = getProjects();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const filteredProjects =
        activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    return (
        <section id="projects" className="relative py-24 overflow-hidden">
            <div className="orb orb-2 opacity-15" style={{ bottom: '10%', left: '-5%' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase">
                        Portfolio
                    </span>
                    <h2 className="section-title mt-3">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle">
                        A showcase of my latest work and creative solutions
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                ? 'bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-lg shadow-accent-purple/20'
                                : 'glass text-gray-400 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;
