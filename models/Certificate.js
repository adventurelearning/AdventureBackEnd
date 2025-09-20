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
    unique: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
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
  templateImageUrl: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  studentCredentials: {
    username: {
      type: String,
      unique: true,
      sparse: true
    },
    password: String
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  verificationStats: {
    totalVerifications: {
      type: Number,
      default: 0
    },
    lastVerified: {
      type: Date
    }
  }
});

// Generate username based on name and certificate number
certificateSchema.methods.generateUsername = function() {
  const namePart = this.name.split(' ')[0].toLowerCase();
  const numberPart = this.certificateNumber.slice(-4);
  return `${namePart}${numberPart}`;
};

// Update verification stats
certificateSchema.methods.updateVerificationStats = function() {
  this.verificationStats.totalVerifications += 1;
  this.verificationStats.lastVerified = new Date();
  return this.save();
};

module.exports = mongoose.model('Certificate', certificateSchema);