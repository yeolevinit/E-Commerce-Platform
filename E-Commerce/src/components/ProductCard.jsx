import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            toast.error('Please login to add items');
            navigate('/login');
            return;
        }
        dispatch(addToCart({ productId: product._id, quantity: 1 }));
        toast.success('Added to cart!');
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group relative bg-[#ffffff0d] backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-300 shadow-xl"
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden">
                <Link to={`/product/${product._id}`}>
                    <motion.img
                        layoutId={`product-image-${product._id}`}
                        src={product.images[0] || 'https://dummyimage.com/400x400/cccccc/000000&text=No+Image'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </Link>

                {/* Overlay actions - visible on hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-2 bg-gradient-to-t from-black/80 to-transparent">
                    <button
                        className="bg-accent text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-accent-hover transition-colors shadow-lg"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <Link
                        to={`/product/${product._id}`}
                        className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors shadow-lg"
                    >
                        View
                    </Link>
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.compareAtPrice > product.price && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                        </span>
                    )}
                    {product.stockStatus === 'low_stock' && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Low Stock
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${product._id}`}>
                        <h3 className="text-lg font-medium text-text-main line-clamp-1 group-hover:text-accent transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-text-muted text-sm">{product.rating || 0}</span>
                    </div>
                </div>

                <p className="text-text-muted text-sm line-clamp-2 mb-3 h-10">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-text-main">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.compareAtPrice > product.price && (
                            <span className="text-sm text-text-muted line-through">
                                ₹{product.compareAtPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
