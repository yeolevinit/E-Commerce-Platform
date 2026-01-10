import React from 'react';

export default function SeasonalCollection() {
    const collections = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=600&fit=crop",
            season: "WINTER"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            season: "SUMMER"
        }
    ];

    return (
        <div className="min-h-screen bg-[#e8e0d5] px-8 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-bold text-[#4a3428] mb-4">
                        Seasonal Collection
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Modern and stylish fashion store website design with a clean layout and elegant product showcase.
                    </p>
                </div>

                {/* Collection Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {collections.map((collection) => (
                        <div
                            key={collection.id}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow">
                                <img
                                    src={collection.image}
                                    alt={`${collection.season} Collection`}
                                    className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Season Label */}
                                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-white px-12 py-4 rounded-full shadow-md">
                                        <span className="text-[#4a3428] font-semibold text-lg tracking-wider">
                                            {collection.season}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}