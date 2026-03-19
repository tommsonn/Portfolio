import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import CV from '../models/CV.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cv-' + uniqueSuffix + '.pdf');
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const cvRecord = new CV({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      filePath: `/uploads/${req.file.filename}`
    });

    await cvRecord.save();

    res.status(201).json({
      message: 'CV uploaded successfully',
      cv: cvRecord
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/download', async (req, res) => {
  try {
    const latestCV = await CV.findOne().sort({ uploadedAt: -1 });

    if (!latestCV) {
      return res.status(404).json({ error: 'No CV found' });
    }

    const filePath = join(__dirname, '../public', latestCV.filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath, 'resume.pdf');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const cvs = await CV.find().sort({ uploadedAt: -1 });
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cv = await CV.findByIdAndDelete(req.params.id);

    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    const filePath = join(__dirname, '../public', cv.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
