import Resume from '../models/Resume.js';

// GET /api/resume  (public)  tells the website if a resume exists, without sending the file
export async function getResumeInfo(req, res) {
  const resume = await Resume.findOne().select('-data');
  if (!resume) return res.json({ exists: false });
  res.json({ exists: true, filename: resume.filename, size: resume.size, updatedAt: resume.updatedAt });
}

// GET /api/resume/download  (public)  sends the PDF file
export async function downloadResume(req, res) {
  const resume = await Resume.findOne();
  if (!resume) return res.status(404).json({ message: 'No resume uploaded yet' });

  res.set({
    'Content-Type': resume.contentType,
    // "attachment" makes the browser download the file instead of opening it
    'Content-Disposition': `attachment; filename="${resume.filename}"`,
  });
  res.send(resume.data);
}

// POST /api/resume  (admin only)  replaces the current resume with the uploaded one
export async function uploadResume(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'Please choose a PDF file' });
  }

  // A real PDF always starts with "%PDF". This blocks files that only pretend to be PDFs.
  if (req.file.buffer.subarray(0, 4).toString() !== '%PDF') {
    return res.status(400).json({ message: 'This file is not a valid PDF' });
  }

  // Keep only safe characters in the file name
  const safeName = req.file.originalname.replace(/[^A-Za-z0-9._-]/g, '-');

  await Resume.findOneAndUpdate(
    {}, // match the existing resume, if any
    { filename: safeName, contentType: 'application/pdf', size: req.file.size, data: req.file.buffer },
    { upsert: true, new: true } // create it if it does not exist yet
  );

  res.json({ message: 'Resume updated' });
}

// DELETE /api/resume  (admin only)
export async function deleteResume(req, res) {
  await Resume.deleteMany();
  res.json({ message: 'Resume deleted' });
}
