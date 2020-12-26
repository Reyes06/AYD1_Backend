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

    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
    if(ClaseVerificarCredenciales.CredencialesExisten==true)
    {
      var tipo_usuario = localStorage.getItem('tipo_usuario')

      if(tipo_usuario==="1")//Administrador
      { await this.router.navigate(['perfil-administrador']);  }
      else if(tipo_usuario==="2")//Tienda
      { await this.router.navigate(['perfil-tienda']);  }
      else if(tipo_usuario==="3")//Usuario
      { await this.router.navigate(['perfil-usuario']);  }
  
    }
    
  }


  Entrar = async () => {//void
    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();

    if(ClaseVerificarCredenciales.CredencialesExisten==true)
    { await this.constantes.DesplegarMensajeTemporaldeError("Sesión ya Iniciada", 2000); }
    else 
    {
      var correo = <HTMLInputElement>document.getElementById("form104");
      var contrasena = <HTMLInputElement>document.getElementById("form105");
        
      await this.http.post(this.constantes.URL_BASE + "usuario/validar",
      { correo_electronico: correo.value, password: contrasena.value }
        ).subscribe( data => this.ExitoalEntrar(data, correo.value), err => this.ErroralEntrar(err) );
      /*}*/
    }
    return false;
  }  


  ExitoalEntrar = async (Exito: any, correo: string) => {//void 
  if(Exito.estado=="ok")
  {
    await localStorage.setItem('id_usuario',Exito.result[0].id_usuario);
    await localStorage.setItem('correo_usuario',correo);
    await localStorage.setItem('tipo_usuario',Exito.result[0].tipo_usuario_id_tipo);

    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
 
    if(ClaseVerificarCredenciales.CredencialesExisten==false)
    { await this.constantes.DesplegarMensajeTemporaldeError("Algo ha salido mal. Vuelve a Intentarlo", 2000); }
    else /*if(ClaseVerificarCredenciales.CredencialesExisten==true)*/
    { 
      var tipo_usuario = localStorage.getItem('tipo_usuario')
      
      if(tipo_usuario==="1")//Administrador
      { await this.router.navigate(['perfil-administrador']);  }
      else if(tipo_usuario==="2")//Tienda
      { await this.router.navigate(['perfil-tienda']);  }
      else if(tipo_usuario==="3")//Usuario
      { await this.router.navigate(['perfil-usuario']);  }
      else
      { this.constantes.DesplegarMensajeTemporaldeError("Algo ha salido mal. Vuelve a Intentarlo", 2000); }
    
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