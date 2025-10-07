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

## 🗄️ Trabalhando com o Banco de Dados
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



## 📄 Licença
Este projeto está sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.

## Desenvolvido por Grupo 2 - DNC

Para dúvidas, consulte a documentação do projeto ou entre em contato com a equipe de desenvolvimento.