const express = require('express');
const router = express.Router();
const controller = require('../controller/CorporateTraining');

router.post('/', controller.createEntry);
router.get('/', controller.getAllEntries);
router.get('/:id', controller.getSingleEntry);
router.put('/:id', controller.updateEntry);
router.delete('/:id', controller.deleteEntry);

module.exports = router;
