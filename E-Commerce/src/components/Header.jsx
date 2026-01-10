import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { TbShoppingBag } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className="bg-[#4a3728] text-white p-4 overflow-hidden">
                <div className="animate-scroll whitespace-nowrap flex gap-10">
                    {/* Original Content */}
                    <span className="font-medium font-lg mx-4">
                        Enjoy <strong>20% off</strong> on your first purchase &amp; <strong>Free Shipping</strong> on Orders Over $50.
                    </span>
                    {/* Duplicates for seamless scrolling */}
                    <span className="font-medium font-lg mx-4">
                        Enjoy <strong>20% off</strong> on your first purchase &amp; <strong>Free Shipping</strong> on Orders Over $50.
                    </span>
                    <span className="font-medium font-lg mx-4">
                        Enjoy <strong>20% off</strong> on your first purchase &amp; <strong>Free Shipping</strong> on Orders Over $50.
                    </span>
                    <span className="font-medium font-lg mx-4">
                        Enjoy <strong>20% off</strong> on your first purchase &amp; <strong>Free Shipping</strong> on Orders Over $50.
                    </span>
                </div>
            </div>
            <div className='flex justify-between items-center bg-[#FAF9F6] h-[75px] border-b-[1px] border-[#E5E7EB] px-24'>
                <div className='font-bold font-cookie text-4xl text-[#4a3728] px-16' >Logo</div>
                <div className='flex gap-8 font-medium text-gray-500' >
                    <Link to="/">Home</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>


                </div>
                <div className='flex items-center justify-between font-medium px-6 text-3xl gap-4 text-[#4a3728]'>
                    <IoSearchOutline />
                    <TbShoppingBag />
                    <GoPerson />
                </div>
            </div>
        </>
    )
}

export default Header