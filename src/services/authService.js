const userService = require('./userService');
const JWTUtils = require('../utils/jwt');
const RevokedTokenService = require('./revokedTokenService');
const revokedTokenService = require('./revokedTokenService');

class AuthService {
  async login(credentials) {
    try {
      const { username, password } = credentials

      if (!username || !password ) throw new Error('Nome de usuário e senha são obrigatórios');

      const user = await userService.findByUsername(username);

      if (!user) throw new Error('Nome de usuário ou senha incorretos')

      const isPasswordValid = await userService.validatePassword(password, user.password_hash);
      if (!isPasswordValid) throw new Error('Senha inválida');

      const tokenPayload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }

      const token = JWTUtils.generateToken(tokenPayload);

      const { password_hash, ...userWithoutPassword } = user;

      return { user: userWithoutPassword, token };

    } catch (error) {
      throw new Error(`Erro no login: ${error.message}`);
    }
  }

  async verifyToken(token) {
    try {
      if (RevokedTokenService.isBlacklisted(token)) {
        throw new Error('Token invalidado - usuário fez logout');
      }

      const decoded = JWTUtils.verifyToken(token)
      return decoded;
    } catch (error) {
      throw new Error(`Token Inválido: ${error.message}`)
    }
  }

  async logout(token) {
    try {
      const decoded = JWTUtils.verifyToken(token);

      revokedTokenService.addToBlacklist(token);
      return { message: 'Logout realizado com sucesso'}
    } catch (error) {
      throw new Error(`Erro no logout: ${error.message}`)
    }
  }
}

module.exports = new AuthService();