const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  },
  studentCredentials: {
    username: {
      type: String,
      unique: true,
      sparse: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
});

certificateSchema.index({ certificateNumber: 1 });
certificateSchema.index({ name: 'text' });
certificateSchema.index({ mobileNumber: 1 });
certificateSchema.index({ 'studentCredentials.username': 1 });

certificateSchema.methods.updateVerificationStats = function() {
  this.verificationCount += 1;
  this.lastVerified = new Date();
  return this.save();
};

certificateSchema.methods.generateUsername = function() {
  const namePart = this.name.replace(/\s+/g, '').toLowerCase().substring(0, 6);
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${namePart}${randomPart}`;
};

certificateSchema.methods.setPassword = async function(password) {
  const saltRounds = 10;
  this.studentCredentials.password = await bcrypt.hash(password, saltRounds);
  return this.save();
};

certificateSchema.statics.findByUsername = function(username) {
  return this.findOne({ 'studentCredentials.username': username });
};

module.exports = mongoose.model('Certificate', certificateSchema);