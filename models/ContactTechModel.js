const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String,  }
}, { timestamps: true });

module.exports = mongoose.model('ContactTech', contactSchema);
