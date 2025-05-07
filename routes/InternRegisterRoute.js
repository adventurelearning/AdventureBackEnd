const express = require('express');
const router = express.Router();
const formController = require('../controller/internRegController');

router.post('/submit', formController.submitForm);

module.exports = router;
