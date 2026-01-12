import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { TbShoppingBag } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";


const hero = () => {
    return (
        <div className='max-w-7xl mx-auto px-4 py-10'>
            <div className='relative h-[520px] rounded-2xl overflow-hidden bg-neutral-200'>
                <img className='absolute inset-0 w-full h-full object-cover rounded-2xl object-center' src="https://wallpapers.com/images/featured/clothes-background-ot7pkynbf8g28jsr.jpg" alt="" />
                <div className="absolute inset-0 bg-black/40" ></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">

                    <h1 className="text-5xl md:text-4xl sm:text-3xl font-semibold">
                        WEAR YOUR CONFIDENCE
                    </h1>

                    <p className="mt-4 max-w-2xl text-base md:text-lg text-white/90">
                        Modern and stylish fashion store website design with a clean layout and elegant product showcase.
                        Perfect for clothing brands, boutiques, and online fashion shops.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-6 justify-center">
                        <Link to="/shop" className="bg-white text-black px-6 py-3 rounded-full text-base font-medium hover:bg-neutral-100 transition">
                            Shop Now
                        </Link>
                        <Link to="/categories" className="border border-white px-6 py-3 rounded-full text-base font-medium hover:bg-white hover:text-black transition">
                            Explore Collection
                        </Link>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default hero