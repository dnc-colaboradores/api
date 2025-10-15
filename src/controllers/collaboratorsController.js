const { prisma } = require('../config/database');

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

async function checkUniqueFields(excludeId = null, matricula, email, cpf_cnpj) {
  const whereConditions = {
    OR: []
  };

  if (excludeId) {
    whereConditions.OR.push({ matricula });
  }
  if (email) {
    whereConditions.OR.push({ email });
  }
  if (cpf_cnpj) {
    whereConditions.OR.push({ cpf_cnpj });
  }

  if (whereConditions.OR.length === 0) {
    return null;
  }

  const existingCollaborator = await prisma.collaborator.findFirst({
    where: whereConditions
  })

  return existingCollaborator;

}

// Criar colaborador
async function createCollaborator(req, res) {
  try {
    const { matricula, nome, email, cpf_cnpj, cargo, data_nascimento, ativo } = req.body;

    if (!matricula || !nome || !email || !cpf_cnpj) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    const existingCollaborator = await checkUniqueFields(null, matricula, email, cpf_cnpj);

    if (existingCollaborator) {
      let errorMessage = 'Dados já existentes: ';
      const conflits = [];

      if (existingCollaborator.matricula === matricula) {
        conflits.push('matrícula');
      }
      if (existingCollaborator.email === email) {
        conflits.push('rmail');
      }
      if (existingCollaborator.cpf_cnpj === cpf_cnpj) {
        conflits.push('CPF/CNPJ');
      }

      errorMessage += conflits.join(', ');
      return res.status(409).json({
        error: errorMessage
      })
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

    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      let errorMessage = 'Dados já existentes';
      
      if (field === 'matricula') errorMessage = 'Matrícula já está em uso';
      else if (field === 'email') errorMessage = 'Email já está em uso';
      else if (field === 'cpf_cnpj') errorMessage = 'CPF/CNPJ já está em uso';
      
      return res.status(409).json({ error: errorMessage });
    }

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

    const conflictingCollaborator = await checkUniqueFields(id, matricula, email, cpf_cnpj);
    
    if (conflictingCollaborator) {
      let errorMessage = 'Dados já existentes em outro colaborador: ';
      const conflicts = [];
      
      if (matricula && conflictingCollaborator.matricula === matricula) {
        conflicts.push('matrícula');
      }
      if (email && conflictingCollaborator.email === email) {
        conflicts.push('email');
      }
      if (cpf_cnpj && conflictingCollaborator.cpf_cnpj === cpf_cnpj) {
        conflicts.push('CPF/CNPJ');
      }
      
      errorMessage += conflicts.join(', ');
      return res.status(409).json({ error: errorMessage });
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

    if (error.code === 'P2002') {
      const field = error.meta?.target?.[0];
      let errorMessage = 'Dados já existentes em outro colaborador';
      
      if (field === 'matricula') errorMessage = 'Matrícula já está em uso por outro colaborador';
      else if (field === 'email') errorMessage = 'Email já está em uso por outro colaborador';
      else if (field === 'cpf_cnpj') errorMessage = 'CPF/CNPJ já está em uso por outro colaborador';
      
      return res.status(409).json({ error: errorMessage });
    }
    
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