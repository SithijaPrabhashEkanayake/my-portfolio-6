import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPaperPlane, FaTimes, FaRobot } from 'react-icons/fa';

const WHATSAPP_NUMBER = '94764421332'; // Replace with actual number

const quickReplies = [
    "I want to discuss a project.",
    "Can I see your portfolio?",
    "Do you offer app development?",
    "What are your rates?"
];

const WhatsAppChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [showTooltip, setShowTooltip] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowTooltip(true);
        }, 5000); // Show tooltip after 5s

        return () => clearTimeout(timer);
    }, [isOpen]);

    const sendMessage = (text = message) => {
        if (!text.trim()) return;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        setMessage('');
        setIsOpen(false);
    };

    return (
        <>
            {/* Pulsing Tooltip */}
            <AnimatePresence>
                {!isOpen && showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed bottom-24 right-8 bg-white text-gray-800 px-4 py-2 rounded-xl shadow-lg z-[9998] max-w-[200px]"
                    >
                        <div className="relative">
                            <p className="text-sm font-medium">👋 Hi there! Need help?</p>
                            <div className="absolute -bottom-4 right-4 w-4 h-4 bg-white rotate-45 transform translate-y-1/2" />
                            <button 
                                onClick={() => setShowTooltip(false)}
                                className="absolute -top-3 -right-3 bg-gray-200 rounded-full p-0.5 hover:bg-gray-300"
                            >
                                <FaTimes size={10} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Float Button */}
            <motion.div
                className="whatsapp-float"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? <FaTimes className="text-white text-2xl" /> : <FaWhatsapp className="text-white text-3xl" />}
            </motion.div>

            {/* Chat Box */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="whatsapp-chat-box glass bg-[#0b141a]"
                    >
                        {/* Header */}
                        <div className="bg-[#075e54] p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <FaRobot className="text-[#075e54] text-xl" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Sithija's Assistant</h3>
                                <p className="text-green-100 text-xs">Usually replies instantly</p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-4 bg-[#0d1418] min-h-[300px] flex flex-col">
                            <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar">
                                <div className="bg-[#1f2c34] text-white p-3 rounded-tr-lg rounded-bl-lg rounded-br-lg max-w-[85%] mb-4 text-sm shadow-sm">
                                    Hello! I'm Sithija's virtual assistant. How can I help you today?
                                </div>
                                
                                <p className="text-gray-400 text-xs mb-2 text-center">Suggested Replies</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickReplies.map((reply, i) => (
                                        <button
                                            key={i}
                                            onClick={() => sendMessage(reply)}
                                            className="px-3 py-1.5 bg-[#1f2c34] text-[#00d4ff] text-xs rounded-full border border-[#00d4ff]/20 hover:bg-[#00d4ff]/10 transition-colors text-left"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Input */}
                            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2 rounded-full bg-[#0b141a] text-white text-sm placeholder-gray-500 border border-white/5 focus:outline-none focus:border-accent-cyan/30"
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center text-white hover:bg-[#008f6f] transition-colors"
                                >
                                    <FaPaperPlane className="text-sm" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WhatsAppChatbot;
