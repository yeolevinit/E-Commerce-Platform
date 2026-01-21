import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true,
        maxlength: [200, 'Product name cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a product description'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a product price'],
        min: [0, 'Price cannot be negative'],
        default: 0
    },
    compareAtPrice: {
        type: Number,
        min: [0, 'Compare price cannot be negative'],
        default: null
    },
    category: {
        type: String,
        required: [true, 'Please provide a product category'],
        enum: {
            values: ['electronics', 'clothing', 'shoes', 'accessories', 'home', 'beauty', 'sports', 'books', 'toys', 'other'],
            message: 'Please select a valid category'
        },
        index: true
    },
    subcategory: {
        type: String,
        trim: true
    },
    images: {
        type: [String],
        default: [],
        validate: {
            validator: function (v) {
                return v.length <= 10;
            },
            message: 'Cannot have more than 10 images'
        }
    },
    thumbnail: {
        type: String,
        default: 'https://via.placeholder.com/400'
    },
    stock: {
        type: Number,
        required: [true, 'Please provide stock quantity'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    sku: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
    tags: {
        type: [String],
        default: [],
        index: true
    },
    featured: {
        type: Boolean,
        default: false,
        index: true
    },
    latest: {
        type: Boolean,
        default: false,
        index: true
    },
    rating: {
        type: Number,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5'],
        default: 0
    },
    reviewCount: {
        type: Number,
        min: [0, 'Review count cannot be negative'],
        default: 0
    },
    specifications: {
        type: Map,
        of: String,
        default: new Map()
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true
    },
    soldCount: {
        type: Number,
        min: [0, 'Sold count cannot be negative'],
        default: 0
    }
}, {
    timestamps: true
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ featured: 1, isActive: 1 });
productSchema.index({ latest: 1, createdAt: -1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function () {
    if (this.compareAtPrice && this.compareAtPrice > this.price) {
        return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
    }
    return 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function () {
    if (this.stock === 0) return 'out_of_stock';
    if (this.stock < 10) return 'low_stock';
    return 'in_stock';
});

// Ensure virtuals are included in JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

// Pre-save middleware to set thumbnail from first image
productSchema.pre('save', function (next) {
    if (this.images && this.images.length > 0 && !this.thumbnail) {
        this.thumbnail = this.images[0];
    }
    next();
});

// Static method to get active products
productSchema.statics.getActiveProducts = function (filter = {}) {
    return this.find({ ...filter, isActive: true });
};

const Product = mongoose.model('Product', productSchema);

export default Product;
