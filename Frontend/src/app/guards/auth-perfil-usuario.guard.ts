import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service'
import { ConstantesService } from '../services/constantes.service'

@Injectable({
  providedIn: 'root'
})
export class AuthPerfilUsuarioGuard implements CanActivate {


  constructor(private authService: AuthService, private constantes: ConstantesService, private router: Router) 
  { }


  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var authPerfilSinConectarmealServidor: Boolean = this.authService.AuthPerfilSinConectarmealServidor_("3");
    if(authPerfilSinConectarmealServidor==true)
    {
      return true;
    }
    else /*if(authPerfilSinConectarmealServidor==false)*/
    {
      this.constantes.DesplegarMensajePermantendeError("Sin Acceso","Debes loguearte como usuario para poder acceder");

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

  }


}
