import express from 'express';
import { createCheckoutSession, verifyPayment, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkout', protect, createCheckoutSession);
router.post('/verify', protect, verifyPayment);
router.get('/myorders', protect, getMyOrders);

export default router;
