var express = require('express');
var router = express.Router();

router.get('/mensaje1', function(req, res, next) {
    res.send({"mensaje": "HelloWorld"});
});

router.get('/mensaje2', function(req, res, next) {
    res.send({"mensaje": "Sale AYD1 en vacas"});
});

module.exports = router;