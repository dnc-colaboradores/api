class RevokedTokenService {
  constructor() {
    this.blacklistedTokens = new Set();
  }

  addToBlacklist(token) {
    this.blacklistedTokens.add(token);
  }

  isBlacklisted(token) {
    return this.blacklistedTokens.has(token);
  }

  cleanupExpiredTokens() {
    console.log(`Tokens na blacklist: ${this.blacklistedTokens.size}`);
  }
}

module.exports = new RevokedTokenService();