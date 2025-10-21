const validateUserRegistration = (req, res, next) => {
  const { email, username, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !username || !password) {
    return res.status(400).json({
      error: 'Os campos email, username, password são obrigatórios'
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Formato de email inválido'
    });
  }

  if (username.length < 3) {
    return res.status(400).json({
      error: 'Username deve ter pelo menos 3 caracteres'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'Senha deve ter pelo menos 6 caracteres'
    });
  }

  next();
};

module.exports = {
  validateUserRegistration
};