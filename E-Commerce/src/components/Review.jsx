import React from 'react';
import { BsStarFill as Star } from 'react-icons/bs';
import { BsArrowUpRight } from "react-icons/bs";

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            rating: 5,
            text: "I'm obsessed with their latest collection! Every piece feels high-quality and fits beautifully. The delivery was quick, and the packaging looked so elegant.",
            name: "Emma R.",
            role: "Fashion Designer",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
        },
        {
            id: 2,
            rating: 5,
            text: "The designs are so elegant and trendy — exactly what I was looking for! From browsing to checkout, the whole shopping experience was smooth and enjoyable.",
            name: "John K.",
            role: "Web Designer",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
        },
        {
            id: 3,
            rating: 5,
            text: "This brand never disappoints! The collection feels premium yet affordable, and their customer support team is so helpful with sizing and recommendations.",
            name: "Sarah L.",
            role: "Civil Engineer",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-[#e8e0d5] px-8 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div className="max-w-3xl">
                        <h2 className="text-5xl md:text-6xl font-bold text-[#4a3428] mb-4">
                            Fashion That Speaks for Itself
                        </h2>
                        <p className="text-lg text-gray-600">
                            Hear what our happy customers say about their shopping experience and favorite styles. Real reviews from real fashion lovers.
                        </p>
                    </div>

                    <button className="flex items-center gap-2 px-8 py-4 border-2 border-[#4a3428] text-[#4a3428] rounded-full font-medium hover:bg-[#4a3428] hover:text-white transition-colors">
                        See all
                        <BsArrowUpRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-[#f5f0e8] rounded-3xl p-8 border border-[#d4c4b0] hover:shadow-lg transition-shadow"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-6 h-6 fill-[#4a3428] text-[#4a3428]"
                                    />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-700 text-base mb-8 leading-relaxed">
                                {testimonial.text}
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-[#4a3428] text-base">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}