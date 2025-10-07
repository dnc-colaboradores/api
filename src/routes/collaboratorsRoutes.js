const express = require('express');
const router = express.Router();
const { getAllCollaborators, createCollaborator, getCollaboratorById } = require('../controllers/collaboratorsController');

// Rotas CRUD 
router.get('/', getAllCollaborators); // Listar
router.get('/:id', getCollaboratorById) // Buscar por ID
router.post('/', createCollaborator); // Criar

module.exports = router;
