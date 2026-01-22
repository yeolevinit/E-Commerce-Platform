import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { fetchLatestProducts } from '../store/slices/productSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Product = () => {
    const dispatch = useDispatch();
    const { latest, isLoading, isError } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        if (!user) {
            toast.error('Please login to add items');
            navigate('/login');
            return;
        }
        dispatch(addToCart({ productId: product._id, quantity: 1 }));
        toast.success('Added to cart!');
    };

    useEffect(() => {
        dispatch(fetchLatestProducts(12));
    }, [dispatch]);
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold text-[#4a3728]">Latest Products</h2>
                <div className="flex gap-3">
                    <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-gray-700 transition shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Swiper Slider */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                className="product-swiper"
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
            >
                {latest && latest.map((product) => (
                    <SwiperSlide key={product.id}>
                        {/* Product Card */}
                        <div className="group">
                            <div className="bg-[#d9d9d9] rounded-2xl overflow-hidden">
                                <Link to={`/product/${product._id}`}>
                                    <motion.img
                                        layoutId={`product-image-${product._id}`}
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-[280px] object-cover transition group-hover:scale-105"
                                    />
                                </Link>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-[#4a3728]">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-[#4a3728] mt-1">
                                    ₹{product.price} INR
                                </p>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-2 text-sm text-[#9c6b3f] hover:underline"
                                >
                                    Add to Cart →
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Product;