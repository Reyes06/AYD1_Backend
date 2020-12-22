import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from './constantes.service';

import { ClaseVerificarCredenciales } from './../models/clases';

@Injectable({
  providedIn: 'root'
})
export class VerificarCredencialesService {


  private CredencialesExisten: boolean = false;
  private CredencialesVerificadasconelServidor: boolean = false;


  constructor(private http: HttpClient, private constantes: ConstantesService) { }


  VerificarCredenciales = async () => {//ClaseVerificarCredenciales
    
    this.CredencialesExisten = false;
    this.CredencialesVerificadasconelServidor = false;
  
    await this.VerificarCredencialesSinConectarmealServidor();
    await this.VerificarCredencialesConectandomealServidor();
    await this.constantes.sleep(2000);

    var sesion = localStorage.getItem('sesion');
    var id_sesion = localStorage.getItem('id_sesion')
    var usuario = localStorage.getItem('usuario')
    var tipo_de_usuario = localStorage.getItem('tipo_de_usuario')
    var contrasena = localStorage.getItem('contrasena')

    if(sesion!=null && sesion!='' 
    && id_sesion!=null && id_sesion!='' 
    && usuario!=null && usuario!='' 
    && tipo_de_usuario!=null && tipo_de_usuario!='' 
    && contrasena!=null && contrasena!='')
    { this.CredencialesExisten = true; }

    return new ClaseVerificarCredenciales(this.CredencialesExisten, this.CredencialesVerificadasconelServidor);
    
  }


  private VerificarCredencialesSinConectarmealServidor = async () => {//void
    
    var sesion = localStorage.getItem('sesion');
    var id_sesion = localStorage.getItem('id_sesion')
    var usuario = localStorage.getItem('usuario')
    var tipo_de_usuario = localStorage.getItem('tipo_de_usuario')
    var contrasena = localStorage.getItem('contrasena')
    
    if(sesion===null || sesion==='' 
    || id_sesion===null || id_sesion==='' 
    || usuario===null || usuario==='' 
    || tipo_de_usuario===null || tipo_de_usuario==='' 
    || contrasena===null || contrasena==='')
    {
      await localStorage.removeItem('sesion');
      await localStorage.removeItem('id_sesion');
      await localStorage.removeItem('usuario');
      await localStorage.removeItem('tipo_de_usuario');
      await localStorage.removeItem('contrasena');
    }

  }


  private VerificarCredencialesConectandomealServidor = async () => {//void

    var sesion = localStorage.getItem('sesion');
    var id_sesion = localStorage.getItem('id_sesion')
    var usuario = localStorage.getItem('usuario')
    var tipo_de_usuario = localStorage.getItem('tipo_de_usuario')
    var contrasena = localStorage.getItem('contrasena')

    //No hay necesidad de Verificar si las Credenciales son Correctas Conectandome al Servidor porque No Existen las Credenciales----   
    if(sesion===null || sesion==='' 
    || id_sesion===null || id_sesion==='' 
    || usuario===null || usuario==='' 
    || tipo_de_usuario===null || tipo_de_usuario==='' 
    || contrasena===null || contrasena==='')
    { this.CredencialesVerificadasconelServidor = false; }
    //-------------------------------------------------------------------------------------------------------------------------------
  
    //Verifico si las Credenciales son Correctas Conectandome al Servidor------------------------------------------------------------ 
    else
    {
    await this.http.post(this.constantes.URL_BASE + "usuario/verificarcredenciales",
    { CORREO: usuario, CONTRASENA: contrasena }
    ).subscribe(
      data => this.ExitoVerificarCredencialesConectandomealServidor(data, tipo_de_usuario),
      err => this.ErrorVerificarCredencialesConectandomealServidor(err)
    );
    }
    //-------------------------------------------------------------------------------------------------------------------------------

  }


  private ExitoVerificarCredencialesConectandomealServidor = async (Exito: any, tipo_de_usario: any) => {//void  

  //Error del Servidor al Conectarse a la Base de Datos----------------------------------------------------------------------------  
  if(Exito.conexion == "false")
  { this.CredencialesVerificadasconelServidor = false; }
  //-------------------------------------------------------------------------------------------------------------------------------
  
  //La Cuenta con ese Correo No Existe---------------------------------------------------------------------------------------------
  else if(Exito.error != "")
  {
    await localStorage.removeItem('sesion'); await localStorage.removeItem('id_sesion'); await localStorage.removeItem('usuario'); await localStorage.removeItem('tipo_de_usuario'); await localStorage.removeItem('contrasena');
    this.CredencialesVerificadasconelServidor = true;
  }
  //-------------------------------------------------------------------------------------------------------------------------------
  
  //La Cuenta con ese Correo Si Existe---------------------------------------------------------------------------------------------
  else /*if (Exito.error == "")*/
  {
    //Los Datos de Mis Credenciales Coinciden con los Datos de la Base de Datos. Todo Esta Correcto============
    if(tipo_de_usario==Exito.exito.tipo_de_usuario){ }
    //=========================================================================================================
    //Los Datos de Mis Credenciales No Coinciden con los Datos de la Base de Datos. Incorrecto=================
    else
    { await localStorage.removeItem('sesion'); await localStorage.removeItem('id_sesion'); await localStorage.removeItem('usuario'); await localStorage.removeItem('tipo_de_usuario'); await localStorage.removeItem('contrasena'); }
    //=========================================================================================================
    this.CredencialesVerificadasconelServidor = true;
  }
  //-------------------------------------------------------------------------------------------------------------------------------

  }
  

  private ErrorVerificarCredencialesConectandomealServidor = async (error: any) => {//void
  console.log(error); this.CredencialesVerificadasconelServidor = false; } 
  

}
