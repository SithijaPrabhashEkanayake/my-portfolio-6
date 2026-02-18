import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getServices, saveServices } from '../utils/dataStore';
import { HiPlus, HiPencil, HiTrash, HiX, HiGlobeAlt, HiShieldCheck, HiDeviceMobile, HiCog, HiCode, HiLightBulb } from 'react-icons/hi';

const iconOptions = [
    { value: 'web', label: 'Web Dev', icon: <HiGlobeAlt /> },
    { value: 'security', label: 'Security', icon: <HiShieldCheck /> },
    { value: 'mobile', label: 'Mobile', icon: <HiDeviceMobile /> },
    { value: 'automation', label: 'Automation', icon: <HiCog /> },
    { value: 'software', label: 'Software', icon: <HiCode /> },
    { value: 'consulting', label: 'Consulting', icon: <HiLightBulb /> },
];

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setServices(getServices());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            const updated = services.filter(s => s.id !== id);
            setServices(updated);
            saveServices(updated);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newService = {
            id: currentService?.id || Date.now(),
            title: formData.get('title'),
            description: formData.get('description'),
            icon: formData.get('icon'),
            price: formData.get('price') || 'Contact for pricing',
            features: formData.get('features').split(',').map(f => f.trim())
        };

        let updated;
        if (isEditing) {
            updated = services.map(s => s.id === currentService.id ? newService : s);
        } else {
            updated = [...services, newService];
        }

        setServices(updated);
        saveServices(updated);
        setShowModal(false);
    };

    const openModal = (service = null) => {
        setIsEditing(!!service);
        setCurrentService(service);
        setShowModal(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white font-display">Manage Services</h1>
                <button
                    onClick={() => openModal()}
                    className="btn-primary flex items-center gap-2"
                >
                    <HiPlus /> Add Service
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="admin-card group relative"
                    >
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openModal(service)}
                                className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                            >
                                <HiPencil size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(service.id)}
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                            >
                                <HiTrash size={18} />
                            </button>
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan mb-4">
                            {iconOptions.find(i => i.value === service.icon)?.icon || <HiCode />}
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{service.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                            {service.features?.slice(0, 3).map((f, i) => (
                                <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">
                                    {f}
                                </span>
                            ))}
                            {service.features?.length > 3 && (
                                <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">
                                    +{service.features.length - 3} more
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-[#1a1f35] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#151929]">
                                <h2 className="text-xl font-bold text-white">
                                    {isEditing ? 'Edit Service' : 'New Service'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                                    <HiX size={24} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Service Title</label>
                                    <input name="title" defaultValue={currentService?.title} required className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan outline-none" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Description</label>
                                    <textarea name="description" rows={3} defaultValue={currentService?.description} required className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan outline-none" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Icon</label>
                                        <div className="relative">
                                            <select name="icon" defaultValue={currentService?.icon || 'web'} className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan outline-none appearance-none">
                                                {iconOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">▼</div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-400">Starting Price</label>
                                        <input name="price" defaultValue={currentService?.price} className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan outline-none" placeholder="$500+" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Key Features (comma separated)</label>
                                    <input name="features" defaultValue={currentService?.features?.join(', ')} className="w-full bg-dark-500 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan outline-none" placeholder="Responsive, SEO, Fast..." />
                                </div>

                                <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-6">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 font-medium transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-6 py-2 rounded-lg bg-accent-cyan text-black font-bold hover:bg-accent-cyan/90 transition-colors shadow-lg shadow-accent-cyan/20">
                                        {isEditing ? 'Save Changes' : 'Create Service'}
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

export default ServiceManager;
