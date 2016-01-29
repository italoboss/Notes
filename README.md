# Notes

 ### Descrição
 -------------
   Uma aplicação para criação de notas associadas a um usuário.
 
 ### Tecnologias utilizadas
 -------------
   Server side: node.js
   Front-end: angular.js
   Database: PostgreSQL
   
 ### Para rodar a aplicação
 -------------
   - Importar o banco de dados, disponibilizado no arquivo "notesDB.backup"
   - Modificar no arquivo "js/dbOperations.js" os seguintes parâmetros:
       -> dbUser = NOME_DO_USUARIO_POSTGRES     // Padrao: postgres
       -> dbPass = SENHA_DO_USUARIO             // Padrao: 1234
       -> dbHost = HOST                         // Padrao: localhost
       -> dbPort = PORTA                        // Padrao: 5432
   - Executar aplicação pelo comando: node app.js
