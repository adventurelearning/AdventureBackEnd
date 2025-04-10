const express = require('express');
const router = express.Router();
const controller = require('../controller/registerController');

router.post('/', controller.createRegister);
router.get('/', controller.getAllRegisters);
router.get('/:id', controller.getSingleRegister);
router.put('/:id', controller.updateRegister);
router.delete('/:id', controller.deleteRegister);

module.exports = router;
