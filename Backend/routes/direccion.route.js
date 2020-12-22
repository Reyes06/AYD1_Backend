var express = require('express');
var router = express.Router();
var con = require('../dbcontroller/dbconnection');

router.get('/pais', function(req, res, next) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connection OK")
  });
  const query = "SELECT * FROM pais";
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
  con.end(function(err) {
    if (err) throw err;
    console.log("DB Connection FINISH")
  });
});

router.get('/departamentos/:id_pais', function(req, res, next) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connection OK")
  });
  const query = `SELECT id_depto, nombre FROM departamento WHERE pais_id_pais = ${req.params.id_pais}`;
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
  con.end(function(err) {
    if (err) throw err;
    console.log("DB Connection FINISH")
  });
});

router.get('/municipios/:id_depto', function(req, res, next) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connection OK")
  });
  const query = `SELECT id_municipio, nombre FROM municipio WHERE departamento_id_depto = ${req.params.id_depto}`;
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
  con.end(function(err) {
    if (err) throw err;
    console.log("DB Connection FINISH")
  });
});

router.get('/municipio/', function(req, res, next) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connection OK")
  });
  const query = "SELECT * FROM municipio";
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
  con.end(function(err) {
    if (err) throw err;
    console.log("DB Connection FINISH")
  });
});
  
module.exports = router;
  