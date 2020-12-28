import { Injectable } from '@angular/core';

import { ConstantesService } from './constantes.service';

import { ClaseVerificarCredenciales } from './../models/clases';

@Injectable({
  providedIn: 'root'
})
export class VerificarCredencialesService {


  private CredencialesExisten: boolean = false;


  constructor(private constantes: ConstantesService) { }


  VerificarCredenciales = async () => {//ClaseVerificarCredenciales
    
    this.CredencialesExisten = false;
  
    await this.VerificarCredencialesSinConectarmealServidor();
    await this.constantes.sleep(2000);

    var id_usuario = localStorage.getItem('id_usuario');
    var correo_usuario = localStorage.getItem('correo_usuario')
    var tipo_usuario = localStorage.getItem('tipo_usuario')

    if(id_usuario!=null && id_usuario!='' && correo_usuario!=null && correo_usuario!='' && tipo_usuario!=null && tipo_usuario!='')
    { this.CredencialesExisten = true; }

    return new ClaseVerificarCredenciales(this.CredencialesExisten);
    
  }


  private VerificarCredencialesSinConectarmealServidor = async () => {//void
    
    var id_usuario = localStorage.getItem('id_usuario');
    var correo_usuario = localStorage.getItem('correo_usuario')
    var tipo_usuario = localStorage.getItem('tipo_usuario')
    
    if(id_usuario===null || id_usuario==='' || correo_usuario===null || correo_usuario==='' || tipo_usuario===null || tipo_usuario==='')
    {
      await localStorage.removeItem('id_usuario');
      await localStorage.removeItem('correo_usuario');
      await localStorage.removeItem('tipo_usuario');
    }

  }


}
