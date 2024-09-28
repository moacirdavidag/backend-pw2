A fazer o README...
projeto da disciplina de PW 2 - ADS IFPB CZ 

.env:

```
   DATABASE_URL="mysql://USER_DO_BANCO_DE_DADOS_MYSQL:SENHA@localhost:3306/app_delivery?schema=public"
API_SECRET=s3cr3tkeyAPI@2024
FRONTEND_URL=http://localhost:5173

```
Depois de instalar as dependências do projeto com npm install, rodar as migrations para criar o banco de dados com npx prisma migrate dev.

o banco de dados utilizado foi o MySQL

Para ter um usuário administrador, depois de cadastrar um usuário, pode ir no banco de dados e atualizar a coluna `role` com o valor 'admin' neste usuário.