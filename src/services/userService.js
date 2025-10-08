const bcrypt = require('bcrypt')
const { prisma } = require('../config/database');

class UserService {
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
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          created_at: true,
          updated_at: true
        }
      });

      return user;
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`)
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
    return await prisma.user.delete({
      where: { id }
    })
  }
}

module.exports = new UserService();