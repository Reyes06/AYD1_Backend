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
  con.query(`SELECT * FROM departamento WHERE pais_id_pais = ${req.params.id_pais}`, function (err, result, fields) {
    if (err) throw err;
    res.send( result);
  })
});
  
module.exports = router;
  