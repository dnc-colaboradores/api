<h1 align="center">API - COLABORADORES DNC</h1>
API REST para gerenciamento de colaboradores, desenvolvida em Node.js com Express.js e PostgreSQL.

## 📋 Pré-requisitos
Node.js (versão 18 ou superior)

PostgreSQL (versão 14 ou superior)

npm ou yarn

## 🚀 Começando
1. Clonar o repositório bash:
<br>git clone <(url-do-repositorio)>
<br>cd dnc-colaboradores

2. Instalar dependências
bash <br>
npm install
3. Configurar variáveis de ambiente<br>
Crie um arquivo .env na raiz do projeto baseado no .env.example:
env <br>
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/dnc_colaboradores?schema=public"<br>
Substitua seu_usuario e sua_senha pelas suas credenciais do PostgreSQL.

4. Criar o banco de dados:<br>
Conectar ao PostgreSQL (como usuário postgres) e criar o banco<br>
sudo -u postgres psql -c "CREATE DATABASE dnc_colaboradores;"<br><br>
Ou se você tem um usuário específico, pode usar:
createdb -U seu_usuario -h localhost -p 5432 dnc_colaboradores

5. Executar as migrações do Prisma<br>
Gerar o cliente do Prisma<br>
npx prisma generate
Criar e executar migrações (quando tiver modelos definidos)<br>
npx prisma migrate dev<br>
6. Executar o projeto<br>
Modo desenvolvimento<br>
npm run dev

Modo produção<br>
npm start<br>

Resposta depois de iniciar o projeto:<br>
A API estará rodando em http://localhost:8080.

## 📄 Licença
Este projeto está sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.

## Desenvolvido por Grupo 2 - DNC

Para dúvidas, consulte a documentação do projeto ou entre em contato com a equipe de desenvolvimento.