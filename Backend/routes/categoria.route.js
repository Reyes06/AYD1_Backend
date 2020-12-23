var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
var mysql = require('mysql');

router.get('/', async function(req, res, next) {
    con = await mysql.createConnection(objectConnection);

    await con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connection OK")
    });
    const query = "SELECT * FROM categoria";
    console.log(query);
    await con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( result);
    })
    con.end(function(err) {
        if (err) throw err;
        console.log("DB Connection FINISH")
    });
})

module.exports = router;