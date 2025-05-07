const Intern = require('../models/InternRegister');

exports.submitForm = async (req, res) => {
  try {
    const user = new Intern(req.body);
    await user.save();
    res.status(201).json({ message: 'Form submitted successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit form', error: error.message });
  }
};
