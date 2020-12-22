import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private http: HttpClient, private constantes: ConstantesService, private VerificarCredencialesService: VerificarCredencialesService) 
  { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  CargarDatosPagina = async () => {//void

    /*var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
    if(ClaseVerificarCredenciales.CredencialesExisten==true)
    { await this.router.navigate(['dashboards/v1']); } */
    
  }


  Entrar = async () => {//void
    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();

    if(ClaseVerificarCredenciales.CredencialesExisten==true)
    { await this.constantes.DesplegarMensajeTemporaldeError("Sesión ya Iniciada", 2000); }
    else 
    {
      var usuario = <HTMLInputElement>document.getElementById("form104");
      var contrasenia = <HTMLInputElement>document.getElementById("form105");
      /*if(usuario.validity.valid==false)
      { await this.constantes.DesplegarMensajeTemporaldeError("Correo no valido", 2000); }
      else
      {*/
        await this.http.post(this.constantes.URL_BASE + "usuario/validar",
        { correo_electronico: usuario.value, password: contrasenia.value }
        ).subscribe( data => this.ExitoalEntrar(data, usuario.value, contrasenia.value), err => this.ErroralEntrar(err) );
      /*}*/
    }
    return false;
    /*1. Usuario encontrado:
    { "estado": "ok", "result": [ { "id_usuario": 1 } ] }
    2. Usuario no encontrado:
    { "estado": "error", "descripcion": "el usuario no se ha encontrado" }*/  
  }  


  ExitoalEntrar = async (Exito: any, usuario: string, contrasena: string) => {//void 
  if(Exito.estado=="ok")
  {
    await localStorage.setItem('sesion','true');
    await localStorage.setItem('id_sesion',Exito.result[0].id_usuario);
    await localStorage.setItem('usuario',usuario);
    await localStorage.setItem('tipo_de_usuario',Exito.result[0].tipo_usuario_id_tipo);
    await localStorage.setItem('contrasena',contrasena);

    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
 
    if(ClaseVerificarCredenciales.CredencialesExisten==false)
    { await this.constantes.DesplegarMensajeTemporaldeError("Algo ha salido mal. Vuelve a Intentarlo", 2000); }
    /*else if(ClaseVerificarCredenciales.CredencialesExisten==true && ClaseVerificarCredenciales.CredencialesVerificadasconelServidor==false)
    { await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 2000); }*/
    else
    { 
      var tipo_de_usuario = localStorage.getItem('tipo_de_usuario')
      
      if(tipo_de_usuario == "1")
      { await this.router.navigate(['dashboards/v1']); }
      else if(tipo_de_usuario == "2")
      { await this.router.navigate(['perfiltienda']); }
      else if(tipo_de_usuario == "3")
      { await this.router.navigate(['profiles/profile1']); }
      else
      { await /*this.constantes.DesplegarMensajeTemporaldeError("Algo ha salido mal. Vuelve a Intentarlo", 2000);*/ await this.router.navigate(['dashboards/v1']); }
    
      window.location.reload();
    }
  }  
  else
  { await this.constantes.DesplegarMensajeTemporaldeError(Exito.descripcion, 2000); }  
  } 


  ErroralEntrar = async (Error: any) => {//void
  console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 2000);
  }


}