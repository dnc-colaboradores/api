const express = require('express');
const router = express.Router();
const { getAllCollaborators, createCollaborator, getCollaboratorById, updateCollaborator } = require('../controllers/collaboratorsController');
const { authenticate, authorizeByRole } = require('../middlewares/auth');

// Rotas CRUD 
router.get('/', authenticate, getAllCollaborators); // Listar
router.get('/:id', authenticate, getCollaboratorById) // Buscar por ID
router.post('/', authenticate, authorizeByRole(['ADMIN']), createCollaborator); // Criar
router.put('/:id', updateCollaborator); 

module.exports = router;
