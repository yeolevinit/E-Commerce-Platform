import Product from '../models/Product.js';

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        // Build filter object
        const filter = { isActive: true };

        // Category filter
        if (req.query.category) {
            filter.category = req.query.category;
        }

        // Price range filter
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
        }

        // Search filter
        if (req.query.search) {
            filter.$text = { $search: req.query.search };
        }

        // Featured/Latest filter
        if (req.query.featured === 'true') filter.featured = true;
        if (req.query.latest === 'true') filter.latest = true;

        // Build sort object
        let sort = {};
        const sortBy = req.query.sort || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1;
        sort[sortBy] = order;

        // Execute query
        const products = await Product.find(filter)
            .sort(sort)
            .limit(limit)
            .skip(skip)
            .select('-__v');

        // Get total count for pagination
        const total = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: {
                products,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasMore: page * limit < total
                }
            }
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).select('-__v');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (!product.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Product is no longer available'
            });
        }

        res.status(200).json({
            success: true,
            data: { product }
        });
    } catch (error) {
        console.error('Get product error:', error);

        // Handle invalid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            compareAtPrice,
            category,
            subcategory,
            images,
            thumbnail,
            stock,
            sku,
            tags,
            featured,
            latest,
            specifications
        } = req.body;

        // Validation
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, description, price, category'
            });
        }

        // Check if SKU already exists
        if (sku) {
            const existingSku = await Product.findOne({ sku });
            if (existingSku) {
                return res.status(400).json({
                    success: false,
                    message: 'Product with this SKU already exists'
                });
            }
        }

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            compareAtPrice,
            category,
            subcategory,
            images: images || [],
            thumbnail,
            stock: stock || 0,
            sku,
            tags: tags || [],
            featured: featured || false,
            latest: latest || false,
            specifications: specifications || {}
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: { product }
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if updating SKU and if it already exists
        if (req.body.sku && req.body.sku !== product.sku) {
            const existingSku = await Product.findOne({ sku: req.body.sku });
            if (existingSku) {
                return res.status(400).json({
                    success: false,
                    message: 'Product with this SKU already exists'
                });
            }
        }

        // Update product
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).select('-__v');

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: { product: updatedProduct }
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

// @desc    Delete product (soft delete)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Soft delete by setting isActive to false
        product.isActive = false;
        await product.save();

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
            data: { product }
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a search query'
            });
        }

        const products = await Product.find({
            $text: { $search: q },
            isActive: true
        })
            .select('-__v')
            .limit(20);

        res.status(200).json({
            success: true,
            data: {
                products,
                count: products.length
            }
        });
    } catch (error) {
        console.error('Search products error:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching products',
            error: error.message
        });
    }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        const products = await Product.find({
            category,
            isActive: true
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .select('-__v');

        const total = await Product.countDocuments({ category, isActive: true });

        res.status(200).json({
            success: true,
            data: {
                products,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error('Get products by category error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;

        const products = await Product.find({
            featured: true,
            isActive: true
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .select('-__v');

        res.status(200).json({
            success: true,
            data: {
                products,
                count: products.length
            }
        });
    } catch (error) {
        console.error('Get featured products error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching featured products',
            error: error.message
        });
    }
};

// @desc    Get latest products
// @route   GET /api/products/latest
// @access  Public
export const getLatestProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 8;

        const products = await Product.find({
            latest: true,
            isActive: true
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .select('-__v');

        res.status(200).json({
            success: true,
            data: {
                products,
                count: products.length
            }
        });
    } catch (error) {
        console.error('Get latest products error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching latest products',
            error: error.message
        });
    }
};
