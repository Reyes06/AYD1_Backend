import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ConstantesService } from '../../services/constantes.service';
import { VerificarCredencialesService } from '../../services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: ElementRef;


  clicked: boolean;
  isLoggedIn: boolean;


  constructor(private router: Router, private constantes: ConstantesService, private VerificarCredencialesService: VerificarCredencialesService) {
    this.clicked = this.clicked === undefined ? false : true;
  }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  CargarDatosPagina = async () => {//void
    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
    if(ClaseVerificarCredenciales.CredencialesExisten==true && ClaseVerificarCredenciales.CredencialesVerificadasconelServidor==true)
    { this.isLoggedIn=true; }
    else if(ClaseVerificarCredenciales.CredencialesExisten==false)
    { this.isLoggedIn=false; 
      this.router.navigate(['login/login1']);}
    else if(ClaseVerificarCredenciales.CredencialesVerificadasconelServidor==false)
    { /*this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 2000);*/ 
      this.isLoggedIn=true; 
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 2000); }
    
  }


  cerrar=() => {
    localStorage.removeItem('sesion');
    localStorage.removeItem('id_sesion');
    localStorage.removeItem('usuario');
    localStorage.removeItem('tipo_de_usuario');
    localStorage.removeItem('contrasena');
    this.isLoggedIn=false;
    this.router.navigate(['login/login1']);
    window.location.reload();
  }


  setClicked(val: boolean): void {
    this.clicked = val;
  }


  readLocalStorageValue(key: string) {
    return localStorage.getItem(key);
  }
}