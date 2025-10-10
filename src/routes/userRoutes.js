const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorizeByRole, authorizeOwnResourceOrAdmin } = require('../middlewares/auth');

router.post('/register', userController.register);
router.put('/:id', authenticate, authorizeOwnResourceOrAdmin, userController.update);
router.get('/', authenticate, authorizeByRole(['ADMIN']), userController.listUsers);
router.get('/:id', authenticate, userController.showUser);
router.delete('/:id', authenticate, authorizeOwnResourceOrAdmin, userController.deleteUser);

module.exports = router;