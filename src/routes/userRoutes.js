const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.put('/:id', userController.update);
router.get('/', userController.listUsers);
router.get('/:id', userController.showUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;