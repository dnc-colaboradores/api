const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth')

router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);
router.get('/verify', authController.verifyToken)

module.exports = router;