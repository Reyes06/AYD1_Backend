var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

/*READ: Obtener todos las productos asociados al carrito de un usuario*/
router.post('/realizarPedido', function(req, res, next) {
    const {id_usuario} = req.body;
    con = mysql.createConnection(objectConnection);

    con.connect();

    con.query(`SELECT id_producto, nombre, cantidad, cantidad_inventario FROM producto pr INNER JOIN carrito_compras cc ON cc.producto_id_producto = pr.id_producto WHERE usuario_id_usuario = ${id_usuario}`, (err, result, fields) => {
        console.log("SELECT FROM producto, carrito_compra")
        if (err) throw err;

        let inventarioValidado = true;
        let carritoCompras = result;
        for(let i = 0; i < carritoCompras.length; i++){
            if(carritoCompras[i].cantidad > carritoCompras[i].cantidad_inventario){
                inventarioValidado = false;
                break;
            }
        }

        if(inventarioValidado){
            con.query(`INSERT INTO compra (estado, usuario_id_usuario) VALUES ('PENDIENTE', ${id_usuario})`, (err, result, fields) => {
                console.log("INSERT INTO compra")
                if (err) throw err;
        
                con.query(`SELECT id_compra FROM compra ORDER BY id_compra DESC LIMIT 1`, (err, result, fields) => {
                    console.log("SELECT FROM compra")
                    if (err) throw err;
        
                    let id_compra = result[0].id_compra;
        
                    
                });
            });

        } else {
            res.send( {
                "estatus": "error",
                "producto": result[i].nombre,
                "cantidad_inventario": result[i].cantidad_inventario,
                "cantidad_solicitada": result[i].cantidad
            });
            con.end();
        }
    });
});

module.exports = router;