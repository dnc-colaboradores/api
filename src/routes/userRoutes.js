const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorizeOwnResourceOrAdmin } = require('../middlewares/auth');
const { validateUserRegistration } = require('../middlewares/validation')

router.post('/register', validateUserRegistration, userController.register);
router.put('/:id', authenticate, authorizeOwnResourceOrAdmin, userController.update);
router.get('/', authenticate, authorizeOwnResourceOrAdmin, userController.listUsers);
router.get('/:id', authenticate, authorizeOwnResourceOrAdmin, userController.showUser);
router.delete('/:id', authenticate, authorizeOwnResourceOrAdmin, userController.deleteUser);

module.exports = router;