var express = require('express');
var router = express.Router();
var con = require('../dbcontroller/dbconnection');

router.get('/', function(req, res, next) {
    con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connection OK")
    });
    const query = "SELECT * FROM sector";
    console.log(query);
    con.query("SELECT * FROM sector", function (err, result, fields) {
        if (err) throw err;
        res.send( result);
    })
    con.end(function(err) {
        if (err) throw err;
        console.log("DB Connection FINISH")
    });
})

module.exports = router;