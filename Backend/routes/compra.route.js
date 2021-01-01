var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');
const sendMail = require('../utils/mail-manager');

/*POST: Realizar la compra de los productos en el carrito de un usuario*/
router.post('/realizarPedido', function(req, res, next) {
    const {id_usuario} = req.body;
    con = mysql.createConnection(objectConnection);

    if(true){res.send({"estatus": "en desarrollo"}); return;}

    con.connect();

    con.query(`SELECT id_producto, nombre, cantidad, cantidad_inventario FROM producto pr INNER JOIN carrito_compras cc ON cc.producto_id_producto = pr.id_producto WHERE usuario_id_usuario = ${id_usuario}`, (err, result, fields) => {
        console.log("SELECT FROM producto, carrito_compra")
        if (err) throw err;

        if(result.length <= 0){
            res.send({
                "estado": "error",
                "tipo_error": "carrito_vacio"
            });
            con.end();
            return;
        }

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

                    //Reducir la cantidad en inventario
                    for(let i = 0; i < carritoCompras.length; i++){
                        con.query(`UPDATE producto SET cantidad_inventario = cantidad_inventario - ${carritoCompras[i].cantidad} WHERE id_producto = ${carritoCompras[i].id_producto}`, (err, result, fields) => {
                            console.log("UPDATE producto");
                            if (err) throw err;
                        });
                    }

                    //Agregar el producto a la compra realizada
                    for(let i = 0; i < carritoCompras.length; i++){
                        con.query(`INSERT INTO detalle_compra (compra_id_compra, producto_id_producto, unidades) VALUES (${id_compra}, ${carritoCompras[i].id_producto}, ${carritoCompras[i].cantidad})`, (err, result, fields) => {
                            console.log("INSERT INTO detalle_compra");
                            if (err) throw err;
                        });
                    }

                    //Vaciar el carrito de compras
                    con.query(`DELETE FROM carrito_compras WHERE usuario_id_usuario = ${id_usuario}`, (err, result, fields) => {
                        console.log("DELETE FROM carrito_compras");
                        if (err) throw err;
                    });

                    res.send({"estado": "ok"});
                    
                    setTimeout(() => { con.end() }, 1000);                    
                });
            });

        } else {
            res.send( {
                "estado": "error",
                "tipo_error": "no_suficiente_inventario",
                "producto": result[i].nombre,
                "cantidad_inventario": result[i].cantidad_inventario,
                "cantidad_solicitada": result[i].cantidad
            });
            con.end();
        }
    });
});

/*POST: Confirmar el envio de una compra*/
router.post('/confirmarPedido', function(req, res, next) {
    const {id_compra} = req.body;
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query(`UPDATE compra SET estado = 'CONFIRMADO'`, (err, result, fields) => {
        console.log("UPDATE compra")
        if (err) throw err;

        con.query(`SELECT correo_electronico, nombre, apellido, direccion_envio FROM usuario INNER JOIN compra ON compra.usuario_id_usuario = usuario.id_usuario WHERE id_compra = ${id_compra}`, (err, result, fields) => {
            console.log("SELECT FROM usuario")
            if (err) throw err;
            const {correo_electronico, nombre, apellido, direccion_envio} = result[0];

            con.query(`SELECT pr.nombre AS nombre_producto, pr.precio AS precio, dc.unidades AS unidades, c.direccion_envio FROM producto pr INNER JOIN detalle_compra dc ON dc.producto_id_producto = pr.id_producto  WHERE dc.compra_id_compra = ${id_compra}`, (err, result, fields) => {
                console.log("SELECT FROM producto, detalle_compra")
                if (err) throw err;

                let mensaje = `Muchas gracias ${nombre.toUpperCase()} ${apellido.toUpperCase()} por comprar en el sistema de compra en linea CCV, tus productos serán enviados a la dirección ${direccion_envio}. El resumen de tu compra se detalla a continuación:\n`;
            
                //HASTA AQUI TODO BIEN

                sendMail('AYD1.Grupo7@gmail.com', correo_electronico, `Confirmación de envío de productos`, `  Se ha aprobado tu solicitud y ahora posees un espacio para vender tus productos en el sistema de tienda virtual CCV. Podrás ingresar al sistema utilizando las sisguientes credenciales:\n\nUsuario: ${correo_electronico}\nPassword: ${password}`);
                                

                res.send( {"estado": "ok"});
                con.end();

            });            
        });
    });
});

module.exports = router;