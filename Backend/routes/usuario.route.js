var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

router.post('/validar', function(req, res, next) {
    const {correo_electronico, password} = req.body;

    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query( `SELECT id_usuario, tipo_usuario_id_tipo FROM usuario WHERE correo_electronico = '${correo_electronico}' AND password = '${password}'`, function (err, result, fields) {
        console.log("SELECT FROM usuario")
        if (err) throw err;

        if(result.length > 0){
            res.send({
                "estado": "ok",
                result
            });
        } else {
            res.send({
                "estado": "error",
                "descripcion": "el usuario no se ha encontrado"
            });
        }
        con.end();
    });
});

router.post('/nuevo', function(req, res, next) {
    const {nombre, apellido, fecha_nacimiento, correo_electronico, sexo, password} = req.body;
    con = mysql.createConnection(objectConnection);
    con.connect();

    //1. Validar que el usuario no se encuentre registrado
    con.query(`SELECT * FROM usuario WHERE correo_electronico = '${correo_electronico}'`, function(err, result, fields) {
        console.log("SELECT FROM usuario")
        if (result.length > 0) {
            res.send( {
                "estado": "error",
                "descripcion": "El usuario ya existe"
            });
            con.end();
        } else {
            //2. Registrar usuario
            con.query(`INSERT INTO usuario (nombre, apellido, fecha_nacimiento, correo_electronico, sexo, password, tipo_usuario_id_tipo) VALUES ('${nombre}', '${apellido}', '${fecha_nacimiento}', '${correo_electronico}', '${sexo}', '${password}', 3)`, function (err, result, fields) {
                console.log("INSERT INTO usuario")
                if (err) throw err;
                
                con.query("SELECT id_usuario FROM usuario ORDER BY id_usuario DESC LIMIT 1", function (err, result, fields) {
                    if (err) throw err;
                    res.send( {
                        "estado": "ok",
                        result
                    });
                    con.end();
                })
            })
        }
    });
});


module.exports = router;