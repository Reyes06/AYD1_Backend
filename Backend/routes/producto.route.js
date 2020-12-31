var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');


/*READ*/
router.get('/:id_depto', function(req, res, next) {
    const {id_depto} = req.params;
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query(`SELECT id_producto, nombre, descripcion, precio, cantidad_inventario, imagen FROM producto WHERE depto_tienda_id_depto = ${id_depto}`, function (err, result, fields) {
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
    const {nombre, descripcion, precio, imagen, cantidad_inventario, id_depto} = req.body;
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query(`INSERT INTO producto (nombre, descripcion, precio, imagen, depto_tienda_id_depto, cantidad_inventario) VALUES ('${nombre}','${descripcion}', '${precio}', '${imagen}',${id_depto}, ${cantidad_inventario})`, function (err, result, fields) {
        console.log("INSERT INTO producto")
        if (err) throw err;

        res.send( {"estado": "ok"});
        con.end();
    });
});

/*DELETE*/
router.post('/borrar', function(req, res, next) {
    const {id_producto} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`DELETE FROM producto WHERE id_producto = ${id_producto}`, function (err, result, fields) {
        console.log("DELETE FROM producto")
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
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

/*UPDATE inventario de producto*/
router.post('/inventario/update', function(req, res, next) {
    const {id_producto, nueva_cantidad} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`UPDATE producto SET cantidad_inventario = ${nueva_cantidad} WHERE id_producto = ${id_producto}`, function (err, result, fields) {
        console.log("UPDATE producto");
        if (err) throw err;
        res.send( {"estado": "ok"});
        con.end();
    });
});

router.get('/', function(req, res, next) {
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query( "select pr.id_producto as id_producto, pr.nombre as nombre, pr.descripcion as descripcion, pr.imagen as imagen, pr.precio as precio, pr.cantidad_inventario as inventario, dep.nombre as departamento, fo.nombre_tienda as tienda from producto pr, depto_tienda dep, tienda ti, formulario fo where pr.depto_tienda_id_depto = dep.id_depto and dep.tienda_id_tienda = ti.id_tienda and ti.id_tienda = fo.id_formulario", function (err, result, fields) {
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
select pr.nombre as nombre, pr.descripcion as descripcion, pr.imagen as imagen, pr.precio as precio, pr.cantidad_inventario as inventario, dep.nombre as departamento, fo.nombre_tienda 
from producto pr, depto_tienda dep, tienda ti, formulario fo
where pr.depto_tienda_id_depto = dep.id_depto
and dep.tienda_id_tienda = ti.id_tienda
and ti.id_tienda = fo.id_formulario 

select pr.id_producto as id_producto, pr.nombre as nombre, pr.descripcion as descripcion, c.nombre as categoria
from producto_categoria pc, categoria c, producto pr
where pc.categoria_id_categoria = c.id_categoria
and pc.producto_id_producto = pr.id_producto
*/