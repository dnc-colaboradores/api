const express = require('express');
const router = express.Router();
const { getAllCollaborators, createCollaborator, getCollaboratorById } = require('../controllers/collaboratorsController');
const { authenticate, authorizeByRole } = require('../middlewares/auth');

// Rotas CRUD 
router.get('/', authenticate, getAllCollaborators); // Listar
router.get('/:id', authenticate, getCollaboratorById) // Buscar por ID
router.post('/', authenticate, authorizeByRole(['ADMIN']), createCollaborator); // Criar

module.exports = router;
