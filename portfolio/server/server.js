// Entry point of the backend. It sets up Express, connects to MongoDB and starts listening.
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

// Allow the React app to call this API
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
// Read JSON sent in request bodies and put it in req.body
app.use(express.json());

// Every URL that starts with /api/... is sent to the matching routes file
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/resume', resumeRoutes);

// These two must come last
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start the server only after the database is connected
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
