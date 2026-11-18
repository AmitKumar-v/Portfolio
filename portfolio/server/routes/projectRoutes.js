import { Router } from 'express';
import protect from '../middleware/auth.js';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js';

const router = Router();

router.get('/', getProjects); // anyone can read
router.post('/', protect, createProject); // only admin below this line
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
