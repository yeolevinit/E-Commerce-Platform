import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { verifyPayment, resetOrderState } from '../store/slices/orderSlice';
import { fetchCart } from '../store/slices/cartSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import { FiCheckCircle, FiPackage, FiArrowRight } from 'react-icons/fi';

const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const dispatch = useDispatch();
    const { currentOrder, isLoading, isError, message } = useSelector((state) => state.orders);

    useEffect(() => {
        if (sessionId) {
            dispatch(verifyPayment(sessionId));
            dispatch(fetchCart()); // Refresh cart (should be empty now)
        }
        return () => {
            dispatch(resetOrderState());
        };
    }, [dispatch, sessionId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark-bg flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
                <p className="mt-4 text-text-muted">Verifying your payment...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-16 px-6">
                <div className="max-w-3xl mx-auto">
                    {isError ? (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
                            <h2 className="text-2xl font-bold text-red-500 mb-2">Something went wrong</h2>
                            <p className="text-text-muted mb-6">{message || "We couldn't verify your payment. Please contact support if you were charged."}</p>
                            <Link to="/cart" className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold">
                                Back to Cart
                            </Link>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                                    <FiCheckCircle size={60} />
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 tracking-tight">
                                Payment Successful!
                            </h1>
                            <p className="text-text-muted text-lg mb-12 max-w-xl mx-auto">
                                Thank you for your purchase. Your order has been confirmed and is being processed.
                            </p>

                            {currentOrder && (
                                <div className="bg-card-bg border border-white/5 rounded-3xl p-8 mb-12 text-left shadow-2xl">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-white/5 gap-4">
                                        <div>
                                            <p className="text-text-muted text-sm uppercase tracking-widest font-bold mb-1">Order Number</p>
                                            <p className="text-text-main font-mono text-lg">{currentOrder._id}</p>
                                        </div>
                                        <div className="md:text-right">
                                            <p className="text-text-muted text-sm uppercase tracking-widest font-bold mb-1">Total Amount</p>
                                            <p className="text-accent text-2xl font-bold">₹{currentOrder.totalPrice.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <p className="text-text-main font-bold flex items-center gap-2">
                                            <FiPackage className="text-accent" /> Order Items
                                        </p>
                                        {currentOrder.orderItems.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                                                <div className="flex items-center gap-4">
                                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                                    <div>
                                                        <p className="text-text-main font-medium">{item.name}</p>
                                                        <p className="text-text-muted text-sm">Qty: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <p className="text-text-main font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6">
                                        <p className="text-accent font-bold mb-2">Shipping to:</p>
                                        <p className="text-text-main">{currentOrder.shippingAddress.address}</p>
                                        <p className="text-text-main">{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.postalCode}</p>
                                        <p className="text-text-main">{currentOrder.shippingAddress.country}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/shop" className="bg-white text-black px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all shadow-lg active:scale-95">
                                    Continue Shopping <FiArrowRight />
                                </Link>
                                <button className="bg-card-bg border border-white/10 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/5 transition-all">
                                    Download Invoice
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutSuccess;
