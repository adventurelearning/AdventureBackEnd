const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  certificateNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    enum: ['Full Stack Development', 'Embedded System', 'Data Science', 'Data Analytics', 'Cloud Computing', 'Software Testing'],
    required: true
  },
  duration: {
    type: Number, // Duration in days
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'revoked', 'expired'],
    default: 'active'
  },
  verificationCount: {
    type: Number,
    default: 0
  },
  lastVerified: {
    type: Date,
    default: null
  }
});

// Index for better query performance
certificateSchema.index({ certificateNumber: 1 });
certificateSchema.index({ name: 'text' });
certificateSchema.index({ mobileNumber: 1 });

// Method to update verification stats
certificateSchema.methods.updateVerificationStats = function() {
  this.verificationCount += 1;
  this.lastVerified = new Date();
  return this.save();
};

module.exports = mongoose.model('Certificate', certificateSchema);