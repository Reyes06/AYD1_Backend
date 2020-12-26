var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
const sendMail = require('../utils/mail-manager');
var mysql = require('mysql');


router.get('/', function(req, res, next) {
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query("SELECT * FROM formulario WHERE estado = 'PENDIENTE'", function (err, result, fields) {
        console.log("SELECT FROM formulario");
        if (err) throw err;
        res.send( result);
        con.end();
    });
    
})

router.post('/nuevo', function(req, res, next) {
    const {nombre_tienda, logo, direccion, usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password, id_sector, id_municipio } = req.body;
    const con = mysql.createConnection(objectConnection);
    con.connect();

    let query;
    if(logo != null){
        query = `INSERT INTO formulario (nombre_tienda, logo, direccion, usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password, municipio_id_municipio, sector_id_sector, estado)
                       VALUES ('${nombre_tienda}', '${logo}', '${direccion}', '${usuario_nombre}', '${usuario_apellido}', '${usuario_fecha_nacimiento}', '${usuario_correo_electronico}', '${usuario_sexo}', '${usuario_password}', ${id_municipio}, ${id_sector}, 'PENDIENTE')`;
    } else {
        query = `INSERT INTO formulario (nombre_tienda, direccion, usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password, municipio_id_municipio, sector_id_sector, estado)
                       VALUES ('${nombre_tienda}', '${direccion}', '${usuario_nombre}', '${usuario_apellido}', '${usuario_fecha_nacimiento}', '${usuario_correo_electronico}', '${usuario_sexo}', '${usuario_password}', ${id_municipio}, ${id_sector}, 'PENDIENTE')`;
    }
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log("INSERT INTO formulario");
        con.query("SELECT id_formulario FROM formulario ORDER BY id_formulario DESC LIMIT 1", function (err, result, fields) {
            console.log("SELECT FROM formulario")
            if (err) throw err;
            res.send( result);
            con.end();
        })
    });    
})

router.post('/denegar', function(req, res, next) {
    const {id_formulario} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`UPDATE formulario SET estado = 'DENEGADO' WHERE id_formulario = ${id_formulario}`, function (err, result, fields) {
        console.log("UPDATE formulario")
        if (err) throw err;
        res.send( {"state": "ok"});
        con.end();
    });
});

router.post('/aprobar', function(req, res, next) {
    const {id_formulario} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();
    let id_usuario, usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password;
    
    con.query(`UPDATE formulario SET estado = 'APROBADO' WHERE id_formulario = ${id_formulario}`, function (err, result, fields) {
        console.log("UPDATE formulario");
        if (err) throw err;

        con.query(`SELECT usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password FROM formulario WHERE id_formulario = ${id_formulario}`, function (err, result, fields) {
            console.log("SELECT FROM formulario");
            if (err) throw err; 
            let {usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password} = result[0];

            con.query(`INSERT INTO usuario (nombre, apellido, fecha_nacimiento, correo_electronico, sexo, password, tipo_usuario_id_tipo) VALUES ('${usuario_nombre}', '${usuario_apellido}', '${usuario_fecha_nacimiento}', '${usuario_correo_electronico}', '${usuario_sexo}', '${usuario_password}', 2)`, function (err, result, fields) {
                console.log("INSERT INTO usuario");
                if (err) throw err;  

                con.query("SELECT id_usuario FROM usuario ORDER BY id_usuario DESC LIMIT 1", function (err, result, fields) {
                    console.log("SELECT FROM usuario");
                    if (err) throw err;
                    id_usuario = result[0].id_usuario;

                    con.query(`INSERT INTO tienda (id_tienda, fecha_aprobacion, usuario_id_usuario ) VALUES (${id_formulario}, CURDATE(), ${id_usuario})`, function (err, result, fields) {
                        console.log("INSERT INTO tienda")
                        if (err) throw err;  

                        con.query("SELECT correo_electronico, password FROM usuario ORDER BY id_usuario DESC LIMIT 1", function (err, result, fields) {
                            console.log("SELECT FROM usuario")
                            if (err) throw err;
                            const { correo_electronico, password } = result[0];

                            sendMail('AYD1.Grupo7@gmail.com', correo_electronico, `Aprobacion de tienda virtual`, `¡Felicidades! Se ha aprobado tu solicitud y ahora posees un espacio para vender tus productos en el sistema de tienda virtual CCV. Podrás ingresar al sistema utilizando las sisguientes credenciales:\n\nUsuario: ${correo_electronico}\nPassword: ${password}`);
                            res.send( {"state": "ok"});
                            
                            con.end();
                        });
                    });
                });
            });
        });
    });
})


module.exports = router;