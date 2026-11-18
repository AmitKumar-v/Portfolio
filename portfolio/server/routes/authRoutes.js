import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { login } from '../controllers/authController.js';

const router = Router();

// Max 10 login attempts per 15 minutes from one IP, to slow down password guessing
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { message: 'Too many login attempts. Try again in a few minutes' },
});

router.post('/login', loginLimiter, login);

export default router;
