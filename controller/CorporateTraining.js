const CorporateTraining = require("../models/CorporateTraning");

// Create new entry
exports.createEntry = async (req, res) => {
  console.log(req.body);

  try {
    const entry = await CorporateTraining.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all entries
exports.getAllEntries = async (req, res) => {
  try {
    const entries = await CorporateTraining.find();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single entry
exports.getSingleEntry = async (req, res) => {
  try {
    const entry = await CorporateTraining.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: "Not found" });
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update entry
exports.updateEntry = async (req, res) => {
  try {
    const entry = await CorporateTraining.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: "Not found" });
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete entry
exports.deleteEntry = async (req, res) => {
  try {
    const entry = await CorporateTraining.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
