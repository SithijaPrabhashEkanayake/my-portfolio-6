import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../utils/dataStore';
import { HiLockClosed } from 'react-icons/hi';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(username, password)) {
            navigate('/admin');
        } else {
            setError('Invalid credentials');
            // Shake effect
            const form = document.querySelector('form');
            form.classList.add('animate-shake');
            setTimeout(() => form.classList.remove('animate-shake'), 500);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
            <div className="orb w-96 h-96 bg-accent-purple/20 blur-3xl rounded-full absolute -top-20 -left-20 animate-pulse-slow" />
            <div className="orb w-96 h-96 bg-accent-cyan/20 blur-3xl rounded-full absolute -bottom-20 -right-20 animate-pulse-slow" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 relative z-10"
            >
                <div className="glass-card p-10 rounded-3xl shadow-2xl border border-white/10">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent-purple to-accent-cyan flex items-center justify-center mb-4 shadow-lg shadow-accent-purple/30">
                            <HiLockClosed className="text-2xl text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white font-display">Admin Portal</h2>
                        <p className="text-gray-400 mt-2">Secure access only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div>
                            <label className="text-gray-300 text-sm font-medium mb-1.5 block">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-all placeholder-gray-600"
                                placeholder="Enter username"
                            />
                        </div>

                        <div>
                            <label className="text-gray-300 text-sm font-medium mb-1.5 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-all placeholder-gray-600"
                                placeholder="Enter password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-bold shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/50 transform hover:-translate-y-1 transition-all duration-200"
                        >
                            Access Dashboard
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
                            ← Back to Portfolio
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
