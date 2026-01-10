import React from 'react'
import Header from '../components/Header'
import ShopNow from '../components/ShopNow'
import FeatureProduct from '../components/FeatureProduct'
import Collection from '../components/Collection'
import Review from '../components/Review'
import Footer from '../components/Footer'



const categories = [
    {
        id: 1,
        title: "WOMEN",
        image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    },
    {
        id: 2,
        title: "BOYS",
        image:
            "https://images.unsplash.com/photo-1521341957697-b93449760f30",
    },
    {
        id: 3,
        title: "GIRLS",
        image:
            "https://i.pinimg.com/1200x/20/14/71/2014711500f68ff835126f8a004a7f3b.jpg",
    },
    {
        id: 4,
        title: "MEN",
        image:
            "https://i.pinimg.com/736x/6c/b9/b0/6cb9b064fc0d6bde9c84bdfaea05440f.jpg",
    },
];



const Categories = () => {
    return (
        <div>
            <Header />

            <section className="bg-[#f7f2ed] py-24">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Heading */}
                    <div className="text-center mb-14">
                        <h2 className="text-4xl font-semibold text-[#4a3728]">
                            Categories
                        </h2>
                        <p className="mt-4 text-neutral-600">
                            Perfect for clothing brands, boutiques, and online fashion shops.
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="relative rounded-3xl overflow-hidden group"
                            >
                                {/* Image */}
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-[420px] object-cover object-top transition duration-500 group-hover:scale-105"
                                />

                                {/* Label */}
                                <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                                    <span className="bg-white/90 backdrop-blur px-10 py-2 rounded-full text-sm font-medium text-[#4a3728]">
                                        {category.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <Collection />

            <Footer />
        </div>
    )
}

export default Categories