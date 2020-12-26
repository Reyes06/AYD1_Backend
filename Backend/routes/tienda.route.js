var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

/*READ todas las tiendas de un usuario*/
router.get('/:id_usuario', async function(req, res, next) {
    const {id_usuario} = req.params;
    con = await mysql.createConnection(objectConnection);
    con.connect();

    const query = `SELECT id_tienda, nombre_tienda, logo, direccion, municipio.nombre, departamento.nombre, pais.nombre, sector.nombre, fecha_aprobacion FROM tienda INNER JOIN formulario ON formulario.id_formulario = tienda.id_tienda INNER JOIN sector ON sector.id_sector = formulario.sector_id_sector INNER JOIN municipio ON municipio.id_municipio = formulario.municipio_id_municipio INNER JOIN departamento ON departamento.id_depto = municipio.departamento_id_depto INNER JOIN pais ON pais.id_pais = departamento.pais_id_pais`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( {"tiendas": result});
        con.end();
    });
});


module.exports = router;