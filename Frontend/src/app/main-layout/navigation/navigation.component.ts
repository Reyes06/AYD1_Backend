import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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


  constructor(private router: Router, private VerificarCredencialesService: VerificarCredencialesService) {
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
    if(ClaseVerificarCredenciales.CredencialesExisten==true)
    { this.isLoggedIn=true; }
    else if(ClaseVerificarCredenciales.CredencialesExisten==false)
    { this.isLoggedIn=false; }
  }


  cerrar=() => {
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('correo_usuario');
    localStorage.removeItem('tipo_usuario');
    this.isLoggedIn=false;
    this.router.navigate(['login']);
  }


  setClicked(val: boolean): void {
    this.clicked = val;
  }


  readLocalStorageValue(key: string) {
    return localStorage.getItem(key);
  }


}