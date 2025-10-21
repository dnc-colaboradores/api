const express = require('express');
const router = express.Router();
const { getAllCollaborators, createCollaborator, getCollaboratorById, updateCollaborator, deleteCollaboratoryById } = require('../controllers/collaboratorsController');
const { authenticate, authorizeOwnResourceOrAdmin } = require('../middlewares/auth');

// Rotas CRUD 
router.get('/', authenticate, getAllCollaborators);
router.get('/:id', authenticate, getCollaboratorById);
router.post('/', authenticate, authorizeOwnResourceOrAdmin, createCollaborator);
router.put('/:id', authenticate, authorizeOwnResourceOrAdmin, updateCollaborator);
router.delete('/:id', authenticate, authorizeOwnResourceOrAdmin, deleteCollaboratoryById);

module.exports = router;
