const authService = require("../services/authService");

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const result = await authService.login({ username, password });

      return res.status(200).json({
        message: "Login realizado com sucesso",
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      console.log("Erro no login: ", error);

      if (error.message.includes("Nome de usuário ou senha incorretos") || 
          error.message.includes("Credenciais inválidas") ||
          error.message.includes("Senha inválida")) {
        return res.status(401).json({
          error: "Nome de usuário ou senha incorretos",
        });
      }

      if (error.message.includes("obrigatórios")) {
        return res.status(400).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: "Erro interno no servidor",
      });
    }
  }

  async logout(req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(400).json({
          error: "Usuário não logado",
        });
      }

      const token = authHeader.replace("Bearer ", "");
      const result = await authService.logout(token);

      return res.status(200).json(result);
    } catch (error) {
      console.log("Erro no logout: ", error);
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  async verifyToken(req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          error: "Usuário não logado",
        });
      }

      const token = authHeader.replace("Bearer ", "");
      const decoded = await authService.verifyToken(token);

      return res.status(200).json({
        message: "Token válido",
        user: decoded,
      });
    } catch (error) {
      return res.status(401).json({
        error: error.message,
      });
    }
  }
}

module.exports = new AuthController();
