var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

/*READ*/
router.get('/:id_tienda', function(req, res, next) {
    const {id_tienda} = req.params;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`SELECT id_depto, nombre FROM depto_tienda WHERE tienda_id_tienda = ${id_tienda}`, function (err, result, fields) {
        console.log("SELECT FROM depto_tienda");
        if (err) throw err;
        res.send( { "departamentos": result });
        con.end();
    })
})

/*READ*/
router.get('/usuario/:id_usuario', function (req, res, next) {
    const { id_usuario } = req.params;
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query(`SELECT id_depto, nombre, tienda_id_tienda FROM depto_tienda WHERE tienda_id_tienda in (SELECT id_tienda FROM tienda WHERE usuario_id_usuario in (SELECT id_usuario FROM usuario WHERE id_usuario = ${id_usuario})) ORDER BY nombre ASC`, function (err, result, fields) {
        console.log("SELECT FROM depto_tienda")
        if (err) throw err;
        res.send({ "departamentos": result });
        con.end();
    });
});

/*CREATE*/
router.post('/nuevo', function(req, res, next) {
    const {nombre, id_tienda} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`INSERT INTO depto_tienda (nombre, tienda_id_tienda) VALUES ('${nombre}', ${id_tienda})`, function (err, result, fields) {
        console.log("INSERT INTO depto_tienda");
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

/*DELETE*/
router.post('/borrar', function(req, res, next) {
    const {id_depto} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`DELETE FROM depto_tienda WHERE id_depto = ${id_depto}`, function (err, result, fields) {
        console.log("DELETE FROM depto_tienda");
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

/*UPDATE departamento*/
router.post('/editar', function(req, res, next) {
    const {id_depto, nombre} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`UPDATE depto_tienda SET nombre = '${nombre}' WHERE id_depto = ${id_depto}`, function (err, result, fields) {
        console.log("UPDATE depto_tienda");
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

module.exports = router;