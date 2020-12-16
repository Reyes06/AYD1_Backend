var express = require('express');
var router = express.Router();
var con = require('../dbcontroller/dbconnection');

router.get('/', function(req, res, next) {
    con.query("SELECT * FROM formulario WHERE estado = 'PENDIENTE'", function (err, result, fields) {
        if (err) throw err;
        res.send( result);
    })
})

router.post('/nuevo', function(req, res, next) {
    const {nombre, logo, direccion, id_usuario, id_sector, id_municipio } = req.body;

    let query;
    if(logo != null){
        query = `INSERT INTO formulario (nombre, logo, direccion, usuario_id_usuario, municipio_id_municipio, sector_id_sector, estado)
                       VALUES ('${nombre}', ${logo}, '${direccion}', ${id_usuario}, ${id_municipio}, ${id_sector}, 'PENDIENTE')`;
    } else {
        query = `INSERT INTO formulario (nombre, direccion, usuario_id_usuario, municipio_id_municipio, sector_id_sector, estado)
                       VALUES ('${nombre}', '${direccion}', ${id_usuario}, ${id_municipio}, ${id_sector}, 'PENDIENTE')`;
    }
    
    con.query(query, function (err, result, fields) {

        if (err) throw err;
        con.query("SELECT id_formulario FROM formulario ORDER BY id_formulario DESC LIMIT 1", function (err, result, fields) {
            if (err) throw err;
            res.send( result);
        })
    })
})

router.post('/denegar/:id_formulario', function(req, res, next) {
    const {id_formulario} = req.params;
    con.query(`UPDATE formulario SET estado = 'DENEGADO' WHERE id_formulario = ${id_formulario}`, function (err, result, fields) {
        if (err) throw err;
        res.send( {"state": "ok"});
    })
})

router.post('/aprobar/:id_formulario', function(req, res, next) {
    const {id_formulario} = req.params;
    con.query(`UPDATE formulario SET estado = 'APROBADO' WHERE id_formulario = ${id_formulario}`, function (err, result, fields) {
        if (err) throw err;

        con.query(`INSERT INTO tienda (formulario_id_formulario, fecha_aprovacion) VALUES (${id_formulario}, CURDATE())`, function (err, result, fields) {
            if (err) throw err;
            res.send( {"state": "ok"});
        })
    })
})


module.exports = router;