const express = require('express');
const router = express.Router();
const { getAllCollaborators, createCollaborator, getCollaboratorById, updateCollaborator } = require('../controllers/collaboratorsController');

// Rotas CRUD 
router.get('/', getAllCollaborators); // Listar
router.get('/:id', getCollaboratorById) // Buscar por ID
router.post('/', createCollaborator); // Criar
router.put('/:id', updateCollaborator); // Atualizar por ID

module.exports = router;
