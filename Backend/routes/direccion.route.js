var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

router.get('/pais', function(req, res, next) {
  con = mysql.createConnection(objectConnection);
  con.connect();

  con.query("SELECT * FROM pais", function (err, result, fields) {
    console.log("SELECT FROM pais");
    if (err) throw err;
    res.send( result);
    con.end();
  });
});

router.get('/departamentos/:id_pais', function(req, res, next) {
  con = mysql.createConnection(objectConnection);
  con.connect();

  con.query(`SELECT id_depto, nombre FROM departamento WHERE pais_id_pais = ${req.params.id_pais}`, function (err, result, fields) {
    console.log("SELECT FROM departamento");
    if (err) throw err;
    res.send( result);
    con.end();
  });
});

router.get('/municipios/:id_depto', function(req, res, next) {
  con = mysql.createConnection(objectConnection);
  con.connect();

  con.query( `SELECT id_municipio, nombre FROM municipio WHERE departamento_id_depto = ${req.params.id_depto}`, function (err, result, fields) {
    console.log("SELECT FROM municipio");
    if (err) throw err;
    res.send( result);
    con.end();
  });
});
  
module.exports = router;
  