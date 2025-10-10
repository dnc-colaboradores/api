const JWTUtils = require('../utils/jwt');

const authenticate = (req, res, next) => {
  try {
    const token = JWTUtils.extractTokenFromHeader(req.headers.authorization);
    const decoded = JWTUtils.verifyToken(token)

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: error.message
    })
  }
}

const authorizeByRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Usuário não autenticado'
      });
    }
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          error: 'Acesso negado. Usuário não tem permissão'
        })
      }

      next();
  }
}

const authorizeOwnResourceOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'Usuário não autenticado'
    });
  }

  const resourceId = req.params.id;

  if (req.user.role === 'ADMIN') {
    return next();
  }

  if (req.user.id !== resourceId) {
    return res.status(403).json({
      error: 'Acesso negado. Usuário não tem autorização'
    })
  }
  next();
}

module.exports = {
  authenticate,
  authorizeByRole,
  authorizeOwnResourceOrAdmin
}