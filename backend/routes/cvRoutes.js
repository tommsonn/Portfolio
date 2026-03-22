import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import CV from '../models/CV.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, uniqueSuffix + '-' + sanitizedName);
  }
});

// File filter - only accept PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// ==================== CV ENDPOINTS ====================

/**
 * POST /api/cv/upload
 * Upload a new CV (PDF file)
 */
router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create CV record in database
    const cvRecord = new CV({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      filePath: `/uploads/${req.file.filename}`
    });

    await cvRecord.save();

    res.status(201).json({
      success: true,
      message: 'CV uploaded successfully',
      cv: cvRecord
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/cv/list
 * Get all uploaded CVs
 */
router.get('/list', async (req, res) => {
  try {
    const cvs = await CV.find().sort({ uploadedAt: -1 });
    res.json(cvs);
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/cv/download
 * Download the latest CV (for homepage download button)
 */
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

    // Download the file with original name
    res.download(filePath, latestCV.originalName);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/cv/download/:id
 * View/Download a specific CV by ID (for admin viewing)
 */
router.get('/download/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid CV ID format' });
    }

    const cv = await CV.findById(id);

    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    const filePath = join(__dirname, '../public', cv.filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Send file for viewing in browser (opens in new tab)
    res.sendFile(filePath);
  } catch (error) {
    console.error('View error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/cv/:id
 * Delete a CV by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid CV ID format' });
    }

    // Find and delete the CV record
    const cv = await CV.findByIdAndDelete(id);

    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    // Delete the actual file from storage
    const filePath = join(__dirname, '../public', cv.filePath);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    }

    res.json({ 
      success: true, 
      message: 'CV deleted successfully' 
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
