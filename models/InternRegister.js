const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  collegeName: { type: String, required: true },
  degree: { type: String, required: true },
  mainCourse: { type: String, required: true },
  internshipDomain: { type: String, required: true },
  additionalComments: { type: String },
  resumeUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('intern', formDataSchema);
