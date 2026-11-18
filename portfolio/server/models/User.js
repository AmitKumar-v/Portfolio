import mongoose from 'mongoose';

// Only the admin (you) has a user account. There is no public sign-up.
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // always stored as a bcrypt hash
});

export default mongoose.model('User', userSchema);
