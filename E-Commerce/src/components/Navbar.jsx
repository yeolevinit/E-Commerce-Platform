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
        <nav className="bg-transparent shadow-md rounded-3xl">
            <div className="container mx-auto px-3">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-start">
                        <Link to="/" className="text-2xl font-bold text-stone-500 tracking-tight hover:text-stone-300">
                            ShopMate
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="text-stone-600 font-semibold hover:text-stone-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>

                            {user ? (
                                <>
                                    <span className="text-stone-600 px-3 py-2 text-sm">Hello, {user.username}</span>
                                    <Link to="/profile" className="text-stone-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={onLogout}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-stone-600 font-semibold hover:text-stone-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/register" className="bg-stone-600 hover:bg-stone-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                                        Register
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
