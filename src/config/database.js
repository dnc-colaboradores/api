const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Conectado ao postgreSQL');
    return prisma;
  } catch (error) {
    console.log('Erro ao conectar ao banco de dados', error);
    process.exit(1);
  }
}

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log('✅ Desconectado do banco de dados');
  } catch (error) {
    console.error('❌ Erro ao desconectar do banco:', error);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB, disconnectDB };