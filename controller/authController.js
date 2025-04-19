const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

const JWT_TOKEN = process.env.JWT_TOKEN;

// Register new user
exports.register = async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered' });
};

// Login with device control
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const userAgent = req.headers['user-agent'];
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username }, JWT_TOKEN, { expiresIn: '1h' });

    // Store new device info (invalidate any previous session)
    user.device = {
        token,
        userAgent,
        ip,
        lastLogin: new Date()
    };
    await user.save();

    res.json({ message: 'Login successful', token });
};

// Middleware: validate token and ensure it's the active one
exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        const user = await User.findById(decoded.id);
        if (!user || user.device.token !== token) {
            return res.status(403).json({ message: 'Session expired or invalidated' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};