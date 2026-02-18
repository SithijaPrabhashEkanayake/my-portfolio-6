import { Outlet, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { isAuthenticated, logout } from '../utils/dataStore';
import { HiHome, HiBriefcase, HiCode, HiLogout, HiMenu } from 'react-icons/hi';
import { useState } from 'react';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    if (!isAuthenticated()) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin', icon: <HiHome />, label: 'Dashboard' },
        { path: '/admin/projects', icon: <HiCode />, label: 'Projects' },
        { path: '/admin/services', icon: <HiBriefcase />, label: 'Services' },
    ];

    return (
        <div className="min-h-screen bg-dark flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ width: sidebarOpen ? 250 : 80 }}
                animate={{ width: sidebarOpen ? 250 : 80 }}
                className="admin-sidebar fixed h-full z-20 flex flex-col overflow-hidden transition-all duration-300"
            >
                <div className="p-6 flex items-center justify-between">
                    {sidebarOpen && (
                        <span className="text-xl font-bold font-display text-white">Admin</span>
                    )}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
                        <HiMenu size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-accent-purple text-white shadow-lg shadow-accent-purple/20'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                    >
                        <span className="text-xl"><HiLogout /></span>
                        {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main
                className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-[250px]' : 'ml-[80px]'
                    }`}
            >
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
