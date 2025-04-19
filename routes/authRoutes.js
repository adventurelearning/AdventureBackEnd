const express = require('express');

const authController = require('../controller/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
// router.get('/protected', verifyToken, authController.protected);

module.exports = router;
