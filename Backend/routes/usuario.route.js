var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

router.post('/validar', async function(req, res, next) {
    const {correo_electronico, password} = req.body;

    con = await mysql.createConnection(objectConnection);

    await con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connection OK")
    });
    let query = `SELECT id_usuario, tipo_usuario_id_tipo FROM usuario WHERE correo_electronico = '${correo_electronico}' AND password = '${password}'`;
    console.log(query);
    await con.query(query, function (err, result, fields) {
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
    })
    
    con.end(function(err) {
        if (err) throw err;
        console.log("DB Connection FINISH")
    });
});

router.post('/nuevo', async function(req, res, next) {
    const {nombre, apellido, fecha_nacimiento, correo_electronico, sexo, password} = req.body;
    let query;

    con = await mysql.createConnection(objectConnection);

    await con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connection OK")
    });

    //1. Validar que el usuario no se encuentre registrado
    query = `SELECT * FROM usuario WHERE correo_electronico = '${correo_electronico}'`;
    console.log(query);
    await con.query(query, function(err, result, fields) {
        if (result.length > 0) {
            res.send( 
                {
                    "estado": "error",
                    "descripcion": "El usuario ya existe"
                });
        } else {
            //2. Registrar usuario
            query = `INSERT INTO usuario (nombre, apellido, fecha_nacimiento, correo_electronico, sexo, password, tipo_usuario_id_tipo)
                    VALUES ('${nombre}', '${apellido}', '${fecha_nacimiento}', '${correo_electronico}', '${sexo}', '${password}', 3)`;
            console.log(query);
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                con.query("SELECT id_usuario FROM usuario ORDER BY id_usuario DESC LIMIT 1", function (err, result, fields) {
                    if (err) throw err;
                    res.send( {
                        "estado": "ok",
                        result
                    });
                    con.end(function(err) {
                        if (err) throw err;
                        console.log("DB Connection FINISH")
                    });
                })
            })
        }
    });
});


module.exports = router;