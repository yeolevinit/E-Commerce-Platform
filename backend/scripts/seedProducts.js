import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Product from '../models/Product.js';
import connectDB from '../config/db.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: join(__dirname, '../.env') });

// Sample products data
const sampleProducts = [
    // Electronics
    {
        name: 'Wireless Bluetooth Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Experience crystal-clear audio with deep bass and comfortable over-ear design.',
        price: 2999,
        compareAtPrice: 4999,
        category: 'electronics',
        subcategory: 'Audio',
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'
        ],
        stock: 50,
        sku: 'ELEC-HEAD-001',
        tags: ['wireless', 'bluetooth', 'headphones', 'audio'],
        featured: true,
        latest: true,
        rating: 4.5,
        reviewCount: 128,
        specifications: {
            'Battery Life': '30 hours',
            'Connectivity': 'Bluetooth 5.0',
            'Weight': '250g',
            'Color': 'Black'
        }
    },
    {
        name: 'Smart Watch Pro',
        description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life. Track your workouts, sleep, and stay connected.',
        price: 4499,
        compareAtPrice: 6999,
        category: 'electronics',
        subcategory: 'Wearables',
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop'
        ],
        stock: 35,
        sku: 'ELEC-WATCH-001',
        tags: ['smartwatch', 'fitness', 'wearable', 'health'],
        featured: true,
        latest: true,
        rating: 4.7,
        reviewCount: 256,
        specifications: {
            'Display': '1.4" AMOLED',
            'Battery': '7 days',
            'Water Resistance': '5 ATM',
            'Sensors': 'Heart Rate, GPS, Accelerometer'
        }
    },
    {
        name: 'Portable Bluetooth Speaker',
        description: '360° sound with powerful bass. Waterproof design perfect for outdoor adventures. 12-hour playtime on a single charge.',
        price: 1799,
        compareAtPrice: 2999,
        category: 'electronics',
        subcategory: 'Audio',
        images: [
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'
        ],
        stock: 75,
        sku: 'ELEC-SPEAK-001',
        tags: ['speaker', 'bluetooth', 'portable', 'waterproof'],
        featured: false,
        latest: true,
        rating: 4.3,
        reviewCount: 89,
        specifications: {
            'Battery': '12 hours',
            'Water Resistance': 'IPX7',
            'Connectivity': 'Bluetooth 5.0',
            'Output': '20W'
        }
    },

    // Clothing
    {
        name: 'Classic Cotton T-Shirt',
        description: 'Premium 100% cotton t-shirt with a comfortable fit. Available in multiple colors. Perfect for everyday wear.',
        price: 599,
        compareAtPrice: 999,
        category: 'clothing',
        subcategory: 'T-Shirts',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop'
        ],
        stock: 150,
        sku: 'CLOTH-TSHIRT-001',
        tags: ['t-shirt', 'cotton', 'casual', 'comfortable'],
        featured: true,
        latest: false,
        rating: 4.6,
        reviewCount: 342,
        specifications: {
            'Material': '100% Cotton',
            'Fit': 'Regular',
            'Care': 'Machine Washable',
            'Available Sizes': 'S, M, L, XL, XXL'
        }
    },
    {
        name: 'Denim Jacket',
        description: 'Timeless denim jacket with a modern fit. Durable construction with classic styling. A wardrobe essential.',
        price: 2499,
        compareAtPrice: 3999,
        category: 'clothing',
        subcategory: 'Jackets',
        images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop'
        ],
        stock: 60,
        sku: 'CLOTH-JACKET-001',
        tags: ['jacket', 'denim', 'casual', 'fashion'],
        featured: true,
        latest: true,
        rating: 4.8,
        reviewCount: 178,
        specifications: {
            'Material': 'Denim',
            'Fit': 'Slim Fit',
            'Closure': 'Button',
            'Pockets': '4'
        }
    },
    {
        name: 'Formal Shirt',
        description: 'Elegant formal shirt perfect for office and special occasions. Wrinkle-resistant fabric with a tailored fit.',
        price: 1299,
        compareAtPrice: 1999,
        category: 'clothing',
        subcategory: 'Shirts',
        images: [
            'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop'
        ],
        stock: 90,
        sku: 'CLOTH-SHIRT-001',
        tags: ['shirt', 'formal', 'office', 'professional'],
        featured: false,
        latest: false,
        rating: 4.4,
        reviewCount: 156,
        specifications: {
            'Material': 'Cotton Blend',
            'Fit': 'Slim Fit',
            'Collar': 'Spread Collar',
            'Sleeve': 'Full Sleeve'
        }
    },

    // Shoes
    {
        name: 'Running Shoes Pro',
        description: 'High-performance running shoes with advanced cushioning technology. Lightweight and breathable for maximum comfort.',
        price: 3499,
        compareAtPrice: 5499,
        category: 'shoes',
        subcategory: 'Sports',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop'
        ],
        stock: 45,
        sku: 'SHOE-RUN-001',
        tags: ['shoes', 'running', 'sports', 'athletic'],
        featured: true,
        latest: true,
        rating: 4.7,
        reviewCount: 234,
        specifications: {
            'Type': 'Running',
            'Sole': 'Rubber',
            'Closure': 'Lace-up',
            'Available Sizes': '6, 7, 8, 9, 10, 11'
        }
    },
    {
        name: 'Casual Sneakers',
        description: 'Stylish casual sneakers perfect for everyday wear. Comfortable cushioned insole with durable construction.',
        price: 1999,
        compareAtPrice: 2999,
        category: 'shoes',
        subcategory: 'Casual',
        images: [
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
        ],
        stock: 80,
        sku: 'SHOE-SNEAK-001',
        tags: ['sneakers', 'casual', 'comfortable', 'fashion'],
        featured: false,
        latest: true,
        rating: 4.5,
        reviewCount: 167,
        specifications: {
            'Type': 'Casual',
            'Material': 'Canvas',
            'Sole': 'Rubber',
            'Closure': 'Lace-up'
        }
    },

    // Accessories
    {
        name: 'Leather Wallet',
        description: 'Genuine leather wallet with RFID protection. Multiple card slots and bill compartments. Slim and elegant design.',
        price: 899,
        compareAtPrice: 1499,
        category: 'accessories',
        subcategory: 'Wallets',
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop'
        ],
        stock: 120,
        sku: 'ACC-WALLET-001',
        tags: ['wallet', 'leather', 'rfid', 'accessories'],
        featured: true,
        latest: false,
        rating: 4.6,
        reviewCount: 289,
        specifications: {
            'Material': 'Genuine Leather',
            'RFID Protection': 'Yes',
            'Card Slots': '8',
            'Dimensions': '11 x 9 cm'
        }
    },
    {
        name: 'Sunglasses UV Protection',
        description: 'Stylish sunglasses with 100% UV protection. Polarized lenses reduce glare. Durable frame with premium finish.',
        price: 1299,
        compareAtPrice: 2499,
        category: 'accessories',
        subcategory: 'Eyewear',
        images: [
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop'
        ],
        stock: 65,
        sku: 'ACC-SUNGLASS-001',
        tags: ['sunglasses', 'uv protection', 'polarized', 'fashion'],
        featured: false,
        latest: true,
        rating: 4.4,
        reviewCount: 145,
        specifications: {
            'UV Protection': '100%',
            'Lens': 'Polarized',
            'Frame Material': 'Metal',
            'Lens Width': '55mm'
        }
    },
    {
        name: 'Backpack Laptop Bag',
        description: 'Spacious laptop backpack with multiple compartments. Padded laptop sleeve fits up to 15.6". Water-resistant material.',
        price: 1799,
        compareAtPrice: 2999,
        category: 'accessories',
        subcategory: 'Bags',
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
        ],
        stock: 55,
        sku: 'ACC-BAG-001',
        tags: ['backpack', 'laptop bag', 'travel', 'water-resistant'],
        featured: true,
        latest: true,
        rating: 4.7,
        reviewCount: 198,
        specifications: {
            'Laptop Size': 'Up to 15.6"',
            'Material': 'Polyester',
            'Water Resistant': 'Yes',
            'Compartments': '5'
        }
    },

    // Home
    {
        name: 'Ceramic Coffee Mug Set',
        description: 'Set of 4 elegant ceramic coffee mugs. Microwave and dishwasher safe. Perfect for your morning coffee or tea.',
        price: 799,
        compareAtPrice: 1299,
        category: 'home',
        subcategory: 'Kitchen',
        images: [
            'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop'
        ],
        stock: 100,
        sku: 'HOME-MUG-001',
        tags: ['mug', 'coffee', 'ceramic', 'kitchen'],
        featured: false,
        latest: false,
        rating: 4.5,
        reviewCount: 223,
        specifications: {
            'Quantity': '4 pieces',
            'Material': 'Ceramic',
            'Capacity': '350ml each',
            'Dishwasher Safe': 'Yes'
        }
    }
];

// Seed function
const seedProducts = async () => {
    try {
        // Connect to database
        await connectDB();

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert sample products
        const products = await Product.insertMany(sampleProducts);
        console.log(`✅ Successfully seeded ${products.length} products`);

        // Display summary
        console.log('\n📊 Product Summary:');
        const categories = await Product.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);
        categories.forEach(cat => {
            console.log(`   ${cat._id}: ${cat.count} products`);
        });

        console.log('\n🎯 Featured products:', await Product.countDocuments({ featured: true }));
        console.log('🆕 Latest products:', await Product.countDocuments({ latest: true }));

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding products:', error);
        process.exit(1);
    }
};

// Run seed function
seedProducts();
