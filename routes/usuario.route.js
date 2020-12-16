var express = require('express');
var router = express.Router();

router.get('/validate/admin', function(req, res, next) {
    const {usuario, password} = req.body;
    let response;
    if(usuario === 'admin' && password === '123'){
    //Es el usuario administrador
        response = true;
    } else {
        response = false;
    }
    res.send({ "Verify": response });
});

router.post('/new', function(req, res, next) {
    const {nombre, apellido, fecha_nacimiento, correo_electronico, sexo, tarjeta_credito, password, id_tipo_usuario} = req.body;
    let query;
    if(tarjeta_credito != null){
        query = `INSERT INTO usuario (nombre, apellido, fecha_nacimiento, correo_electronico, sexo, tarjeta_credito, password, tipo_usuario_id_tipo)
                 VALUES (${nombre}, ${apellido}, ${fecha_nacimiento}, ${correo_electronico}, ${sexo}, ${tarjeta_credito}, ${password}, ${id_tipo_usuario})`;
    } else {
        query = `INSERT INTO usuario (nombre, apellido, fecha_nacimiento, correo_electronico, sexo, password, tipo_usuario_id_tipo)
                 VALUES (${nombre}, ${apellido}, ${fecha_nacimiento}, ${correo_electronico}, ${sexo}, ${password}, ${id_tipo_usuario})`;
    }
    console.log(query)
    con.query(query, function (err, result, fields) {
        if (err) throw err;

        console.log('aca todo bien')

        con.query("SELECT id_usuario FROM usuario ORDERY BY id_usuario DESC LIMIT 1", function (err, result, fields) {
            if (err) throw err;
            res.send( result);
        })
    })
});




module.exports = router;