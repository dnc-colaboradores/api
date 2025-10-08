const bcrypt = require('bcrypt')
const userSelectFields = require('../utils/userSelectFields');
const { prisma } = require('../config/database');

class UserService {
  async checkUserExists(id) {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    return user;
  }

  async createUser(userData) {
    try {
      const {email, username, password, role = 'USER' } = userData;

      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { username },
          ]
        }
      })

      if (existingUser) throw new Error('Email ou nome de usuário já está em uso');

      const password_hash = await bcrypt.hash(password, 10)

      const user = await prisma.user.create({
        data: {
          email,
          username,
          password_hash,
          role
        },
        select: { ...userSelectFields }
      });

      return user;
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`)
    }
  }

  async updateUser(id, updateData) {
    try {
      const { email, username, password, role } = updateData;

      await this.checkUserExists(id);

      if (email || username) {
        const userWithSameEmailOrUsername = await prisma.user.findFirst({
          where: {
            AND: [
              {id: { not: id } },
              {
                OR: [
                  ...(email ? [{ email }] : []),
                  ...(username ? [{ username }] : [])
                ]
              }
            ]
          }
        })

        if (userWithSameEmailOrUsername) throw new Error('Email ou username já está em uso')
      }

      const dataToUpdate = {};

      if (email) dataToUpdate.email = email;
      if (username) dataToUpdate.username = username;
      if (role) dataToUpdate.role = role;

      if (password) {
        dataToUpdate.password_hash = await bcrypt.hash(password, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: dataToUpdate,
        select: { ...userSelectFields }
      });

      return updatedUser;

    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`)
    }
  }

  async listUsers() {
    try {
      return await prisma.user.findMany({
        select: { ...userSelectFields }
      })
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`)
    }
  }

  async getUserById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: { ...userSelectFields }
      })

      if (!user) throw new Error('Usuário não encontrado');

      return user;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async findByUsername(username) {
    return await prisma.user.findUnique({
      where: { username }
    })
  }

  async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
  }

  async deleteUser(id) {
    try {
      await this.checkUserExists(id);

      return await prisma.user.delete({
        where: { id }
      })
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`)
    }
    
  }
}

module.exports = new UserService();