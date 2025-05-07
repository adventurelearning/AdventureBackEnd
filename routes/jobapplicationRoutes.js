const express = require('express');
const router = express.Router();
const applicationController = require('../controller/JobapplicationController');

router.post('/submit', applicationController.submitApplication);

module.exports = router;
