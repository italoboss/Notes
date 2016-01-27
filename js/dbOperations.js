var pg = require('pg');
var dbName = "notesDB";
var dbPass = "1234";
var conString = process.env.DATABASE_URL || "pg://postgres:"+dbPass+"@localhost:5432/"+dbName;

// FUNCOES DE OPERACOES COM O BANCO DE DADOS
module.exports = {
    /*
     * Funcao para validar um usuario cadastrado atraves dos campos 'login' e 'password'.
     */
    validateUser: function(req, res) {
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("SELECT * FROM users WHERE login = '" + req.query.login + "'");
        query.on("row", function (row, result) { 
            result.addRow(row);
        });
        query.on("end", function (result) {          
            client.end();
            if (result.rows.length <= 0) {
                req.session.user = null;
                res.write("Usuário nao existe!");
                res.end();
            }
            else {
                var aux = result.rows[0];
                if (aux.password == req.query.password) {
                    req.session.user = aux;
                    res.write('Sucesso');
                    res.end();
                }
                else {
                    req.session.user = null;
                    res.write("Senha incorreta!");
                    res.end();
                }
            }
        });
    },
    /*
     * Funcao para obter as notas cadastradas associadas ao usuario.
     */
    getNotes: function(req, res) {
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("SELECT * FROM notes WHERE user_id = " + req.session.user.user_id);
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            client.end();
            res.writeHead(200, {'Content-Type': 'text/plain'});
            //console.log(result.rows);
            res.write(JSON.stringify(result.rows, null, "    ") + "\n");
            res.end();  
        });
    },
    /*
     * Funcao para adicionar uma nova nota, associando-a ao usuario logado.
     */
    addNote: function(req, res) {
        var client = new pg.Client(conString);
        client.connect();
        var query = client.query("INSERT INTO notes (user_id, content) "+ 
                                "values (" + req.session.user.user_id + ", '" + req.query.noteContent + "')");
        query.on("end", function (result) {          
            client.end();
            res.write('Sucesso');
            res.end();
        });
    },    
    /*
     * Funcao para deletar uma nota associanda ao usuario logado.
     */
    delNote: function(req, res) {
        var client = new pg.Client(conString);
        client.connect();         
        var query = client.query( "DELETE FROM notes WHERE note_id = " + req.query.id);    
        query.on("end", function (result) {          
            client.end(); 
            res.write('Sucesso');
            res.end();  
        });
    }
};