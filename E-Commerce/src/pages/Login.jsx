import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../store/slices/authSlice';
import { motion } from "motion/react"

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

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
            if (!isLoading) {
                navigate('/');
            }
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        };
        dispatch(login(userData));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-md w-full mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-stone-100">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#3C3D37]">Welcome Back</h1>
                <p className="text-[#3C3D37] mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#3C3D37] mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#3C3D37] mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Enter your password"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                        required
                    />
                </div>

                <motion.button
                    whileHover={{
                        scale: 1.1,
                    }}
                    whileTap={{
                        scale: 0.85,
                    }}

                    transition={{
                        duration: .2,
                        ease: "easeInOut",

                    }}
                    type="submit"
                    className="w-full py-3 px-4 bg-[#3C3D37] hover:bg-[#3C3D37] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                    Sign In
                </motion.button>
            </form>

            <div

                className="mt-6 text-center text-sm text-[#3C3D37]">
                Don't have an account?{' '}
                <motion.a

                    whileHover={{
                        scale: 1.1,
                    }}
                    whileTap={{
                        scale: 0.85,
                    }}

                    transition={{
                        duration: .2,
                        ease: "easeInOut",

                    }}

                    href="/register" className="text-[#3C3D37] hover:text-[#3C3D37] font-medium">
                    Sign up
                </motion.a>
            </div>
        </div >
    );
};

export default Login;
