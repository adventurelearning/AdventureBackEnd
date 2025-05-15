const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  coverLetter: { type: String }, // Optional
  status: { type: String, }
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', applicationSchema);
