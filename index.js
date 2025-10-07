const express = require('express');
const { connectDB } = require('./src/config/database');
const collaboratorRoutes = require('./src/routes/collaboratorsRoutes.js'); 
const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) =>{
  res.status(200).json({message: 'API de Colaboradores está funcionando'})
})

app.use('/collaborators', collaboratorRoutes);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`)
})
