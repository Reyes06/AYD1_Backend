var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

router.get('/pais', async function(req, res, next) {
  con = await mysql.createConnection(objectConnection);

  await con.connect(function(err) {
    if (err) {console.log(err); throw err};
    console.log("DB Connection OK")
  });
  const query = "SELECT * FROM pais";
  console.log(query);
  await con.query(query, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
  con.end(function(err) {
    if (err) throw err;
    console.log("DB Connection FINISH")
  });
});

router.get('/departamentos/:id_pais', async function(req, res, next) {
  con = await mysql.createConnection(objectConnection);

  await con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connection OK")
  });
  const query = `SELECT id_depto, nombre FROM departamento WHERE pais_id_pais = ${req.params.id_pais}`;
  console.log(query);
  await con.query(query, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
  con.end(function(err) {
    if (err) throw err;
    console.log("DB Connection FINISH")
  });
});

router.get('/municipios/:id_depto', async function(req, res, next) {
  con = await mysql.createConnection(objectConnection);

  await con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connection OK")
  });
  const query = `SELECT id_municipio, nombre FROM municipio WHERE departamento_id_depto = ${req.params.id_depto}`;
  console.log(query);
  await con.query(query, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
  con.end(function(err) {
    if (err) throw err;
    console.log("DB Connection FINISH")
  });
});

router.get('/municipio/', async function(req, res, next) {
  con = await mysql.createConnection(objectConnection);

  await con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connection OK")
  });
  const query = "SELECT * FROM municipio";
  console.log(query);
  await con.query(query, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
  con.end(function(err) {
    if (err) throw err;
    console.log("DB Connection FINISH")
  });
});
  
module.exports = router;
  