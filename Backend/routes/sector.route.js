var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

router.get('/', function(req, res, next) {
    con = mysql.createConnection(objectConnection);

    con.connect();
    con.query("SELECT * FROM sector", function (err, result, fields) {
        console.log("SELECT FROM sector")
        if (err) throw err;
        res.send( result);
        con.end();
    })
})

module.exports = router;