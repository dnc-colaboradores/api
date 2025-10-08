const userService = require('../services/userService');

class UserController {
  async register(req, res) {
    try {
      const { email, username, password, role } = req.body;

      if (!email || !username || !password ) {
        return res.status(400).json({
          error: 'Email, username e senha são obrigatórios'
        })
      }

      if (password.length < 6 ) {
        return res.status(400).json({
          error: 'A senha deve ter pelo menos 6 caracteres'
        });
      }

      if (role && !['USER', 'ADMIN'].includes(role)) {
        return res.status(400).json({
          error: 'Selecione USER ou ADMIN para usuário cadastrado'
        })
      }

      const user = await userService.createUser({
        email,
        username,
        password,
        role
      })

      return res.status(201).json({
        message: 'Usuário cadastrado com sucesso',
        user
      })

    } catch (error) {
      console.log('Erro no registro: ', error)

      if (error.message.includes('já está em uso')) {
        return res.status(409).json({
          error: error.message
        })
      }

      return res.status(500).json({
        error: 'Erro interno do servidor'
      })
    }
  }
}

module.exports = new UserController;