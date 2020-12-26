var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

/*READ*/
router.get('/:id_tienda', async function(req, res, next) {
    const {id_tienda} = req.params;
    con = await mysql.createConnection(objectConnection);
    con.connect();

    const query = `SELECT id_depto, nombre FROM depto_tienda WHERE tienda_id_tienda = ${id_tienda}`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( { "departamentos": result });
        con.end();
    })
})

/*CREATE*/
router.post('/nuevo', async function(req, res, next) {
    const {nombre, id_tienda} = req.body;
    con = await mysql.createConnection(objectConnection);
    con.connect();

    const query = `INSERT INTO depto_tienda (nombre, tienda_id_tienda) VALUES ('${nombre}', ${id_tienda})`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

/*DELETE*/
router.post('/borrar', async function(req, res, next) {
    const {id_depto} = req.body;
    con = await mysql.createConnection(objectConnection);
    con.connect();

    const query = `DELETE FROM depto_tienda WHERE id_depto = ${id_depto}`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

module.exports = router;