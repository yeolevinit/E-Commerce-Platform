import React from 'react';
import { useSelector } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
import { TbShoppingBag } from "react-icons/tb";
import { GoPerson } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import UserMenu from './UserMenu';

// Import Swiper styles
import 'swiper/css';

const Header = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const cartItemsCount = cart?.items?.length || 0;
    const announcement = "Enjoy 20% off on your first purchase & Free Shipping on Orders Over $50.";

    const handlePersonIconClick = () => {
        if (!user) {
            navigate('/login');
        }
    };

    return (
        <>
            <div className="bg-[#4a3728] text-white p-2 overflow-hidden">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    speed={20000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    allowTouchMove={false}
                    className="announcement-swiper"
                >
                    <SwiperSlide>
                        <div className="flex justify-center items-center whitespace-nowrap">
                            <span className="font-medium text-md">
                                {announcement}
                            </span>
                            <span className="font-medium text-md mx-10">
                                {announcement}
                            </span>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="flex justify-center items-center whitespace-nowrap">
                            <span className="font-medium text-md">
                                {announcement}
                            </span>
                            <span className="font-medium text-md mx-20">
                                {announcement}
                            </span>

                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className='flex justify-between items-center bg-[#FAF9F6] h-[75px] border-b-[1px] border-[#E5E7EB] px-24'>
                <div className='font-bold font-cookie text-4xl text-[#4a3728] px-16'>Logo</div>
                <div className='flex gap-8 font-medium text-gray-500'>
                    <Link to="/">Home</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>
                <div className='flex items-center justify-between font-medium px-6 text-3xl gap-4 text-[#4a3728]'>
                    <IoSearchOutline />
                    <Link to="/cart" className="relative hover:text-[#9c6b3f] transition-colors">
                        <TbShoppingBag />
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <UserMenu />
                    ) : (
                        <button onClick={handlePersonIconClick} className="hover:text-[#9c6b3f] hover:cursor-pointer transition-colors">
                            <GoPerson />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;