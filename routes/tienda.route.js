var express = require('express');
var router = express.Router();

router.post('/nuevo', function(req, res, next) {
    const {nombre, logo, direccion, id_usuario, id_sector, id_municipio } = req.body;

    let query;
    if(logo != null){
        query = `INSERT INTO tienda (nombre, logo, direccion, usuario_id_usuario, municipio_id_municipio, sector_id_sector)
                       VALUES (${nombre}, ${logo}, ${direccion}, ${id_usuario}, ${id_sector}, ${id_municipio})`;
    } else {
        query = `INSERT INTO tienda (nombre, direccion, usuario_id_usuario, municipio_id_municipio, sector_id_sector)
                       VALUES (${nombre}, ${direccion}, ${id_usuario}, ${id_sector}, ${id_municipio})`;
    }
    
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( result);
    })
})


module.exports = router;