// src/routes/userRoutes.ts
import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);


router.post('/login', loginUser);


router.get('/profile', protect, (req:any, res) => {
  res.status(200).json({
    message: `Hello, ${req.user?.name}`, // TypeScript should now recognize `req.user`
  });
});

export default router;
