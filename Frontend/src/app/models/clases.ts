export class ClaseVerificarCredenciales {

CredencialesExisten: boolean = false;
CredencialesVerificadasconelServidor: boolean = false; 

constructor(CredencialesExisten: boolean, CredencialesVerificadasconelServidor: boolean){
    this.CredencialesExisten= CredencialesExisten;
    this.CredencialesVerificadasconelServidor = CredencialesVerificadasconelServidor;
}

}