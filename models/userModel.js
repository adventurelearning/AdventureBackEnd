const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    token: String,            // JWT token
    userAgent: String,        // Device info
    ip: String,               // IP address
    lastLogin: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    device: deviceSchema      // Embedded one active device session
});

module.exports = mongoose.model('User', userSchema);
