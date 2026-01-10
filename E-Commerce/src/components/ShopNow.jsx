import React from 'react';

export default function HeroSection() {
    return (
        <div className="min-h-screen bg-[#e8e0d5] flex items-center justify-center px-6 py-4">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <div className="space-y-8">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#4a3428] leading-tight">
                        Exclusive Offers for<br />a Limited Time
                    </h1>

                    <p className="text-md text-gray-600 max-w-md">
                        Modern and stylish fashion store website design with a clean layout and elegant product showcase.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="bg-[#5d4437] text-white px-8 py-4 rounded-full font-medium hover:bg-[#4a3428] transition-colors">
                            Shop Now
                        </button>
                        <button className="bg-transparent text-[#5d4437] px-8 py-4 rounded-full font-medium border-2 border-[#5d4437] hover:bg-[#5d4437] hover:text-white transition-colors">
                            Explore Collection
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="https://media.istockphoto.com/id/626856214/photo/women-clothing-fall-winter-collection.jpg?s=612x612&w=0&k=20&c=I9gqM2C3sxR6e_NgelLInb_wt5R89IT6swiy0VFhhqw="
                            alt="Fashion Store Interior"
                            className="w-full h-[500px] object-cover"
                        />
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#b8a890] rounded-full opacity-50 z-10"></div>
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#d4c4b0] rounded-full opacity-50 z-10"></div>
                </div>

            </div>
        </div>
    );
}