import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../store/slices/cartSlice';
import { createCheckoutSession } from '../store/slices/orderSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiMapPin, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, isLoading: isCartLoading } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const { isLoading: isOrderLoading } = useSelector((state) => state.orders);

    const [showShippingModal, setShowShippingModal] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: 'India'
    });

    useEffect(() => {
        if (user) {
            dispatch(fetchCart());
        }
    }, [dispatch, user, navigate]); // Added navigate to re-fetch if route changes back

    const handleCheckout = async () => {
        if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
            toast.error('Please fill in all shipping details');
            return;
        }

        try {
            const resultAction = await dispatch(createCheckoutSession(shippingAddress));
            if (createCheckoutSession.fulfilled.match(resultAction)) {
                // Redirect to Stripe Checkout URL
                window.location.href = resultAction.payload.url;
            } else {
                toast.error(resultAction.payload || 'Checkout failed');
            }
        } catch (err) {
            toast.error('An unexpected error occurred');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-dark-bg flex flex-col">
                <Header />
                <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
                    <h2 className="text-3xl font-bold text-text-main mb-4">Please Login</h2>
                    <p className="text-text-muted mb-8">You need to be logged in to view your cart.</p>
                    <Link to="/login" className="bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-accent-hover transition-colors">
                        Login Now
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    const isEmpty = !cart || !cart.items || cart.items.length === 0;

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col">
            <Header />

            <div className="flex-grow pt-24 pb-16 px-6 max-w-7xl mx-auto w-full">
                <h1 className="text-4xl font-bold text-text-main mb-8 font-display">Your Shopping Cart</h1>

                {isEmpty ? (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🛒</span>
                        </div>
                        <h2 className="text-2xl font-bold text-text-main mb-2">Your cart is empty</h2>
                        <p className="text-text-muted mb-8 text-lg">Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/shop" className="bg-accent text-white px-10 py-4 rounded-full font-bold hover:bg-accent-hover transition-all shadow-lg shadow-accent/20">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items */}
                        <div className="flex-grow space-y-6">
                            <AnimatePresence>
                                {cart.items.map((item) => (
                                    <motion.div
                                        key={item.product}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        layout
                                        className="bg-card-bg border border-white/5 rounded-2xl p-6 flex gap-6 items-center shadow-lg"
                                    >
                                        <div className="w-32 h-32 flex-shrink-0 bg-dark-bg rounded-xl overflow-hidden shadow-inner">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-grow min-w-0">
                                            <div className="flex justify-between items-start mb-4">
                                                <Link to={`/product/${item.product}`} className="text-xl font-bold text-text-main truncate hover:text-accent transition-colors">
                                                    {item.name}
                                                </Link>
                                                <button
                                                    onClick={() => dispatch(removeFromCart(item.product))}
                                                    className="text-text-muted hover:text-red-500 transition-colors p-2 bg-white/5 rounded-full"
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-accent font-bold text-xl">₹{item.price.toLocaleString()}</span>
                                                </div>

                                                <div className="flex items-center bg-dark-bg border border-white/10 rounded-xl px-2">
                                                    <button
                                                        onClick={() => dispatch(updateCartItem({ productId: item.product, quantity: Math.max(1, item.quantity - 1) }))}
                                                        className="p-3 text-text-muted hover:text-white transition-colors"
                                                    >
                                                        <FiMinus size={18} />
                                                    </button>
                                                    <span className="w-8 text-center text-text-main font-bold text-lg">{item.quantity}</span>
                                                    <button
                                                        onClick={() => dispatch(updateCartItem({ productId: item.product, quantity: item.quantity + 1 }))}
                                                        className="p-3 text-text-muted hover:text-white transition-colors"
                                                    >
                                                        <FiPlus size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Summary */}
                        <div className="lg:w-96 flex-shrink-0">
                            <div className="bg-card-bg border border-white/5 rounded-3xl p-8 sticky top-24 shadow-2xl">
                                <h3 className="text-2xl font-bold text-text-main mb-8">Order Summary</h3>

                                <div className="space-y-6 mb-8 pb-8 border-b border-white/5">
                                    <div className="flex justify-between text-text-muted text-lg">
                                        <span>Subtotal ({cart.items.length} items)</span>
                                        <span className="text-text-main font-medium">₹{cart.bill.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-text-muted text-lg">
                                        <span>Shipping</span>
                                        <span className="text-green-500 font-bold uppercase text-sm tracking-wider">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center text-2xl font-bold text-text-main pt-4">
                                        <span>Total</span>
                                        <span className="text-accent">₹{cart.bill.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowShippingModal(true)}
                                    className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-accent/20 flex items-center justify-center gap-3 group transform active:scale-95"
                                >
                                    Proceed to Checkout
                                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button
                                    onClick={() => dispatch(clearCart())}
                                    className="w-full mt-6 text-text-muted text-sm font-medium hover:text-red-500 transition-colors uppercase tracking-widest"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Shipping Modal */}
            <AnimatePresence>
                {showShippingModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setShowShippingModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-card-bg border border-white/10 rounded-3xl p-8 w-full max-w-lg relative shadow-2xl"
                        >
                            <button
                                onClick={() => setShowShippingModal(false)}
                                className="absolute top-6 right-6 text-text-muted hover:text-white transition-colors"
                            >
                                <FiX size={24} />
                            </button>

                            <h2 className="text-3xl font-bold text-text-main mb-2 flex items-center gap-3">
                                <FiMapPin className="text-accent" /> Shipping Details
                            </h2>
                            <p className="text-text-muted mb-8">Where should we deliver your luxury items?</p>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-text-muted uppercase tracking-wider ml-1">Street Address</label>
                                    <input
                                        type="text"
                                        value={shippingAddress.address}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                        placeholder="Flat, House no., Building, Street"
                                        className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-muted uppercase tracking-wider ml-1">City</label>
                                        <input
                                            type="text"
                                            value={shippingAddress.city}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                            placeholder="City"
                                            className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-text-muted uppercase tracking-wider ml-1">Postal Code</label>
                                        <input
                                            type="text"
                                            value={shippingAddress.postalCode}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                            placeholder="Pincode"
                                            className="w-full bg-dark-bg border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isOrderLoading}
                                    className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
                                >
                                    {isOrderLoading ? (
                                        <div className="h-6 w-6 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        "Proceed to Payment"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Cart;
