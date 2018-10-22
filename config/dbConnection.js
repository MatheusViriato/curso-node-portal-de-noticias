var mysql = require('mysql');

var conMySQL = function(){
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'portal_noticias'
    });
}

module.exports = function(){
    return conMySQL;
}