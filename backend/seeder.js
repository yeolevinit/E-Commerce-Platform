import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const products = [
    // Electronics
    {
        name: 'Wireless Noise-Canceling Headphones',
        description: 'Immerse yourself in music with these premium noise-canceling headphones. Featuring 30-hour battery life, plush ear cushions, and crystal-clear sound quality.',
        price: 14999,
        compareAtPrice: 19999,
        category: 'electronics',
        images: [
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80'
        ],
        stock: 50,
        rating: 4.8,
        reviewCount: 124,
        featured: true,
        latest: true,
        specifications: {
            'Battery Life': '30 Hours',
            'Connectivity': 'Bluetooth 5.0',
            'Color': 'Matte Black'
        }
    },
    {
        name: 'Ultra-Slim 4K Smart Laptop',
        description: 'Power meets portability. This 14-inch laptop features a stunning 4K display, latest gen processor, and all-day battery life perfect for professionals.',
        price: 84999,
        compareAtPrice: 95999,
        category: 'electronics',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
            'https://images.unsplash.com/photo-1531297461136-82af022f0879?w=800&q=80'
        ],
        stock: 20,
        rating: 4.9,
        reviewCount: 85,
        featured: true,
        specifications: {
            'Processor': 'Intel Core i7',
            'RAM': '16GB',
            'Storage': '512GB SSD'
        }
    },
    {
        name: 'Professional DSLR Camera',
        description: 'Capture life moments in stunning detail. Includes 18-55mm lens, 24MP sensor, and 4K video recording capabilities.',
        price: 45000,
        category: 'electronics',
        images: [
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
            'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80'
        ],
        stock: 15,
        rating: 4.7,
        reviewCount: 42
    },

    // Clothing
    {
        name: 'Classic White Cotton T-Shirt',
        description: 'Essential wardrobe staple. Made from 100% organic cotton for maximum comfort and durability.',
        price: 999,
        compareAtPrice: 1499,
        category: 'clothing',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80'
        ],
        stock: 100,
        rating: 4.5,
        reviewCount: 200,
        latest: true
    },
    {
        name: 'Denim Jacket Vintage Wash',
        description: 'Timeless style. This vintage wash denim jacket adds a cool edge to any outfit. Relaxed fit.',
        price: 3499,
        category: 'clothing',
        images: [
            'https://images.unsplash.com/photo-1627685250444-a957b425553e?w=800&q=80',
            'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80'
        ],
        stock: 40,
        rating: 4.6,
        reviewCount: 56,
        featured: true
    },

    // Shoes
    {
        name: 'Urban Running Sneakers',
        description: 'Lightweight performance running shoes with breathable mesh and responsive cushioning.',
        price: 4999,
        compareAtPrice: 6500,
        category: 'shoes',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'
        ],
        stock: 60,
        rating: 4.8,
        reviewCount: 89,
        specifications: {
            'Size': 'UK 8',
            'Color': 'Red/White',
            'Material': 'Mesh/Synthetic'
        }
    },
    {
        name: 'Leather Formal Brogues',
        description: 'Handcrafted leather brogues tailored for the modern gentleman. Elegant and comfortable.',
        price: 7999,
        category: 'shoes',
        images: [
            'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80',
            'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=800&q=80'
        ],
        stock: 25,
        rating: 4.9,
        reviewCount: 34
    },

    // Accessories
    {
        name: 'Minimalist Leather Watch',
        description: 'A sophisticated timepiece with a genuine leather strap and minimal dial design.',
        price: 2499,
        compareAtPrice: 5000,
        category: 'accessories',
        images: [
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80',
            'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80'
        ],
        stock: 45,
        rating: 4.6,
        reviewCount: 67,
        latest: true
    },
    {
        name: 'Polarized Aviator Sunglasses',
        description: 'Classic aviator style with polarized lenses to protect your eyes and look stylish.',
        price: 1299,
        category: 'accessories',
        images: [
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'
        ],
        stock: 80,
        rating: 4.4,
        reviewCount: 112
    },

    // Home
    {
        name: 'Modern Ceramic Planter',
        description: 'Elevate your indoor garden with this sleek ceramic planter. Perfect for succulents and small plants.',
        price: 799,
        category: 'home',
        images: [
            'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80'
        ],
        stock: 30,
        rating: 4.8,
        reviewCount: 23,
        specifications: {
            'Material': 'Ceramic',
            'Dimensions': '6x6 inches'
        }
    },
    {
        name: 'Ergonomic Office Chair',
        description: 'Work in comfort with adjustable lumbar support, mesh back, and premium cushioning.',
        price: 12999,
        compareAtPrice: 15999,
        category: 'home',
        images: [
            'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80'
        ],
        stock: 12,
        rating: 4.7,
        reviewCount: 45,
        featured: true
    },

    // Beauty
    {
        name: 'Organic Facial Moisturizer',
        description: 'Hydrate and rejuvenate your skin with natural ingredients. Paraben-free and suitable for all skin types.',
        price: 899,
        category: 'beauty',
        images: [
            'https://images.unsplash.com/photo-1570175823122-126a58306655?w=800&q=80',
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'
        ],
        stock: 75,
        rating: 4.9,
        reviewCount: 150,
        latest: true
    },

    // Sports
    {
        name: 'Non-Slip Yoga Mat',
        description: 'Premium yoga mat with excellent grip and cushioning. Eco-friendly material.',
        price: 1599,
        category: 'sports',
        images: [
            'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80',
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80'
        ],
        stock: 40,
        rating: 4.6,
        reviewCount: 78
    },
    {
        name: 'Adjustable Dumbbell Set',
        description: 'Space-saving adjustable dumbbells ranging from 2kg to 20kg. Perfect for home workouts.',
        price: 7999,
        category: 'sports',
        images: [
            'https://images.unsplash.com/photo-1583454110561-591d053626de?w=800&q=80'
        ],
        stock: 10,
        rating: 4.8,
        reviewCount: 33
    },

    // Books
    {
        name: 'Design Patterns Guide',
        description: 'Comprehensive guide to modern software design patterns. Essential for developers.',
        price: 1299,
        category: 'books',
        images: [
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
            'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80'
        ],
        stock: 60,
        rating: 4.9,
        reviewCount: 210,
        specifications: {
            'Pages': '450',
            'Author': 'Tech Expert',
            'Language': 'English'
        }
    },

    // Toys
    {
        name: 'Building Blocks Set',
        description: 'Unleash creativity with this 500-piece building block set. Fun for all ages.',
        price: 2499,
        category: 'toys',
        images: [
            'https://images.unsplash.com/photo-1587654780291-39c940483731?w=800&q=80'
        ],
        stock: 35,
        rating: 4.7,
        reviewCount: 56
    },

    // Other
    {
        name: 'Premium Sketchbook',
        description: 'High-quality paper sketchbook for artists. Hardcover with 120gsm paper.',
        price: 599,
        category: 'other',
        images: [
            'https://images.unsplash.com/photo-1501066927591-69394647e3a5?w=800&q=80'
        ],
        stock: 100,
        rating: 4.8,
        reviewCount: 44
    }
];

const importData = async () => {
    try {
        // Clear existing products
        await Product.deleteMany();

        console.log('Previous Data Destroyed...');

        const createdProducts = await Product.insertMany(products);

        console.log(`Successfully Imported ${createdProducts.length} Products!`);
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
