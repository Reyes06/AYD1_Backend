var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');


/*READ*/
router.get('/:id_depto', async function(req, res, next) {
    const {id_depto} = req.params;
    con = await mysql.createConnection(objectConnection);

    await con.connect();
    const query = `SELECT id_producto, nombre, descripcion FROM producto WHERE depto_tienda_id_depto = ${id_depto}`;
    console.log(query);
    await con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( result);
        con.end();
    });
});

/*CREATE*/
router.post('/nuevo', async function(req, res, next) {
    const {nombre, descripcion, id_depto} = req.body;
    con = await mysql.createConnection(objectConnection);

    await con.connect();
    const query = `INSERT INTO producto (nombre, descripcion, depto_tienda_id_depto) VALUES ('${nombre}','${descripcion}',${id_depto})`;
    console.log(query);
    await con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( {"state": "ok"});
        con.end();
    });
});

/*DELETE*/
router.post('/borrar', async function(req, res, next) {
    const {id_depto} = req.body;
    con = await mysql.createConnection(objectConnection);

    await con.connect();
    const query = `DELETE FROM producto WHERE depto_tienda_id_depto = ${id_depto}`;
    console.log(query);
    await con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( {"state": "ok"});
        con.end();
    });
});

module.exports = router;