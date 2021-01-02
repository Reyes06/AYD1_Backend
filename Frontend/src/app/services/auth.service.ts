import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor() { }


  public AuthPerfilSinConectarmealServidor(): Boolean {
    
    var id_usuario = localStorage.getItem('id_usuario');
    var correo_usuario = localStorage.getItem('correo_usuario')
    var tipo_usuario = localStorage.getItem('tipo_usuario')
    
    if(id_usuario===null || id_usuario==='' || correo_usuario===null || correo_usuario==='' || tipo_usuario===null || tipo_usuario==='')
    {
      this.LimpiarAuth();
      return false;
    }
    else
    { return true; }
  
  }

  public AuthPerfilSinConectarmealServidor_(Tipo_de_Usuario: String): Boolean {
    
    var id_usuario = localStorage.getItem('id_usuario');
    var correo_usuario = localStorage.getItem('correo_usuario')
    var tipo_usuario = localStorage.getItem('tipo_usuario')
    
    if(id_usuario===null || id_usuario==='' || correo_usuario===null || correo_usuario==='' || tipo_usuario===null || tipo_usuario==='')
    {
      this.LimpiarAuth();
      return false;
    }
    else
    { 
      if(tipo_usuario===Tipo_de_Usuario)
      {return true;}
      else
      {return false;}      
    }
  
  }


  public LimpiarAuth(): void {
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('correo_usuario');
    localStorage.removeItem('tipo_usuario');
  }


}
