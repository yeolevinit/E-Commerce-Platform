import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilters, clearFilters } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { FiFilter, FiX, FiShoppingCart, FiChevronRight, FiStar } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Shop = () => {
    const dispatch = useDispatch();
    const { products, isLoading, filters } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts({ ...filters, page: 1 }));
    }, [dispatch, filters]);

    const handleCategoryChange = (category) => {
        dispatch(setFilters({ category: category === filters.category ? '' : category, page: 1 }));
    };

    const handleSortChange = (e) => {
        const [sort, order] = e.target.value.split('-');
        dispatch(setFilters({ sort, order, page: 1 }));
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        if (!user) {
            toast.error('Please login to add items');
            return;
        }
        dispatch(addToCart({ productId: product._id, quantity }));
        toast.success('Added to cart!');
    };

    const categories = ['electronics', 'clothing', 'shoes', 'accessories', 'home', 'beauty', 'sports', 'books', 'toys', 'other'];

    return (
        <div className="min-h-screen bg-dark-bg relative">
            <Header />

            <div className="bg-dark-bg pt-24 pb-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4 font-serif">
                        Shop Collection
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 relative">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar (Simplified) */}
                    <div className="hidden lg:block w-64 space-y-4">
                        <h3 className="text-lg font-bold text-text-main">Categories</h3>
                        <ul>
                            <li className={`cursor-pointer mb-2 ${filters.category === '' ? 'text-accent' : 'text-text-muted'}`} onClick={() => handleCategoryChange('')}>All</li>
                            {categories.map(cat => (
                                <li key={cat} className={`cursor-pointer capitalize mb-2 ${filters.category === cat ? 'text-accent' : 'text-text-muted'}`} onClick={() => handleCategoryChange(cat)}>{cat}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex-1">
                        {/* Sort Toolbar */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-text-muted">Showing {products.length} products</p>
                            <select onChange={handleSortChange} className="bg-card-bg border border-white/10 rounded p-2 text-text-main">
                                <option value="createdAt-desc">Newest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <motion.div
                                    layoutId={`card-container-${product._id}`}
                                    key={product._id}
                                    onClick={() => setSelectedId(product._id)}
                                    className="cursor-pointer bg-[#ffffff0d] backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 group"
                                    initial={{ borderRadius: '0.75rem' }}
                                >
                                    <div className="aspect-[3/4] relative overflow-hidden">
                                        <motion.img
                                            layoutId={`card-image-${product._id}`}
                                            src={product.images[0] || 'https://dummyimage.com/400x400/cccccc/000000&text=No+Image'}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <span className="bg-black/50 backdrop-blur text-white px-2 py-1 rounded text-xs">View</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <motion.h3 layoutId={`card-title-${product._id}`} className="text-lg font-medium text-text-main truncate">
                                            {product.name}
                                        </motion.h3>
                                        <motion.p layoutId={`card-price-${product._id}`} className="text-text-muted">
                                            ₹{product.price.toLocaleString()}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Modal Overlay */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Blurred Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        {/* Expanded Card */}
                        {products.find(p => p._id === selectedId) && (() => {
                            const selectedProduct = products.find(p => p._id === selectedId);
                            // Ensure selectedImage logic handles switching products if needed, 
                            // though local state 'selectedImage' might need reset on product change.
                            return (
                                <motion.div
                                    layoutId={`card-container-${selectedId}`}
                                    className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                                >
                                    {/* Close Button */}
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                                    >
                                        <FiX size={24} />
                                    </motion.button>

                                    {/* Image Section */}
                                    <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                                        <motion.img
                                            layoutId={`card-image-${selectedId}`}
                                            src={selectedProduct.images[0] || 'https://dummyimage.com/400x400/cccccc/000000&text=No+Image'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                                        <motion.h2 layoutId={`card-title-${selectedId}`} className="text-3xl font-bold text-text-main mb-2">
                                            {selectedProduct.name}
                                        </motion.h2>

                                        <motion.div layoutId={`card-price-${selectedId}`} className="text-2xl text-accent font-bold mb-6">
                                            ₹{selectedProduct.price.toLocaleString()}
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <p className="text-text-muted leading-relaxed mb-6">
                                                {selectedProduct.description}
                                            </p>

                                            <div className="flex items-center gap-4 mb-6 pt-6 border-t border-white/10">
                                                <div className="flex items-center text-yellow-500">
                                                    <span>★</span>
                                                    <span className="ml-1 text-white">{selectedProduct.rating}</span>
                                                </div>
                                                <span className="text-text-muted">|</span>
                                                <span className={selectedProduct.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                                                    {selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-4 mt-auto">
                                                <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-white hover:bg-white/10">-</button>
                                                    <span className="px-3 text-white font-medium">{quantity}</span>
                                                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-white hover:bg-white/10">+</button>
                                                </div>
                                                <button
                                                    onClick={(e) => handleAddToCart(e, selectedProduct)}
                                                    className="flex-1 bg-accent hover:bg-accent-hover text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                                                >
                                                    <FiShoppingCart /> Add to Cart
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Shop;
