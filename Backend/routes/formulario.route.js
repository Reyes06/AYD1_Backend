var express = require('express');
var router = express.Router();
var con = require('../dbcontroller/dbconnection');
const sendMail = require('../utils/mail-manager');


router.get('/', function(req, res, next) {
    con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connection OK")
    });
    const query = "SELECT * FROM formulario WHERE estado = 'PENDIENTE'";
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( result);
    });
    con.end(function(err) {
        if (err) throw err;
        console.log("DB Connection FINISH")
    });
})

router.post('/nuevo', function(req, res, next) {
    const {nombre, logo, direccion, id_usuario, id_sector, id_municipio } = req.body;

    let query;
    con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connection OK")
      });
    if(logo != null){
        query = `INSERT INTO formulario (nombre, logo, direccion, usuario_id_usuario, municipio_id_municipio, sector_id_sector, estado)
                       VALUES ('${nombre}', ${logo}, '${direccion}', ${id_usuario}, ${id_municipio}, ${id_sector}, 'PENDIENTE')`;
    } else {
        query = `INSERT INTO formulario (nombre, direccion, usuario_id_usuario, municipio_id_municipio, sector_id_sector, estado)
                       VALUES ('${nombre}', '${direccion}', ${id_usuario}, ${id_municipio}, ${id_sector}, 'PENDIENTE')`;
    }
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        query = "SELECT id_formulario FROM formulario ORDER BY id_formulario DESC LIMIT 1";
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            res.send( result);
        })
    })
    con.end(function(err) {
        if (err) throw err;
        console.log("DB Connection FINISH")
    });
})

router.post('/denegar/:id_formulario', function(req, res, next) {
    const {id_formulario} = req.params;
    con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connection OK")
    });
    const query = `UPDATE formulario SET estado = 'DENEGADO' WHERE id_formulario = ${id_formulario}`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( {"state": "ok"});
    })
    con.end(function(err) {
        if (err) throw err;
        console.log("DB Connection FINISH")
    });
})

router.post('/aprobar/:id_formulario', function(req, res, next) {
    const {id_formulario} = req.params;
    con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connection OK")
    });
    const query = `UPDATE formulario SET estado = 'APROBADO' WHERE id_formulario = ${id_formulario}`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        const query = `INSERT INTO tienda (formulario_id_formulario, fecha_aprovacion) VALUES (${id_formulario}, CURDATE())`;
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;

            const query = `SELECT correo_electronico, password FROM usuario INNER JOIN formulario ON formulario.usuario_id_usuario = usuario.id_usuario WHERE id_formulario = ${id_formulario}`;
            console.log(query);
            con.query(query, function (err, result, fields) {
                if (err) throw err;

                const {correo_electronico, password} = result[0];
                sendMail('AYD1.Grupo7@gmail.com', correo_electronico, `Aprobacion de tienda virtual`, `¡Felicidades! Se ha aprobado tu solicitud y ahora posees un espacio para vender tus productos en el sistema de tienda virtual CCV. Podrás ingresar al sistema utilizando las sisguientes credenciales:\n\nUsuario: ${correo_electronico}\nPassword: ${password}`);
                res.send( {"state": "ok"});
            })
            
        })
    });
    con.end(function(err) {
        if (err) throw err;
        console.log("DB Connection FINISH")
    });
})


module.exports = router;