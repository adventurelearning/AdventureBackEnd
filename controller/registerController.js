const Register = require('../models/RegisterForm');
const nodemailer = require('nodemailer');
// Create new registration
// Setup transporter (you should put this outside the handler ideally)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

console.log('Transporter Config:', transporter,process.env.EMAIL_USER);

exports.createRegister = async (req, res) => {
    try {
        const register = new Register(req.body);

        const existingRegister = await Register.findOne({ email: register.email });
        if (existingRegister) {
            return res.status(400).json({ message: 'User already Registered' });
        }

        await register.save();

        // Send confirmation email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'adventure.webapp@gmail.com,info@adventuretechnologysolutions.com',
            subject: 'Course Registration Successful',
            text: `Hello ${register.name},\n\nPhone Number : ${register.phone_number}\n\n
            \n\nCourse : ${register.courses}\n\n
            https://admin.adventurelearning.in/register`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ message: 'Form saved but email not sent' });
            } else {
                console.log('Email sent:', info.response);
                return res.status(201).json({ message: 'Form submitted successfully and email sent' });
            }
        });

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
