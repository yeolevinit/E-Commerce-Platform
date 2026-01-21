import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearCurrentProduct } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentProduct, isLoading, isError, message } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (!user) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }
        dispatch(addToCart({ productId: currentProduct._id, quantity }));
        toast.success('Added to cart!');
    };

    useEffect(() => {
        dispatch(fetchProductById(id));
        return () => {
            dispatch(clearCurrentProduct());
        };
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark-bg flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (isError || !currentProduct) {
        return (
            <div className="min-h-screen bg-dark-bg flex flex-col justify-center items-center text-text-main">
                <h2 className="text-2xl mb-4">Product not found</h2>
                <Link to="/shop" className="text-accent hover:underline">Back to Shop</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col">
            <Header />

            <div className="flex-grow pt-24 pb-16 px-6 max-w-7xl mx-auto w-full">
                {/* Breadcrumbs */}
                <nav className="text-text-muted text-sm mb-8">
                    <Link to="/" className="hover:text-accent">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/shop" className="hover:text-accent">Shop</Link>
                    <span className="mx-2">/</span>
                    <span className="text-text-main">{currentProduct.name}</span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                            <motion.img
                                layoutId={`product-image-${currentProduct._id}`}
                                src={currentProduct.images[selectedImage] || currentProduct.thumbnail}
                                alt={currentProduct.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {currentProduct.images && currentProduct.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {currentProduct.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${selectedImage === index ? 'border-accent' : 'border-transparent hover:border-white/30'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-text-main mb-2 font-serif">
                            {currentProduct.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center text-yellow-500">
                                <span className="text-lg">★</span>
                                <span className="ml-1 text-text-main font-medium">{currentProduct.rating || 0}</span>
                            </div>
                            <span className="text-text-muted">|</span>
                            <span className="text-text-muted">{currentProduct.reviewCount || 0} Reviews</span>
                            <span className="text-text-muted">|</span>
                            <span className={`${currentProduct.stockStatus === 'in_stock' ? 'text-green-500' : 'text-red-500'} font-medium capitalize`}>
                                {currentProduct.stockStatus?.replace('_', ' ')}
                            </span>
                        </div>

                        <div className="text-2xl font-bold text-accent mb-6">
                            ₹{currentProduct.price.toLocaleString()}
                            {currentProduct.compareAtPrice > currentProduct.price && (
                                <span className="ml-3 text-lg text-text-muted line-through font-normal">
                                    ₹{currentProduct.compareAtPrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        <p className="text-text-muted mb-8 leading-relaxed">
                            {currentProduct.description}
                        </p>

                        {/* Actions */}
                        <div className="border-t border-b border-white/10 py-6 mb-8 space-y-6">
                            {/* Quantity */}
                            <div className="flex items-center gap-4">
                                <span className="text-text-main font-medium">Quantity</span>
                                <div className="flex items-center bg-card-bg border border-white/10 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2 text-text-main hover:bg-white/5 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center text-text-main font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))}
                                        className="px-4 py-2 text-text-main hover:bg-white/5 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-accent/20">
                                Add to Cart — ₹{(currentProduct.price * quantity).toLocaleString()}
                            </button>
                        </div>

                        {/* Specifications */}
                        {currentProduct.specifications && Object.keys(currentProduct.specifications).length > 0 && (
                            <div className="mt-4">
                                <section>
                                    <h3 className="text-lg font-bold text-text-main mb-4 border-b border-white/10 pb-2">Specifications</h3>
                                    <div className="grid grid-cols-1 gap-y-2">
                                        {Object.entries(currentProduct.specifications).map(([key, value]) => (
                                            <div key={key} className="flex grid grid-cols-2">
                                                <span className="text-text-muted font-medium">{key}</span>
                                                <span className="text-text-main">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetails;
