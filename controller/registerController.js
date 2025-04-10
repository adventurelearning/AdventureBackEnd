const Register = require('../models/RegisterForm');

// Create new registration
exports.createRegister = async (req, res) => {
    try {
        const register = await Register.create(req.body);
        res.status(201).json(register);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all registrations
exports.getAllRegisters = async (req, res) => {
    try {
        const registers = await Register.find();
        res.status(200).json(registers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single registration
exports.getSingleRegister = async (req, res) => {
    try {
        const register = await Register.findById(req.params.id);
        if (!register) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json(register);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a registration
exports.updateRegister = async (req, res) => {
    try {
        const register = await Register.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!register) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json(register);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a registration
exports.deleteRegister = async (req, res) => {
    try {
        const register = await Register.findByIdAndDelete(req.params.id);
        if (!register) return res.status(404).json({ message: 'Registration not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
