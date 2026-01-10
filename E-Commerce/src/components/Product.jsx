import React from 'react'
import { products } from '../utils/ProductDetails'
import { useState } from "react";

const Product = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const visibleCards = 3;
    const maxIndex = products.length - visibleCards;

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold text-[#4a3728]">Latest Products</h2>

                <div className="flex gap-3">
                    <button
                        onClick={prevSlide}
                        className="w-10 h-10 rounded-full border flex items-center justify-center"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-10 h-10 rounded-full border flex items-center justify-center"
                    >
                        →
                    </button>
                </div>
            </div>

            {/* Slider */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                    }}
                >
                    {products.filter(product => product.latest).map((product) => (
                        <div
                            key={product.id}
                            className="w-1/3 px-4 flex-shrink-0"
                        >
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
                                        $ {product.price} USD
                                    </p>
                                    <button className="mt-2 text-sm text-[#9c6b3f] hover:underline">
                                        Add to Cart →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Product