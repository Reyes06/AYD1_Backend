var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');


/*READ*/
router.get('/:id_depto', function(req, res, next) {
    const {id_depto} = req.params;
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query(`SELECT id_producto, nombre, descripcion, imagen FROM producto WHERE depto_tienda_id_depto = ${id_depto}`, function (err, result, fields) {
        console.log("SELECT FROM producto")
        if (err) throw err;

        for(let i = 0; i < result.length; i++){
            result[i].imagen = result[i].imagen.toString();
        }

        res.send( {"productos": result});
        con.end();
    });
});

/*CREATE*/
router.post('/nuevo', function(req, res, next) {
    const {nombre, descripcion, imagen, id_depto} = req.body;
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query(`INSERT INTO producto (nombre, descripcion, imagen, depto_tienda_id_depto) VALUES ('${nombre}','${descripcion}', '${imagen}',${id_depto})`, function (err, result, fields) {
        console.log("INSERT INTO producto")
        if (err) throw err;

        con.query(`SELECT id_producto FROM producto ORDER BY id_producto DESC LIMIT 1`, function (err, result, fields) {
            console.log("SELECT FROM producto")
            if (err) throw err;
            const id_producto = result[0].id_producto;

            con.query(`INSERT INTO inventario (producto_id_producto, cantidad) VALUES (${id_producto}, 0)`, function (err, result, fields) {
                console.log("INSERT INTO inventario")
                if (err) throw err;
                res.send( {"estado": "ok"});
                con.end();
            });
        });
    });
});

/*DELETE*/
router.post('/borrar', function(req, res, next) {
    const {id_producto} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`DELETE FROM inventario WHERE producto_id_producto = ${id_producto}`, function (err, result, fields) {
        console.log("DELETE FROM inventario")
        if (err) throw err;

        con.query(`DELETE FROM producto WHERE id_producto = ${id_producto}`, function (err, result, fields) {
            console.log("DELETE FROM producto")
            if (err) throw err;
            res.send( {"estado": "ok"});
            con.end();
        });
    });
});

/*READ categorias de un producto*/
router.get('/categorias/:id_producto', function(req, res, next) {
    const {id_producto} = req.params;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`SELECT id_categoria, categoria.nombre FROM categoria INNER JOIN producto_categoria ON categoria_id_categoria = id_categoria INNER JOIN producto ON id_producto = producto_id_producto WHERE id_producto = ${id_producto}`, function (err, result, fields) {
        console.log("SELECT FROM categoria");
        if (err) throw err;
        res.send( result);
        con.end();
    });
});

/*ADD categorias a un producto*/
router.post('/categorias/add', function(req, res, next) {
    const {id_producto, id_categoria} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();
    
    con.query( `INSERT INTO producto_categoria (producto_id_producto, categoria_id_categoria) VALUES (${id_producto}, ${id_categoria})`, function (err, result, fields) {
        console.log("INSERT INTO producto")
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

/*GET inventario de producto*/
router.post('/inventario', function(req, res, next) {
    const {id_producto, nueva_cantidad} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`UPDATE inventario SET cantidad = ${nueva_cantidad} WHERE producto_id_producto = ${id_producto}`, function (err, result, fields) {
        console.log("UPDATE inventario");
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

/*GET inventarios de un producto*/
router.get('/inventario/:id_producto', function(req, res, next) {
    const {id_producto} = req.params;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`SELECT * FROM inventario WHERE producto_id_producto = ${id_producto}`, function (err, result, fields) {
        console.log("SELECT * FROM inventario");
        if (err) throw err;
        res.send( result);
        con.end();
    });
});

/*UPDATE inventario de productos*/
router.post('/inventario', function(req, res, next) {
    const {id_producto, nueva_cantidad} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`UPDATE inventario SET cantidad = ${nueva_cantidad} WHERE producto_id_producto = ${id_producto}`, function (err, result, fields) {
        console.log("UPDATE inventario");
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

router.get('/', function(req, res, next) {
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query( "select pr.nombre as nombre, pr.descripcion as descripcion, pr.imagen as imagen, dep.nombre as departamento from producto pr, depto_tienda dep where pr.depto_tienda_id_depto = dep.id_depto", function (err, result, fields) {
        if (err) throw err;

        for(let i = 0; i < result.length; i++){
            result[i].imagen = result[i].imagen.toString();
        }

        res.send( result);
        con.end();
    });
});

module.exports = router;

/*
select pr.id_producto as id_producto, pr.nombre as nombre, pr.descripcion as descripcion, c.nombre as categoria
from producto_categoria pc, categoria c, producto pr
where pc.categoria_id_categoria = c.id_categoria
and pc.producto_id_producto = pr.id_producto
*/