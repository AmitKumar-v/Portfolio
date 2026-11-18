import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// POST /api/auth/login
export async function login(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  // Same message for "no such user" and "wrong password" so nobody can guess which emails exist
  const passwordMatches = user && (await bcrypt.compare(password, user.password));
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Wrong email or password' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, email: user.email });
}
