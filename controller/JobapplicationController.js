const Application = require('../models/JobApplicationModel');

exports.submitApplication = async (req, res) => {
  try {
    const { fullName, email, phone, resumeUrl, coverLetter } = req.body;

    if (!fullName || !email || !phone || !resumeUrl) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const application = new Application({ fullName, email, phone, resumeUrl, coverLetter });
    await application.save();

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
