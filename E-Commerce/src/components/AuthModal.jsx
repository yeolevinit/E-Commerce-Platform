import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-toastify';
import { login, register, reset } from '../store/slices/authSlice';
import { IoClose } from 'react-icons/io5';

const AuthModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            toast.success(activeTab === 'login' ? 'Login successful!' : 'Account created successfully!');
            onClose();
            setLoginData({ email: '', password: '' });
            setSignupData({ username: '', email: '', password: '', confirmPassword: '' });
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch, onClose, activeTab]);

    const handleLoginChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSignupChange = (e) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error('Please fill in all fields');
            return;
        }
        dispatch(login(loginData));
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (!signupData.username || !signupData.email || !signupData.password || !signupData.confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }
        if (signupData.password !== signupData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (signupData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        const userData = {
            username: signupData.username,
            email: signupData.email,
            password: signupData.password
        };
        dispatch(register(userData));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                        >
                            <IoClose size={24} />
                        </button>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'login'
                                        ? 'text-[#4a3728] border-b-2 border-[#4a3728]'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setActiveTab('signup')}
                                className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'signup'
                                        ? 'text-[#4a3728] border-b-2 border-[#4a3728]'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {activeTab === 'login' ? (
                                <form onSubmit={handleLoginSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="login-email" className="block text-sm font-medium text-[#4a3728] mb-2">
                                            Email
                                        </label>
                                        <input
                                            id="login-email"
                                            name="email"
                                            type="email"
                                            required
                                            value={loginData.email}
                                            onChange={handleLoginChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c6b3f] focus:border-transparent"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="login-password" className="block text-sm font-medium text-[#4a3728] mb-2">
                                            Password
                                        </label>
                                        <input
                                            id="login-password"
                                            name="password"
                                            type="password"
                                            required
                                            value={loginData.password}
                                            onChange={handleLoginChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c6b3f] focus:border-transparent"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3 bg-[#4a3728] text-white rounded-lg font-medium hover:bg-[#3a2918] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleSignupSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="signup-username" className="block text-sm font-medium text-[#4a3728] mb-2">
                                            Username
                                        </label>
                                        <input
                                            id="signup-username"
                                            name="username"
                                            type="text"
                                            required
                                            value={signupData.username}
                                            onChange={handleSignupChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c6b3f] focus:border-transparent"
                                            placeholder="Choose a username"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="signup-email" className="block text-sm font-medium text-[#4a3728] mb-2">
                                            Email
                                        </label>
                                        <input
                                            id="signup-email"
                                            name="email"
                                            type="email"
                                            required
                                            value={signupData.email}
                                            onChange={handleSignupChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c6b3f] focus:border-transparent"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="signup-password" className="block text-sm font-medium text-[#4a3728] mb-2">
                                            Password
                                        </label>
                                        <input
                                            id="signup-password"
                                            name="password"
                                            type="password"
                                            required
                                            value={signupData.password}
                                            onChange={handleSignupChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c6b3f] focus:border-transparent"
                                            placeholder="Create a password"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="signup-confirm" className="block text-sm font-medium text-[#4a3728] mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="signup-confirm"
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            value={signupData.confirmPassword}
                                            onChange={handleSignupChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c6b3f] focus:border-transparent"
                                            placeholder="Confirm your password"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3 bg-[#4a3728] text-white rounded-lg font-medium hover:bg-[#3a2918] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? 'Creating account...' : 'Create Account'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;
