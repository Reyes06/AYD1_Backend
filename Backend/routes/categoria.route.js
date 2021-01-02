var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

router.get('/', function(req, res, next) {
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query("SELECT * FROM categoria", function (err, result, fields) {
        console.log("SELECT FROM categoria");
        if (err) throw err;
        console.log(result);
        res.send( result);
        con.end();
    })
})

/*CREATE*/
router.post('/nuevo', function(req, res, next) {
    const {nombre} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`INSERT INTO categoria (nombre) VALUES ('${nombre}')`, function (err, result, fields) {
        console.log("INSERT INTO categoria");
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

/*DELETE*/
router.post('/borrar', function(req, res, next) {
    const {id_categoria} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`DELETE FROM categoria WHERE id_categoria = ${id_categoria}`, function (err, result, fields) {
        console.log("DELETE FROM categoria");
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

/*UPDATE categoria*/
router.post('/editar', function(req, res, next) {
    const {id_categoria, nombre_categoria} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`UPDATE categoria SET nombre = '${nombre_categoria}' WHERE id_categoria = ${id_categoria}`, function (err, result, fields) {
        console.log("UPDATE inventario");
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

module.exports = router;
