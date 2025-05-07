const express = require('express');
const router = express.Router();
const { submitContact } = require('../controller/ContactTechController');

router.post('/submit', submitContact);

module.exports = router;
