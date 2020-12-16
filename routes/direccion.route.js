var express = require('express');
var router = express.Router();
var con = require('../dbcontroller/dbconnection');

router.get('/pais', function(req, res, next) {
    console.log('llego aca');
    con.query("SELECT * FROM pais", function (err, result, fields) {
      if (err) throw err;
      res.send( result);
    })
    
});
  
module.exports = router;
  