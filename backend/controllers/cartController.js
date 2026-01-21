import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Get cart
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add to cart
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [{
                    product: productId,
                    quantity,
                    price: product.price,
                    name: product.name,
                    image: product.thumbnail || product.images[0]
                }],
                bill: quantity * product.price
            });
        } else {
            // Check if product exists in cart
            const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);

            if (itemIndex > -1) {
                // Update quantity
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            } else {
                // Add new item
                cart.items.push({
                    product: productId,
                    quantity,
                    price: product.price,
                    name: product.name,
                    image: product.thumbnail || product.images[0]
                });
            }
            // Recalculate bill
            cart.bill = cart.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
            await cart.save();
        }
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);
        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
            cart.bill = cart.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
            await cart.save();
            res.status(200).json({ success: true, data: cart });
        } else {
            res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(p => p.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            cart.bill = cart.items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
            await cart.save();
            res.status(200).json({ success: true, data: cart });
        } else {
            res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.items = [];
        cart.bill = 0;
        await cart.save();
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
