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
exports.getAllInterns = async (req, res) => {
  try {
    const interns = await Intern.find().sort({ createdAt: -1 });
    res.status(200).json({ message: 'Interns retrieved successfully', data: interns });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve interns', error: error.message });
  }
};
exports.getInternById = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }
    res.status(200).json({ message: 'Intern retrieved successfully', data: intern });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve intern', error: error.message });
  }
};
exports.updateIntern = async (req, res) => {
  try {
    const updatedIntern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedIntern) {
      return res.status(404).json({ message: 'Intern not found' });
    }
    res.status(200).json({ message: 'Intern updated successfully', data: updatedIntern });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update intern', error: error.message });
  }
};
exports.deleteIntern = async (req, res) => {
  try {
    const deletedIntern = await Intern.findByIdAndDelete(req.params.id);
    if (!deletedIntern) {
      return res.status(404).json({ message: 'Intern not found' });
    }
    res.status(200).json({ message: 'Intern deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete intern', error: error.message });
  }
};
