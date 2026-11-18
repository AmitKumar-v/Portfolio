import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    tagline: { type: String, required: [true, 'Tagline is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'], trim: true },
    features: [String],
    techStack: [String],
    githubUrl: { type: String, default: '', trim: true },
    liveUrl: { type: String, default: '', trim: true },
    status: { type: String, enum: ['In progress', 'Completed'], default: 'In progress' },
    order: { type: Number, default: 0 }, // smaller number shows first
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
