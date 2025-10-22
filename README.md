<h1 align="center">API - COLABORADORES DNC</h1>

API REST para gerenciamento de colaboradores, desenvolvida em Node.js com Express.js e PostgreSQL com sistema de autenticação JWT e autorização baseada em roles.

Para acessar a documentação completa clique aqui: [DOCUMENTAÇÃO](https://www.notion.so/29452923c76e80e8b249d8062f5cc6a2?source=copy_link)
## 📋 Pré-requisitos
- Node.js

- PostgreSQL

- npm ou yarn

## 🚀 Começando
<h3>1. Clonar o repositório </h3>

    git clone <(url-do-repositorio)>

    cd dnc-colaboradores

<h3>2. Instalar dependências</h3>

    npm install

<h3>3. Configurar variáveis de ambiente</h3>

Crie um arquivo .env na raiz do projeto baseado no .env.example:

    DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/dnc_colaboradores?schema=public"
    DIRECT_URL="postgresql://seu_usuario:sua_senha@localhost:5432/dnc_colaboradores"
    PORT=8080
    JWT_SECRET=seu_jwt_secret_aqui
    JWT_EXPIRES_IN=7d
Substitua seu_usuario e sua_senha pelas suas credenciais do PostgreSQL.

<h3>4. Configurar o banco de dados</h3>

Opção 1: Via linha de comando PostgreSQL:

    sudo -u postgres psql -c "CREATE DATABASE dnc_colaboradores;"

Opção 2: Com usuário específico:

    createdb -U seu_usuario -h localhost -p 5432 dnc_colaboradores

<h3>5. Executar as migrações do Prisma</h3>

Gerar o cliente do Prisma

    npx prisma generate

Criar e executar migrações (quando tiver modelos definidos)

    npx prisma migrate dev

<h3>6. Executar o projeto</h3>

Modo desenvolvimento:

    npm run dev

Modo produção:

    npm start

Resposta depois de iniciar o projeto:

A API estará rodando em http://localhost:8080.

A API está disponível em produção em https://api-ten-beryl.vercel.app/:

## 🗄️ Estrutura do Banco de Dados
<h3><b>Estrutura do Banco</b></h3>
O projeto utiliza o Prisma ORM para gerenciar o banco de dados. O schema está definido em prisma/schema.prisma.

<h3><b>Comandos do Prisma</b></h3>
<i><b>npx prisma migrate dev:</i></b> Cria uma nova migração a partir das alterações no schema e aplica ao banco<br>
<i><b>npx prisma generate</i></b> Gera o cliente Prisma baseado no schema<br>

<h3><b>Fluxo de trabalho com migrações</b></h3>
1. Crie cliente prisma:<br><br>
<i><b>npx prisma generate</i></b><br>

<h3><b>Fluxo de trabalho com migrações</b></h3>
2. Crie e aplique uma migração:<br><br>
<i><b>npx prisma migrate dev --name descricao_da_mudanca</i></b><br>

<h3><b>Visualizando dados</b></h3>
Opção 1:

<i><b>npx prisma studio</i></b><br>
Isso abrirá o Prisma Studio em http://localhost:5555.

Opção 2:<br>
usar o DBeaver Community, uma ferramenta de gerenciamento de banco de dados gratuita e de código aberto para projetos pessoais.

Opção 3:<br>
Usar extensão do VSCODE Database Client. Esse extensão permitirá usar o banco de dados na IDE

<h3><b>Modelos</b></h3>
<h3>User</h3>

- id (UUID) - Identificador único

- email (String) - Email único do usuário

- username (String) - Nome de usuário único

- password_hash (String) - Hash da senha

- role (UserRole) - Role do usuário (USER ou ADMIN)

- created_at (DateTime) - Data de criação

- updated_at (DateTime) - Data de atualização

<h3>Collaborator</h3>

- id (UUID) - Identificador único

- matricula (String) - Matrícula única

- nome (String) - Nome completo

- email (String) - Email único

- cpf_cnpj (String) - CPF/CNPJ único

- cargo (String) - Cargo opcional

- data_nascimento (DateTime) - Data de nascimento opcional

- ativo (Boolean) - Status (padrão: true)

- created_at (DateTime) - Data de criação

- updated_at (DateTime) - Data de atualização

<h3>Enum UserRole</h3>

- USER - Usuário comum

- ADMIN - Administrador

## 🔐 Autenticação e Autorização
<h3>Fluxo de Autenticação</h3>

1. Login: POST /auth/login com username e password

2. Token JWT: Retornado no login, válido por 7 dias

3. Autorização: Incluir token no header Authorization: Bearer <token>

<h3>Middlewares</h3>

- authenticate: Verifica validade do token JWT

- authorizeOwnResourceOrAdmin: Permite acesso a recurso próprio ou para ADMIN

## 📡 Endpoints da API

<h3><b>Autenticação (/auth)</b></h3>

<b>POST /auth/login</b>

Realiza login na aplicação.

json

    {

      "username": "usuario",

      "password": "senha"

    }

<b>POST /auth/logout</b>

Realiza logout (requer autenticação).

<b>GET /auth/verify</b>

Verifica validade do token.

<h3><b>Usuários (/users)</b></h3>

<b>POST /users/register</b>

Cria novo usuário.

json

    {
      "email": "user@example.com",
      "username": "usuario",
      "password": "senha123",
      "role": "USER"
    }

<b>GET /users</b>

Lista todos os usuários (requer ADMIN).

<b>GET /users/:id</b>

Busca usuário por ID.

<b>PUT /users/:id</b>

Atualiza usuário.

<b>DELETE /users/:id</b>

Remove usuário.

<h3><b>Colaboradores (/collaborators)</b></h3>

<b>GET /collaborators</b>

Lista todos os colaboradores.

<b>GET /collaborators/:id</b>

Busca colaborador por ID.

<b>POST /collaborators</b>

Cria novo colaborador.

json

    {
      "matricula": "12345",
      "nome": "João Silva",
      "email": "joao@empresa.com",
      "cpf_cnpj": "123.456.789-00",
      "cargo": "Desenvolvedor",
      "data_nascimento": "1990-01-01",
      "ativo": true
    }

<b>PUT /collaborators/:id</b>

Atualiza colaborador.

<b>DELETE /collaborators/:id</b>

Remove colaborador.

## 🛠️ Scripts Disponíveis

- npm run dev - Executa em modo desenvolvimento com nodemon

- npm start - Executa em modo produção

- npm run build - Gera cliente Prisma

- npm run vercel-build - Build para deploy no Vercel

## 🔒 Segurança

- Senhas hasheadas com bcrypt

- Tokens JWT com expiração configurável

- Validação de dados de entrada

- Middleware de autenticação e autorização

- Blacklist de tokens revogados

## 📄 Licença
Este projeto está sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.

## Desenvolvido por Grupo 2 - DNC

Para dúvidas, consulte a documentação do projeto ou entre em contato com a equipe de desenvolvimento.