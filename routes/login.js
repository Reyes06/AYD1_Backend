var express = require('express');
var router = express.Router();
var usuarioController = require('../controller/usuarios.controler');

router.get('/admin', function(req, res, next) {
    let {usuario, password} = req.body;
    console.log(usuario);
    console.log(password);
    const usuarioValido = usuarioController.validarAdmin( usuario, password);
    res.send({
        "Valido": usuarioValido
    })
  })

module.exports = router;