var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

/*READ: Obtener todos las productos asociados al carrito de un usuario*/
router.get('/:id_usuario', function(req, res, next) {
    const {id_usuario} = req.params;
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query(`SELECT pr.id_producto AS id_producto, pr.nombre AS nombre_producto, pr.descripcion AS descripcion, pr.imagen AS imagen, pr.precio AS precio, cc.cantidad, f.nombre_tienda AS tienda, dept.nombre AS nombre_depto FROM carrito_compras cc INNER JOIN producto pr ON pr.id_producto = cc.producto_id_producto INNER JOIN depto_tienda dept ON dept.id_depto = pr.depto_tienda_id_depto INNER JOIN tienda ti ON ti.id_tienda = dept.tienda_id_tienda INNER JOIN formulario f ON f.id_formulario = ti.id_tienda WHERE cc.usuario_id_usuario = ${id_usuario}`, function (err, result, fields) {
        console.log("SELECT FROM carrito_compras, producto, departamento, tienda, formulario")
        if (err) throw err;

        res.send( {"productos": result});
        con.end();
    });
});

/*CREATE: Agregar productos asociados al carrito de un usuario*/
router.post('/agregar', function(req, res, next) {
    const {id_usuario, id_producto, cantidad} = req.body;
    con = mysql.createConnection(objectConnection);

    con.connect();

    con.query(`SELECT cantidad_inventario FROM producto WHERE id_producto = ${id_producto}`, (err, result, fields) => {
        console.log("SELECT FROM producto")
        if (err) throw err;

        if(result[0].cantidad_inventario >= cantidad){
            con.query(`INSERT INTO carrito_compras (usuario_id_usuario, producto_id_producto, cantidad) VALUES (${id_usuario}, ${id_producto}, ${cantidad}) `, function (err, result, fields) {
                console.log("INSERT INTO carrito_compras")
                if (err) throw err;
                res.send( {"estado": "ok"});
                con.end();
            });
        } else {
            res.send( {
                "estado": "error",
                "descripcion": "no hay suficientes productos en inventario"
            });
            con.end();
        }
    });
});


/*DELETE: Eliminar productos asociados al carrito de un usuario*/
router.post('/borrar', function(req, res, next) {
    const {id_usuario, id_producto} = req.body;
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query(`DELETE FROM carrito_compras WHERE usuario_id_usuario = ${id_usuario} AND producto_id_producto = ${id_producto}`, function (err, result, fields) {
        console.log("DEETE FROM carrito_compras")
        if (err) throw err;

        res.send( {"estado": "ok"});
        con.end();
    });
});

/*DELETE: Eliminar todos los productos asociados al carrito de un usuario*/
router.post('/borrar/all', function(req, res, next) {
    const {id_usuario} = req.body;
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query(`DELETE FROM carrito_compras WHERE usuario_id_usuario = ${id_usuario}`, function (err, result, fields) {
        console.log("DEETE FROM carrito_compras")
        if (err) throw err;

        res.send( {"estado": "ok"});
        con.end();
    });
});

/*UPDATE: Cambiar la cantidad de unidades un producto asociado al carrito de un usuario*/
router.post('/update', function(req, res, next) {
    const {id_usuario, id_producto, nueva_cantidad} = req.body;
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query(`UPDATE carrito_compras SET cantidad = ${nueva_cantidad} WHERE usuario_id_usuario = ${id_usuario} AND producto_id_producto = ${id_producto}`, function (err, result, fields) {
        console.log("UPDATE FROM carrito_compras")
        if (err) throw err;

        res.send( {"estado": "ok"});
        con.end();
    });
});


module.exports = router;