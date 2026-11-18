import Project from '../models/Project.js';

// Only these fields can be saved. Anything else sent by the client is ignored.
const allowedFields = ['title', 'tagline', 'description', 'features', 'techStack', 'githubUrl', 'liveUrl', 'status', 'order'];

function pickAllowed(body = {}) {
  const data = {};
  allowedFields.forEach((field) => {
    if (body[field] !== undefined) data[field] = body[field];
  });
  return data;
}

// GET /api/projects  (public)
export async function getProjects(req, res) {
  const projects = await Project.find().sort({ order: 1, createdAt: 1 });
  res.json(projects);
}

// POST /api/projects  (admin only)
export async function createProject(req, res) {
  const project = await Project.create(pickAllowed(req.body));
  res.status(201).json(project);
}

// PUT /api/projects/:id  (admin only)
export async function updateProject(req, res) {
  const project = await Project.findByIdAndUpdate(req.params.id, pickAllowed(req.body), {
    new: true, // return the updated document
    runValidators: true,
  });
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
}

// DELETE /api/projects/:id  (admin only)
export async function deleteProject(req, res) {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json({ message: 'Project deleted' });
}
