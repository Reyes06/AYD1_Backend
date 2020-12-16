var express = require('express');
var router = express.Router();

router.get('/admin', function(req, res, next) {
    const {usuario, password} = req.body;
    let response;
    if(usuario === 'admin' && password === '123'){
    //Es el usuario administrador
        response = true;
    } else {
        response = false;
    }
    res.send({ "Verify": response });
  })

module.exports = router;