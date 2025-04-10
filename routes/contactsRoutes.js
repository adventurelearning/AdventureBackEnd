const express = require('express');
const router = express.Router();
const controller = require('../controller/contactsController');

router.post('/', controller.createContact);
router.get('/', controller.getAllContacts);
router.get('/:id', controller.getContact);
router.put('/:id', controller.updateContact);
router.delete('/:id', controller.deleteContact);

module.exports = router;
