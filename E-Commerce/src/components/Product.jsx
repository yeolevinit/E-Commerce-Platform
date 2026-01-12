import React from 'react';
import { products } from '../utils/ProductDetails';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
const Product = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold text-[#4a3728]">Latest Products</h2>
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
                    delay: 1500,
                    disableOnInteraction: false,
                }}
            >
                {products.filter(product => product.latest).map((product) => (
                    <SwiperSlide key={product.id}>
                        {/* Product Card */}
                        <div className="group">
                            <div className="bg-[#d9d9d9] rounded-2xl overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-[280px] object-cover transition group-hover:scale-105"
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-[#4a3728]">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-[#4a3728] mt-1">
                                    ₹{product.price} INR
                                </p>
                                <button className="mt-2 text-sm text-[#9c6b3f] hover:underline">
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