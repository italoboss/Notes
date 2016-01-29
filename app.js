var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    app = express();
var dbOperations = require("./js/dbOperations.js");
var logFmt = require("logfmt");

app.use(session({secret: '1234567890QWERTY'}));
app.set('views', __dirname + '/views');
app.get('/' , function(req, res) {
    if (req.session.user) {
        res.sendfile('views/index.html');
    }
    else {
        res.sendfile('views/login.html');
    }
});
app.post('/db/doLogin', function(req, res) {
    dbOperations.validateUser(req, res);
});
app.post('/db/doLogout', function(req, res) {
    req.session.user = null;
    res.end();
});
app.post('/db/readNotes', function(req, res){
    dbOperations.getNotes(req, res);
});
app.post('/db/addNote', function(req, res){
    dbOperations.addNote(req, res);
});
app.post('/db/delNote', function(req, res){
    dbOperations.delNote(req, res);
});
app.set('port', process.env.PORT || 3001);
app.use(express.static(__dirname + '/client'));
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});