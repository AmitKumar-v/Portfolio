import { Router } from 'express';
import multer from 'multer';
import protect from '../middleware/auth.js';
import { getResumeInfo, downloadResume, uploadResume, deleteResume } from '../controllers/resumeController.js';

const router = Router();

// multer reads the uploaded file. memoryStorage keeps it in memory so we can save it to MongoDB.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB maximum
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(Object.assign(new Error('Only PDF files are allowed'), { status: 400 }));
    }
  },
});

router.get('/', getResumeInfo); // public
router.get('/download', downloadResume); // public
router.post('/', protect, upload.single('resume'), uploadResume); // admin only. "resume" is the form field name
router.delete('/', protect, deleteResume); // admin only

export default router;
