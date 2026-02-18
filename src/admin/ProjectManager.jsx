import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects, saveProjects } from '../utils/dataStore';
import { HiPlus, HiPencil, HiTrash, HiX, HiUpload } from 'react-icons/hi';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            const updated = projects.filter(p => p.id !== id);
            setProjects(updated);
            saveProjects(updated);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newProject = {
            id: currentProject?.id || Date.now(),
            title: formData.get('title'),
            description: formData.get('description'),
            image: formData.get('image') || 'https://placehold.co/600x400',
            category: formData.get('category'),
            techStack: formData.get('techStack').split(',').map(t => t.trim()),
            liveUrl: formData.get('liveUrl'),
            repoUrl: formData.get('repoUrl')
        };

        let updated;
        if (isEditing) {
            updated = projects.map(p => p.id === currentProject.id ? newProject : p);
        } else {
            updated = [...projects, newProject];
        }

        setProjects(updated);
        saveProjects(updated);
        setShowModal(false);
    };

    const openModal = (project = null) => {
        setIsEditing(!!project);
        setCurrentProject(project);
        setShowModal(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white font-display">Manage Projects</h1>
                <button
                    onClick={() => openModal()}
                    className="btn-primary flex items-center gap-2"
                >
                    <HiPlus /> Add Project
                </button>
            </div>

            <div className="grid gap-4">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="admin-card flex items-center gap-6"
                    >
                        <div className="w-24 h-16 rounded-lg bg-gray-700 overflow-hidden shrink-0">
                            <img src={project.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold truncate">{project.title}</h3>
                            <p className="text-gray-400 text-sm truncate">{project.description}</p>
                            <div className="flex gap-2 mt-2">
                                <span className="text-xs px-2 py-0.5 rounded bg-accent-purple/20 text-accent-purple">
                                    {project.category}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => openModal(project)}
                                className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                            >
                                <HiPencil size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                                <HiTrash size={20} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#1a1f35] w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#151929]">
                                <h2 className="text-xl font-bold text-white">
                                    {isEditing ? 'Edit Project' : 'New Project'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                    <HiX size={24} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Project Title</label>
                                        <input name="title" defaultValue={currentProject?.title} required className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-purple outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Category</label>
                                        <select name="category" defaultValue={currentProject?.category || 'Web Development'} className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-purple outline-none">
                                            {['Web Development', 'Mobile App', 'Cybersecurity', 'System Automation'].map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Description</label>
                                    <textarea name="description" rows={3} defaultValue={currentProject?.description} required className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-purple outline-none" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Image URL</label>
                                    <div className="flex gap-2">
                                        <input name="image" defaultValue={currentProject?.image} className="flex-1 bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-purple outline-none" placeholder="https://..." />
                                        <button type="button" className="p-3 bg-dark-500 border border-white/10 rounded-lg text-gray-400 hover:text-white">
                                            <HiUpload size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Tech Stack (comma separated)</label>
                                    <input name="techStack" defaultValue={currentProject?.techStack?.join(', ')} className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-purple outline-none" placeholder="React, Node.js, MongoDB..." />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Live URL</label>
                                        <input name="liveUrl" defaultValue={currentProject?.liveUrl} className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-purple outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Repo URL</label>
                                        <input name="repoUrl" defaultValue={currentProject?.repoUrl} className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-purple outline-none" />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-6">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 font-medium transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-6 py-2 rounded-lg bg-accent-purple text-white font-medium hover:bg-accent-purple/90 transition-colors shadow-lg shadow-accent-purple/20">
                                        {isEditing ? 'Save Changes' : 'Create Project'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectManager;
