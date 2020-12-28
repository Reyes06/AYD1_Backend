var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

/*READ todas las tiendas de un usuario*/
router.get('/:id_usuario', function(req, res, next) {
    const {id_usuario} = req.params;
    con = mysql.createConnection(objectConnection);
    con.connect();

    con.query(`SELECT id_tienda, nombre_tienda, logo, direccion, municipio.nombre, departamento.nombre, pais.nombre, sector.nombre, fecha_aprobacion FROM tienda INNER JOIN formulario ON formulario.id_formulario = tienda.id_tienda INNER JOIN sector ON sector.id_sector = formulario.sector_id_sector INNER JOIN municipio ON municipio.id_municipio = formulario.municipio_id_municipio INNER JOIN departamento ON departamento.id_depto = municipio.departamento_id_depto INNER JOIN pais ON pais.id_pais = departamento.pais_id_pais WHERE usuario_id_usuario = ${id_usuario}`, function (err, result, fields) {
        console.log("SELECT FROM tienda, formulario, sector, municipio, departamento, pais")
        if (err) throw err;
        res.send( {"tiendas": result});
        con.end();
    });
});


module.exports = router;