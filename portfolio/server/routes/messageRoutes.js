import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import protect from '../middleware/auth.js';
import { createMessage, getMessages, deleteMessage } from '../controllers/messageController.js';

const router = Router();

// Max 5 messages per hour from one IP, so the form cannot be spammed
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: { message: 'You have sent too many messages. Please try again later' },
});

router.post('/', contactLimiter, createMessage); // public
router.get('/', protect, getMessages); // admin only
router.delete('/:id', protect, deleteMessage);

export default router;
