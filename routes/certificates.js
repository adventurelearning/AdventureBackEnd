const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Certificate = require('../models/Certificate');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Calculate duration in days between two dates
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end dates
};

// POST - Upload certificate with image and course details
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const { name, certificateNumber, mobileNumber, course, startDate, endDate } = req.body;
    
    // Validate dates
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const duration = calculateDuration(startDate, endDate);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'certificates' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    // Save to database
    const certificate = new Certificate({
      name,
      certificateNumber,
      mobileNumber,
      course,
      duration,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      imageUrl: result.secure_url,
      publicId: result.public_id
    });

    await certificate.save();
    res.status(201).json(certificate);
  } catch (error) {
    console.error('Upload error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Certificate number already exists' });
    }
    res.status(500).json({ message: 'Server error during upload' });
  }
});

// GET - Retrieve all certificates (for admin)
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Search certificates by various parameters
router.get('/search', async (req, res) => {
  try {
    const { name, certificateNumber, mobileNumber, course } = req.query;
    
    if (!name && !certificateNumber && !mobileNumber && !course) {
      return res.status(400).json({ message: 'At least one search parameter is required' });
    }

    let query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (certificateNumber) query.certificateNumber = certificateNumber;
    if (mobileNumber) query.mobileNumber = mobileNumber;
    if (course) query.course = course;

    const certificates = await Certificate.find(query);
    
    if (certificates.length === 0) {
      return res.status(404).json({ message: 'No certificates found with the provided details' });
    }
    
    res.json(certificates);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error during search' });
  }
});

// GET - Verify certificate existence
router.get('/verify', async (req, res) => {
  try {
    const { name, certificateNumber, mobileNumber, verifyByNumberOnly } = req.query;
    
    // If verifyByNumberOnly is true, only certificateNumber is required
    if (verifyByNumberOnly === 'true') {
      if (!certificateNumber) {
        return res.status(400).json({ 
          verified: false, 
          message: 'Certificate number is required for verification' 
        });
      }

      const certificate = await Certificate.findOne({ certificateNumber });
      
      if (certificate) {
        return res.json({ 
          verified: true, 
          message: "Certificate is verified successfully!",
          certificate 
        });
      } else {
        return res.status(404).json({ 
          verified: false, 
          message: "Certificate not found. Please check your certificate number." 
        });
      }
    }
    
    // Original verification logic (requires all fields)
    if (!name || !certificateNumber || !mobileNumber) {
      return res.status(400).json({ 
        verified: false, 
        message: 'All fields are required for verification' 
      });
    }

    const certificate = await Certificate.findOne({
      name: new RegExp(name, 'i'),
      certificateNumber,
      mobileNumber
    });

    if (certificate) {
      res.json({ 
        verified: true, 
        message: "Certificate is verified successfully!",
        certificate 
      });
    } else {
      res.status(404).json({ 
        verified: false, 
        message: "Certificate not found. Please check your details." 
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      verified: false, 
      message: "Server error during verification" 
    });
  }
});

// GET - Verify certificate by certificate number with tracking
router.get('/verify-by-number', async (req, res) => {
  try {
    const { certificateNumber } = req.query;
    
    if (!certificateNumber) {
      return res.status(400).json({ 
        verified: false, 
        message: 'Certificate number is required for verification' 
      });
    }

    const certificate = await Certificate.findOne({
      certificateNumber: certificateNumber
    });

    if (certificate) {
      // Update verification statistics
      await certificate.updateVerificationStats();
      
      res.json({ 
        verified: true, 
        message: "Certificate is verified successfully!",
        certificate 
      });
    } else {
      res.status(404).json({ 
        verified: false, 
        message: "Certificate not found. Please check your certificate number." 
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      verified: false, 
      message: "Server error during verification" 
    });
  }
});

// GET - Get certificate by ID for download
router.get('/download/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    res.json({
      name: certificate.name,
      certificateNumber: certificate.certificateNumber,
      mobileNumber: certificate.mobileNumber,
      course: certificate.course,
      duration: certificate.duration,
      startDate: certificate.startDate,
      endDate: certificate.endDate,
      imageUrl: certificate.imageUrl,
      issueDate: certificate.issueDate
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: 'Server error during download' });
  }
});

// GET - Get available courses
router.get('/courses', async (req, res) => {
  try {
    const courses = ['Web Development', 'Data Science', 'Digital Marketing', 'Graphic Design', 'Cloud Computing'];
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Remove certificate by ID
router.delete('/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(certificate.publicId);

    // Delete record from MongoDB
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;