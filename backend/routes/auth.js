import express from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected routes
router.get('/profile', protect, getUserProfile);

export default router;
