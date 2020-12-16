var express = require('express');
var router = express.Router();
var con = require('../dbcontroller/dbconnection');

router.get('/validar', function(req, res, next) {
    const {correo_electronico, password} = req.body;
    let query = `SELECT id_usuario FROM usuario WHERE correo_electronico = '${correo_electronico} AND password = '${password}''`;

    con.query(query, function (err, result, fields) {
        if (err) throw err;

        if(result.length > 0){
            res.send({
                result
            });
        } else {
            res.send({
                "error": "No se ha encontrado el usuario"
            });
        }
    })
    
});

router.post('/nuevo', async function(req, res, next) {
    const {nombre, apellido, fecha_nacimiento, correo_electronico, sexo, tarjeta_credito, password, id_tipo_usuario} = req.body;
    let query;

    //1. Validar que el usuario no se encuentre registrado
    query = `SELECT * FROM usuario WHERE correo_electronico = '${correo_electronico}'`;
    const response = con.query(query, function(err, result, fields) {
        if (result.length > 0) {
            res.send( {"error": "El usuario ya existe"});
        } else {
            //2. Registrar usuario
            if(tarjeta_credito != null){
                query = `INSERT INTO usuario (nombre, apellido, fecha_nacimiento, correo_electronico, sexo, tarjeta_credito, password, tipo_usuario_id_tipo)
                        VALUES ('${nombre}', '${apellido}', '${fecha_nacimiento}', '${correo_electronico}', '${sexo}', '${tarjeta_credito}', '${password}', '${id_tipo_usuario}')`;
            } else {
                query = `INSERT INTO usuario (nombre, apellido, fecha_nacimiento, correo_electronico, sexo, password, tipo_usuario_id_tipo)
                        VALUES ('${nombre}', '${apellido}', '${fecha_nacimiento}', '${correo_electronico}', '${sexo}', '${password}', ${id_tipo_usuario})`;
            }
            con.query(query, function (err, result, fields) {
                if (err) throw err;
                con.query("SELECT id_usuario FROM usuario ORDER BY id_usuario DESC LIMIT 1", function (err, result, fields) {
                    if (err) throw err;
                    res.send( result);
                })
            })
        }
    });
    
});




module.exports = router;