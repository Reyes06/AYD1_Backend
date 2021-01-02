import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service'
import { ConstantesService } from '../services/constantes.service'

@Injectable({
  providedIn: 'root'
})
export class AuthPerfilGuard implements CanActivate {


  constructor(private router: Router, private authService: AuthService, private constantes: ConstantesService) 
  { }


  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    var authPerfilSinConectarmealServidor: Boolean = this.authService.AuthPerfilSinConectarmealServidor();
    if(authPerfilSinConectarmealServidor==true)
    {
      this.constantes.DesplegarMensajePermantendeError("Sin Acceso","Debes cerrar sesión para poder acceder");
      
      var tipo_usuario = localStorage.getItem('tipo_usuario')
      if(tipo_usuario==="1")//Administrador
      { this.router.navigate(['perfil-administrador']);  }
      else if(tipo_usuario==="2")//Tienda
      { this.router.navigate(['perfil-tienda']);  }
      else if(tipo_usuario==="3")//Usuario
      { this.router.navigate(['perfil-usuario']);  }
      else
      {
        this.authService.LimpiarAuth();
        this.router.navigate(['login']);
      }

      return false; 
    }
    else /*if(authPerfilSinConectarmealServidor==false)*/
    { 
      return true; 
    }
  
  }


}
