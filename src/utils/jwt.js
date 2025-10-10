const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "5cf006fc92395df3c2bc51ad08bf3b2c01e1f12347d29bbc22be8a292dd2f40c";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

console.log("JWT_SECRET", JWT_SECRET);
console.log("JWT_EXPIRES_IN", JWT_EXPIRES_IN);

class JWTUtils {
  static generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }

  static extractTokenFromHeader(authHeader) {
    if (!authHeader) {
      throw new Error("Usuário não logado");
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new Error("Formato do token inválido");
    }

    return token;
  }
}

module.exports = JWTUtils;
