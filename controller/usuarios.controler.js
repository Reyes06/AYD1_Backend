
let usuariosController = {

    validarAdmin: function (usuario, password){
        if(usuario === 'admin' && password === '123'){
            //Es el usuario administrador
            return true;
        } else {
            return false;
        }
    }

}

module.exports = usuariosController;