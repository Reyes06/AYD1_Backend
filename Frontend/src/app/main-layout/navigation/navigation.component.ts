import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;


  clicked: boolean;
  isLoggedIn: boolean;


  constructor(private authService: AuthService, private router: Router) {
    this.clicked = this.clicked === undefined ? false : true;
  }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  CargarDatosPagina = async () => {//void
    var authPerfilSinConectarmealServidor: Boolean = this.authService.AuthPerfilSinConectarmealServidor();
    if(authPerfilSinConectarmealServidor==true)
    { this.isLoggedIn=true; }
    else /*if(authPerfilSinConectarmealServidor==false)*/
    { this.isLoggedIn=false; }
  }


  cerrar=() => {
    this.authService.LimpiarAuth();
    this.isLoggedIn=false;
    this.router.navigate(['login']);
  }


  getTipoUsuario=() => {
    var tipo_usuario = localStorage.getItem('tipo_usuario')
    return tipo_usuario;
  }


  setClicked(val: boolean): void {
    this.clicked = val;
  }


}