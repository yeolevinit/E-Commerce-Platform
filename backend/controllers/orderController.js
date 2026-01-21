import Stripe from 'stripe';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create new order and Stripe checkout session
// @route   POST /api/orders/checkout
// @access  Private
export const createCheckoutSession = async (req, res) => {
    try {
        const { shippingAddress } = req.body;

        // 1. Get user's cart
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        // 2. Prepare line items for Stripe
        const lineItems = cart.items.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100, // Stripe expects amount in paise
            },
            quantity: item.quantity,
        }));

        // 3. Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            customer_email: req.user.email,
            metadata: {
                userId: req.user._id.toString(),
                shippingAddress: JSON.stringify(shippingAddress),
            }
        });

        // 4. Create initial order in database
        const order = new Order({
            user: req.user._id,
            orderItems: cart.items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                image: item.image,
                price: item.price,
                product: item.product
            })),
            shippingAddress: shippingAddress,
            totalPrice: cart.bill,
            stripeSessionId: session.id
        });

        const createdOrder = await order.save();

        res.status(200).json({
            success: true,
            sessionId: session.id,
            url: session.url,
            orderId: createdOrder._id
        });

    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Verify payment and update order
// @route   POST /api/orders/verify
// @access  Private
export const verifyPayment = async (req, res) => {
    try {
        const { sessionId } = req.body;

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const order = await Order.findOne({ stripeSessionId: sessionId });

            if (!order) {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            if (!order.isPaid) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    id: session.payment_intent,
                    status: session.payment_status,
                    update_time: Date.now().toString(),
                    email_address: session.customer_details.email
                };

                await order.save();

                // Clear user's cart
                await Cart.findOneAndUpdate({ user: order.user }, { items: [], bill: 0 });
            }

            res.status(200).json({ success: true, order });
        } else {
            res.status(400).json({ success: false, message: 'Payment not successful' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
