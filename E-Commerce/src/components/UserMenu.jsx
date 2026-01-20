import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-toastify';
import { logout } from '../store/slices/authSlice';
import { GoPerson } from 'react-icons/go';
import { FiUser, FiShoppingBag, FiHeart, FiLogOut } from 'react-icons/fi';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        setIsOpen(false);
        navigate('/');
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-[#4a3728] hover:text-[#9c6b3f] transition-colors"
            >
                <GoPerson className="text-3xl" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                    >
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-200 bg-[#FAF9F6]">
                            <p className="text-sm font-medium text-[#4a3728]">{user?.username || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate('/profile');
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#FAF9F6] flex items-center gap-3 transition-colors"
                            >
                                <FiUser className="text-lg" />
                                My Profile
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate('/orders');
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#FAF9F6] flex items-center gap-3 transition-colors"
                            >
                                <FiShoppingBag className="text-lg" />
                                My Orders
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate('/wishlist');
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#FAF9F6] flex items-center gap-3 transition-colors"
                            >
                                <FiHeart className="text-lg" />
                                Wishlist
                            </button>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-gray-200">
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                            >
                                <FiLogOut className="text-lg" />
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserMenu;
