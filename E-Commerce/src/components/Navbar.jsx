import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/slices/authSlice';
import { motion } from "motion/react"

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-start">
                        <Link to="/" className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary hover:opacity-80 transition-opacity">
                            ShopMate
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            <Link to="/" className="text-text-muted hover:text-primary font-medium px-3 py-2 text-sm transition-colors relative group">
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>

                            {user ? (
                                <>
                                    <span className="text-primary font-medium px-3 py-2 text-sm">Hello, {user.username}</span>
                                    <Link to="/profile" className="text-text-muted hover:text-primary font-medium px-3 py-2 text-sm transition-colors">
                                        Profile
                                    </Link>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onLogout}
                                        className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-black border border-red-500/50 px-5 py-2 rounded-full text-sm font-bold transition-all"
                                    >
                                        Logout
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-text-muted hover:text-primary font-medium px-3 py-2 text-sm transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/register">
                                        <motion.button
                                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-secondary text-dark-bg px-6 py-2 rounded-full text-sm font-bold shadow-lg transition-all"
                                        >
                                            Get Started
                                        </motion.button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
