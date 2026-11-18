import Message from '../models/Message.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/messages  (public, used by the contact form)
export async function createMessage(req, res) {
  const { name, email, message } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Please enter your name' });
  }
  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }
  if (!message || message.trim().length < 10) {
    return res.status(400).json({ message: 'Your message should be at least 10 characters' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ message: 'Your message should be under 2000 characters' });
  }

  await Message.create({ name, email, message });
  res.status(201).json({ message: 'Message sent' });
}

// GET /api/messages  (admin only)
export async function getMessages(req, res) {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
}

// DELETE /api/messages/:id  (admin only)
export async function deleteMessage(req, res) {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) return res.status(404).json({ message: 'Message not found' });
  res.json({ message: 'Message deleted' });
}
