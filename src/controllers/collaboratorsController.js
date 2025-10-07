const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os colaboradores
async function getAllCollaborators(req, res) {
  try {
    const collaborators = await prisma.collaborator.findMany();
    res.status(200).json(collaborators);
  } catch (error) {
    console.error("Erro ao listar colaboradores:", error);
    res.status(500).json({ error: "Erro ao listar colaboradores" });
  }
}

// Criar colaborador
async function createCollaborator(req, res) {
  try {
    const { matricula, nome, email, cpf_cnpj, cargo, data_nascimento } = req.body;

    if (!matricula || !nome || !email || !cpf_cnpj) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    const collaborator = await prisma.collaborator.create({
      data: {
        matricula,
        nome,
        email,
        cpf_cnpj,
        cargo,
        data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
      },
    });

    res.status(201).json(collaborator);
  } catch (error) {
    console.error("Erro ao criar colaborador:", error);
    res.status(500).json({ error: "Erro ao criar colaborador" });
  }
}

// Buscar pelo ID
async function getCollaboratorById(req, res) {
  try {
    const { id } = req.params;

    const collaborator = await prisma.collaborator.findUnique({
      where: { id },
    });

    if (!collaborator) {
      return res.status(404).json({ error: "Colaborador não encontrado" });
    }

    res.status(200).json(collaborator);
  } catch (error) {
    console.error("Erro ao buscar colaborador:", error);
    res.status(500).json({ error: "Erro ao buscar colaborador" });
  }
}

module.exports = {
  getAllCollaborators,
  createCollaborator,
  getCollaboratorById
};