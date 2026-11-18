import mongoose from 'mongoose';

// Only ONE resume is kept. The PDF itself is stored inside MongoDB (a resume is small),
// so it keeps working on hosts that delete uploaded files, like Render's free plan.
const resumeSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String, default: 'application/pdf' },
    size: { type: Number, required: true }, // in bytes
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Resume', resumeSchema);
