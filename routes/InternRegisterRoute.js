const express = require('express');
const router = express.Router();
const formController = require('../controller/internRegController');

router.post('/submit', formController.submitForm);
router.get('/', formController.getAllInterns);
router.get('/:id', formController.getInternById);
router.put('/:id', formController.updateIntern);
router.delete('/:id', formController.deleteIntern);

module.exports = router;
