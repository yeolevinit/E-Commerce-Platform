import { LiaShippingFastSolid } from "react-icons/lia";
import { MdSupportAgent } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { GrSecure } from "react-icons/gr";
const claims = [
    {
        id: 1,
        title: "Free Shipping",
        description:
            "Step into the realm of style with our unbeatable t-shirt trendsetter of today.",
        icon: <LiaShippingFastSolid />,
    },
    {
        id: 2,
        title: "24/7 Support",
        description:
            "Step into the realm of style with our unbeatable t-shirt trendsetter of today.",
        icon: <MdSupportAgent />,
    },
    {
        id: 3,
        title: "Easy Returns",
        description:
            "Step into the realm of style with our unbeatable t-shirt trendsetter of today.",
        icon: <GiReturnArrow />,
    },
    {
        id: 4,
        title: "Secure Checkout",
        description:
            "Step into the realm of style with our unbeatable t-shirt trendsetter of today.",
        icon: <GrSecure />,
    },
];


const Claims = () => {
    return (
        <section className="bg-[#f6f1ec] py-6">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {claims.map((item) => (
                        <div key={item.id}>

                            {/* Icon */}
                            <div className="text-4xl text-[#9c6b3f] mb-4 text-center px-28">
                                {item.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-[#4a3728] mb-3">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-[#7a6a5c] leading-relaxed">
                                {item.description}
                            </p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Claims;
