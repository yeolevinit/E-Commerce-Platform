import React from 'react';
import webflowImg from '../assets/image.png';
import relumeImg from '../assets/image_copy.png';
import { BsArrowUpRight } from "react-icons/bs";

export default function FeaturedProducts() {
    const products = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=500&fit=crop",
            alt: "Pink dress"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop",
            alt: "Mustard shirt"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
            alt: "Green outfit"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop",
            alt: "Gray pants"
        }
    ];

    return (
        <div className="min-h-screen bg-[#e8e0d5] px-8 py-16">
            {/* Scrolling Logos */}
            <div className="overflow-hidden mb-16">
                <div className="flex animate-scroll whitespace-nowrap">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex items-center mx-8 gap-8">
                            <span className="text-3xl font-medium text-[#575757] mr-8 flex items-center gap-2">
                                <img src={webflowImg} alt="Webflow" className="text-[#575757] h-8 w-auto object-contain grayscale opacity-70" />
                                Webflow
                            </span>
                            <span className="text-3xl font-medium text-[#575757] flex items-center gap-2">
                                <img src={relumeImg} alt="Relume" className="h-12 w-auto object-cover grayscale opacity-70" />
                                Relume
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl md:text-6xl font-bold text-[#4a3428] mb-4">
                            Featured Products
                        </h2>
                        <p className="text-lg text-gray-600">
                            Modern and stylish fashion store website design with a clean layout and elegant product showcase.
                        </p>
                    </div>

                    <button className="flex items-center gap-2 px-8 py-4 border-2 border-[#4a3428] text-[#4a3428] rounded-full font-medium hover:bg-[#4a3428] hover:text-white transition-colors">
                        See all
                        <BsArrowUpRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group cursor-pointer"
                        >
                            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                <img
                                    src={product.image}
                                    alt={product.alt}
                                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
        </div>
    );
}