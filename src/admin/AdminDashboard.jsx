import { motion } from 'framer-motion';
import { getProjects, getServices } from '../utils/dataStore';
import { HiCode, HiBriefcase, HiUsers, HiEye } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const StatCard = ({ icon, label, value, color, link }) => (
    <Link to={link} className="block">
        <motion.div
            whileHover={{ y: -5 }}
            className="admin-card relative overflow-hidden group"
        >
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl text-${color}-500`}>
                {icon}
            </div>
            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 flex items-center justify-center text-${color}-400 mb-4`}>
                    {icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
                <p className="text-gray-400 text-sm">{label}</p>
            </div>
        </motion.div>
    </Link>
);

const AdminDashboard = () => {
    const projects = getProjects();
    const services = getServices();

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8 font-display">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    icon={<HiCode />}
                    label="Total Projects"
                    value={projects.length}
                    color="purple"
                    link="/admin/projects"
                />
                <StatCard
                    icon={<HiBriefcase />}
                    label="Active Services"
                    value={services.length}
                    color="cyan"
                    link="/admin/services"
                />
                <StatCard
                    icon={<HiUsers />}
                    label="Clients"
                    value="30+"
                    color="pink"
                    link="#"
                />
                <StatCard
                    icon={<HiEye />}
                    label="Total Views"
                    value="12.5k"
                    color="orange"
                    link="#"
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Recent Projects */}
                <div className="admin-card">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Projects</h2>
                    <div className="space-y-4">
                        {projects.slice(0, 4).map((p) => (
                            <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-gray-700 overflow-hidden">
                                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium">{p.title}</h4>
                                    <span className="text-xs text-gray-400">{p.category}</span>
                                </div>
                                <div className="ml-auto">
                                    <span className="px-2 py-1 rounded text-xs bg-accent-purple/10 text-accent-purple">Active</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="admin-card">
                    <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/admin/projects" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-center transition-colors">
                            <HiCode className="mx-auto text-2xl text-accent-purple mb-2" />
                            <span className="text-sm text-gray-300">Add Project</span>
                        </Link>
                        <Link to="/admin/services" className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-center transition-colors">
                            <HiBriefcase className="mx-auto text-2xl text-accent-cyan mb-2" />
                            <span className="text-sm text-gray-300">Add Service</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
