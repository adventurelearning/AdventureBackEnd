const express = require('express');
const router = express.Router();
const applicationController = require('../controller/JobapplicationController');

router.post('/submit', applicationController.submitApplication);
router.get('/', applicationController.getAllApplications);
router.get('/:id', applicationController.getApplicationById);
router.put('/:id', applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
