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
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json({ message: 'Applications retrieved successfully', data: applications });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
};
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: 'Application retrieved successfully', data: application });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve application', error: error.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: 'Application updated successfully', data: updatedApplication });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update application', error: error.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete application', error: error.message });
  }
};
