const express = require('express');
const { connectDB } = require('./src/config/database');
const collaboratorRoutes = require('./src/routes/collaboratorsRoutes.js'); 
const userRoutes = require('./src/routes/userRoutes.js');
const authRoutes = require('./src/routes/authRoutes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB().then(() => {
  console.log('✅ Banco de dados conectado com sucesso');
}).catch(error => {
  console.error('❌ Falha ao conectar ao banco:', error);
  process.exit(1);
});

app.get('/', (req, res) =>{
  res.status(200).json({message: 'API de Colaboradores está funcionando'})
})

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/collaborators', collaboratorRoutes);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`)
})
