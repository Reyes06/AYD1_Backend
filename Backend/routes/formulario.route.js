var express = require('express');
var router = express.Router();
var objectConnection = require('../dbcontroller/dbconnection');
const sendMail = require('../utils/mail-manager');
var mysql = require('mysql');


router.get('/', async function(req, res, next) {
    con = await mysql.createConnection(objectConnection);

    con.connect(function(err) {
        if (err) throw err;
        console.log("DB Connection OK")
    });
    const query = "SELECT * FROM formulario WHERE estado = 'PENDIENTE'";
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( result);
    });
    con.end(function(err) {
        if (err) throw err;
        console.log("DB Connection FINISH")
    });
})

router.post('/nuevo', async function(req, res, next) {
    const {nombre_tienda, logo, direccion, usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password, id_sector, id_municipio } = req.body;
    const con = mysql.createConnection(objectConnection);
    con.connect();

    let query;
    

    let promesa = new Promise(function(resolve, reject) {
        if(logo != null){
            query = `INSERT INTO formulario (nombre_tienda, logo, direccion, usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password, municipio_id_municipio, sector_id_sector, estado)
                           VALUES ('${nombre_tienda}', ${logo}, '${direccion}', '${usuario_nombre}', '${usuario_apellido}', '${usuario_fecha_nacimiento}', '${usuario_correo_electronico}', '${usuario_sexo}', '${usuario_password}', ${id_municipio}, ${id_sector}, 'PENDIENTE')`;
        } else {
            query = `INSERT INTO formulario (nombre_tienda, direccion, usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password, municipio_id_municipio, sector_id_sector, estado)
                           VALUES ('${nombre_tienda}', '${direccion}', '${usuario_nombre}', '${usuario_apellido}', '${usuario_fecha_nacimiento}', '${usuario_correo_electronico}', '${usuario_sexo}', '${usuario_password}', ${id_municipio}, ${id_sector}, 'PENDIENTE')`;
        }
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
                      
        })
        resolve("OK");
    }).then(function(){
        query = "SELECT id_formulario FROM formulario ORDER BY id_formulario DESC LIMIT 1";
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            res.send( result);
        })
    }).then(function(){
        con.end();
    });
    
})

router.post('/denegar', async function(req, res, next) {
    const {id_formulario} = req.body;
    con = await mysql.createConnection(objectConnection);
    con.connect();
    const query = `UPDATE formulario SET estado = 'DENEGADO' WHERE id_formulario = ${id_formulario}`;
    console.log(query);
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.send( {"state": "ok"});
    })
    con.end();
})

router.post('/aprobar', async function(req, res, next) {
    const {id_formulario} = req.body;
    con = await mysql.createConnection(objectConnection);
    con.connect();

    let id_usuario, usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password;
    
    let promesa = new Promise(function(resolve, reject){
        const query = `UPDATE formulario SET estado = 'APROBADO' WHERE id_formulario = ${id_formulario}`;
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
        });
        resolve("OK");
    }).then(function(onResolve){
        const query = `SELECT usuario_nombre, usuario_apellido, usuario_fecha_nacimiento, usuario_correo_electronico, usuario_sexo, usuario_password FROM formulario WHERE id_formulario = ${id_formulario}`;
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err; 
            usuario_nombre = result[0].usuario_nombre;
            usuario_apellido = result[0].usuario_apellido;
            usuario_fecha_nacimiento = result[0].usuario_fecha_nacimiento;
            usuario_correo_electronico = result[0].usuario_correo_electronico;
            usuario_sexo = result[0].usuario_sexo;
            usuario_password = result[0].usuario_password;



            const query = `INSERT INTO usuario (nombre, apellido, fecha_nacimiento, correo_electronico, sexo, password, tipo_usuario_id_tipo) VALUES ('${usuario_nombre}', '${usuario_apellido}', '${usuario_fecha_nacimiento}', '${usuario_correo_electronico}', '${usuario_sexo}', '${usuario_password}', 2)`;
            console.log(query);
            con.query(query, function (err, result, fields) {
                if (err) throw err;  
            })
        });
    }).then(function(onResolve){
        const query = "SELECT id_usuario FROM usuario ORDER BY id_usuario DESC LIMIT 1";
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            id_usuario = result[0].id_usuario;


            const query = `INSERT INTO tienda (id_tienda, fecha_aprobacion, usuario_id_usuario ) VALUES (${id_formulario}, CURDATE(), ${id_usuario})`;
            console.log(query);
            con.query(query, function (err, result, fields) {
                if (err) throw err;  
            })
        })
    }).then(function(onResolve){

    setTimeout(function(){ console.log("Se va a enviar correo"); 
    
        const query = "SELECT correo_electronico, password FROM usuario ORDER BY id_usuario DESC LIMIT 1";
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            const { correo_electronico, password }= result[0];

            sendMail('AYD1.Grupo7@gmail.com', correo_electronico, `Aprobacion de tienda virtual`, `¡Felicidades! Se ha aprobado tu solicitud y ahora posees un espacio para vender tus productos en el sistema de tienda virtual CCV. Podrás ingresar al sistema utilizando las sisguientes credenciales:\n\nUsuario: ${correo_electronico}\nPassword: ${password}`);
            res.send( {"state": "ok"});
            
            con.end();
        });

        
    }, 1000);

        
        
    });
})


module.exports = router;