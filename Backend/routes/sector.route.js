var express = require('express');
var router = express.Router();
var con = require('../dbcontroller/dbconnection');

router.get('/', function(req, res, next) {
    con.query("SELECT * FROM sector", function (err, result, fields) {
        if (err) throw err;
        res.send( result);
    })
})

module.exports = router;