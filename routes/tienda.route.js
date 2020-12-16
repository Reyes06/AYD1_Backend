var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
    const {usuario, password} = req.body;
})


module.exports = router;