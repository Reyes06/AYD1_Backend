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
router.post('/nuevo', function(req, res, next) {
    const {nombre, descripcion, id_depto} = req.body;
    con = mysql.createConnection(objectConnection);

    con.connect();
    const query = `INSERT INTO producto (nombre, descripcion, depto_tienda_id_depto) VALUES ('${nombre}','${descripcion}',${id_depto})`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        const query = `SELECT id_producto FROM producto ORDER BY id_producto DESC LIMIT 1`;
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            const id_producto = result[0].id_producto;
            const query = `INSERT INTO inventario (producto_id_producto, cantidad) VALUES (${id_producto}, 0)`;
            console.log(query);
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                res.send( {"state": "ok"});
                con.end();
            });
        });
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

/*READ categorias de un producto*/
router.get('/categorias/:id_producto', async function(req, res, next) {
    const {id_producto} = req.params;
    con = await mysql.createConnection(objectConnection);

    await con.connect();
    const query = `SELECT id_categoria, categoria.nombre FROM categoria INNER JOIN producto_categoria ON categoria_id_categoria = id_categoria INNER JOIN producto ON id_producto = producto_id_producto WHERE id_producto = ${id_producto}`;
    console.log(query);
    await con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( result);
        con.end();
    });
});

/*ADD categorias a un producto*/
router.post('/categorias/add', async function(req, res, next) {
    const {id_producto, id_categoria} = req.body;
    con = await mysql.createConnection(objectConnection);

    await con.connect();
    const query = `INSERT INTO producto_categoria (producto_id_producto, categoria_id_categoria) VALUES (${id_producto}, ${id_categoria})`;
    console.log(query);
    await con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( {"state": "ok"});
        con.end();
    });
});

/*UPDATE inventario de productos*/
router.post('/inventario', async function(req, res, next) {
    const {id_producto, cantidad} = req.body;
    con = await mysql.createConnection(objectConnection);

    await con.connect();
    const query = `UPDATE inventario SET cantidad = ${cantidad} WHERE producto_id_producto = ${id_producto}`;
    console.log(query);
    await con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( {"state": "ok"});
        con.end();
    });
});

module.exports = router;