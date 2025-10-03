const express = require('express');
const { connectDB } = require('./src/config/database');
const app = express();
const port = 8080;

app.use(express.json());

connectDB().then(() => {
  console.log('Banco de dados conectado com sucesso');
}).catch(error => {
  console.log('Falha ao conectar no banco de dados', error);
  process.exit(1);
})


app.get("/", (req, res) => {
  return res.status(200).json({
    message: 'API de Colaboradores está funcionando'
  })
})

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`)
})
