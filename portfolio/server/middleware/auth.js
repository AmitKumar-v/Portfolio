import jwt from 'jsonwebtoken';

// Put this before any route that only the admin may use.
// It checks the token sent in the "Authorization: Bearer <token>" header.
export default function protect(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Please log in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next(); // token is valid, continue to the controller
  } catch {
    res.status(401).json({ message: 'Session expired. Please log in again' });
  }
}
