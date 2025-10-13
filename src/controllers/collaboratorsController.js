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
    const { matricula, nome, email, cpf_cnpj, cargo, data_nascimento, ativo } = req.body;

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
        ativo,
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

// Atualizar colaborador por ID
async function updateCollaborator(req, res) {
  try {
    const { id } = req.params;
    const { matricula, nome, email, cpf_cnpj, cargo, data_nascimento, ativo } = req.body;

    if (!matricula && !nome && !email && !cpf_cnpj && !cargo && !data_nascimento && ativo === undefined) {
      return res.status(400).json({ error: "Pelo menos um campo deve ser fornecido para atualização" });
    }

    // Verifica existência antes de atualizar
    const existing = await prisma.collaborator.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Colaborador não encontrado" });
    }

    const updateData = {};

    if (matricula !== undefined) updateData.matricula = matricula;
    if (nome !== undefined) updateData.nome = nome;
    if (email !== undefined) updateData.email = email;
    if (cpf_cnpj !== undefined) updateData.cpf_cnpj = cpf_cnpj;
    if (cargo !== undefined) updateData.cargo = cargo;
    if (data_nascimento !== undefined) {
      updateData.data_nascimento = data_nascimento ? new Date(data_nascimento) : null;
    }
    if (ativo !== undefined) updateData.ativo = ativo;

    const updateCollaborator = await prisma.collaborator.update({
      where: { id },
      data: updateData
    })

    res.status(200).json({
      message: 'Colaborador atualizado com sucesso',
      collaborator: updateCollaborator
    });
  } catch (error) {
    console.error("Erro ao atualizar colaborador:", error);
    res.status(500).json({ error: "Erro ao atualizar colaborador" });
  }
}

async function deleteCollaboratoryById(req, res) {
  try{
    const { id } = req.params;

    const collaborator = await prisma.collaborator.findUnique({
      where: { id }
    })

    if(!collaborator){
      return res.status(404).json({ message: "Colaborador não encontrado" })
    }

    const colaboradorDeletado = await prisma.collaborator.delete({
      where: { id }
    })

    return res.status(200).json({
      message: "Colaborador deletado com sucesso!",
      colaborador: colaboradorDeletado
    })

  } catch (error) {
    console.error("Erro ao deletar um colaborador!", error);
    return res.status(500).json({ error: "Erro ao deletar o colaborador!" })
  }
}

module.exports = {
  getAllCollaborators,
  createCollaborator,
  getCollaboratorById,
  updateCollaborator,
  deleteCollaboratoryById
};