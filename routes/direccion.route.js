var express = require('express');
var router = express.Router();
var con = require('../dbcontroller/dbconnection');

router.get('/pais', function(req, res, next) {
    con.query("SELECT * FROM pais", function (err, result, fields) {
      if (err) throw err;
      res.send( result);
    })
});

router.get('/departamentos/:id_pais', function(req, res, next) {
  con.query(`SELECT id_depto, nombre FROM departamento WHERE pais_id_pais = ${req.params.id_pais}`, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
});

router.get('/municipios/:id_depto', function(req, res, next) {
  con.query(`SELECT id_municipio, nombre FROM municipio WHERE departamento_id_depto = ${req.params.id_depto}`, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
});
  
module.exports = router;
  