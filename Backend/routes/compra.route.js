var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');
const sendMail = require('../utils/mail-manager');

/*POST: Realizar la compra de los productos en el carrito de un usuario*/
router.post('/realizarPedido', function(req, res, next) {
    const {id_usuario, direccion_envio} = req.body;
    con = mysql.createConnection(objectConnection);

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
            con.query(`INSERT INTO compra (estado, direccion_envio, usuario_id_usuario) VALUES ('PENDIENTE', '${direccion_envio}', ${id_usuario})`, (err, result, fields) => {
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

/*GET: Obtener todaos los pedidos de compra que estan pendientes de confirmar */
router.get('/pendientes', function(req, res, next) {
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`SELECT id_compra, direccion_envio FROM compra WHERE estado = 'PENDIENTE'`, (err, result, fields) => {
        console.log("UPDATE compra")
        if (err) throw err;

        let listaDeCompras = [];
        let id_compra, direccion_envio, compra;

        const direcciones = result;

        const cantidadCompras = result.length;
        for(let i = 0; i < result.length; i++){
            
        
            con.query(`SELECT pr.nombre AS nombre_producto, pr.precio AS precio, dc.unidades AS unidades FROM producto pr INNER JOIN detalle_compra dc ON dc.producto_id_producto = pr.id_producto INNER JOIN compra c ON c.id_compra = dc.compra_id_compra WHERE c.id_compra = ${result[i].id_compra}`, (err, result, fields) => {
                console.log("SELECT FROM producto, detalle_compra")
                if (err) throw err;

                id_compra = direcciones[i].id_compra;
                direccion_envio = direcciones[i].direccion_envio;
                console.log(id_compra)
            
                compra = {
                    id_compra,
                    direccion_envio,
                    "productos": result
                }

                listaDeCompras.push(compra);
                if(i === (cantidadCompras- 1)){
                    res.send(listaDeCompras);
                    con.end();
                }
            });
        }
    });
});

/*GET: Obtener todaos los pedidos de compra que estan pendientes de confirmar */
router.get('/pendiente', function(req, res, next) {
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`SELECT id_compra FROM compra WHERE estado = 'PENDIENTE'`, (err, result, fields) => {
        console.log("UPDATE compra")
        if (err) throw err;
        res.send({"compras": result});
        con.end();
    });
});

/*POST: Confirmar el envio de una compra*/
router.post('/confirmarPedido', function(req, res, next) {
    const {id_compra} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`UPDATE compra SET estado = 'CONFIRMADO' WHERE id_compra = ${id_compra}`, (err, result, fields) => {
        console.log("UPDATE compra")
        if (err) throw err;

        con.query(`SELECT correo_electronico, nombre, apellido, direccion_envio FROM usuario INNER JOIN compra ON compra.usuario_id_usuario = usuario.id_usuario WHERE id_compra = ${id_compra}`, (err, result, fields) => {
            console.log("SELECT FROM usuario")
            if (err) throw err;
            let {correo_electronico, nombre, apellido, direccion_envio} = result[0];

            con.query(`SELECT pr.nombre AS nombre_producto, pr.precio AS precio, dc.unidades AS unidades FROM producto pr INNER JOIN detalle_compra dc ON dc.producto_id_producto = pr.id_producto INNER JOIN compra c ON c.id_compra = dc.compra_id_compra WHERE c.id_compra = ${id_compra}`, (err, result, fields) => {
                console.log("SELECT FROM producto, detalle_compra")
                if (err) throw err;

                let mensaje = `Apreciado ${nombre.toUpperCase()} ${apellido.toUpperCase()}, muchas gracias por comprar en el sistema de compra en linea CCV, le informamos que se ha aprobado el envío de sus productos y estos ya se encuentran en camino. El pedido solicitado será entregado a la dirección: ${direccion_envio}. El detalle de su compra se presenta a continuación:\n\n`;
            
                let precio_total = 0;
                for(let i = 0; i < result.length; i++){
                    mensaje += "Producto: " + result[i].nombre_producto + "\n";
                    mensaje += "Cantidad: " + result[i].unidades + "\n";
                    mensaje += "Precio unitario: " + result[i].precio + "\n";
                    mensaje += "Precio total: " + (result[i].precio * result[i].unidades) + "\n\n";
                    precio_total += result[i].precio * result[i].unidades;
                }

                mensaje += "Precio total a pagar: " + precio_total + "\n\n";
                mensaje += "Cualquier duda o consulta quedamos a la orden.\nSaludos"

                console.log(typeof correo_electronico)
                sendMail('AYD1.Grupo7@gmail.com', correo_electronico, `Confirmación de envío de productos`, mensaje);

                res.send( {"estado": "ok"});
                con.end();

            });            
        });
    });
});

module.exports = router;