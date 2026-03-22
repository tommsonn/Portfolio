import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  filePath: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'uploadedAt',
    updatedAt: 'updatedAt'
  }
});

// Create index for faster queries
cvSchema.index({ uploadedAt: -1 });

const CV = mongoose.model('CV', cvSchema);
export default CV;
