const userService = require("../services/userService");

class UserController {
  async register(req, res) {
    try {
      const { email, username, password, role } = req.body;

      if (!email || !username || !password) {
        return res.status(400).json({
          error: "Email, username e senha são obrigatórios",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          error: "A senha deve ter pelo menos 6 caracteres",
        });
      }

      if (role && !["USER", "ADMIN"].includes(role)) {
        return res.status(400).json({
          error: "Selecione USER ou ADMIN para usuário cadastrado",
        });
      }

      const user = await userService.createUser({
        email,
        username,
        password,
        role,
      });

      return res.status(201).json({
        message: "Usuário cadastrado com sucesso",
        user,
      });
    } catch (error) {
      console.log("Erro no registro: ", error);

      if (error.message.includes("já está em uso")) {
        return res.status(409).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, username, password, role } = req.body;

      if (!email && !username && !password && !role) {
        return res.status(400).json({
          error:
            "Pelo menos um campo deve ser fornecido para atualização: email, username, password, role",
        });
      }

      if (role && !["USER", "ADMIN"].includes(role)) {
        return res.status(400).json({
          error: "Role deve ser USER ou ADMIN",
        });
      }

      if (password && password.length < 6) {
        return res.status(400).json({
          error: "A senha deve ter pelo menos 6 caracteres",
        });
      }

      const updatedUser = await userService.updateUser(id, {
        email,
        username,
        password,
        role,
      });

      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        user: updatedUser,
      });
    } catch (error) {
      console.log("Erro na atualização: ", error);

      if (error.message.includes("já está em uso")) {
        return res.status(409).json({
          error: error.message,
        });
      }

      if (error.message.includes("não encontrado")) {
        return res.status(404).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  async listUsers(req, res) {
    try {
      const users = await userService.listUsers();
      return res.status(200).json({
        data: users,
      });
    } catch (error) {
      console.log("Erro ao listar usuários ", error);
      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  async showUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      return res.status(200).json({
        user,
      });
    } catch (error) {
      console.log("Erro ao buscar usuário: ", error);

      if (error.message.includes("não encontrado")) {
        return res.status(404).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);

      return res.status(200).json({
        message: "Usuário deletado com sucesso",
      });
    } catch (error) {
      console.log("Erro ao deletar usuário: ", error);

      if (error.message.includes("não encontrado")) {
        return res.status(404).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }
}

module.exports = new UserController();
