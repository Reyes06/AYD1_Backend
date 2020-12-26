import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';
import { producto } from './producto';

@Component({
  selector: 'app-perfil-usuario-dashboard',
  templateUrl: './perfil-usuario-dashboard.component.html',
  styleUrls: ['./perfil-usuario-dashboard.component.scss']
})
export class PerfilUsuarioDashboardComponent implements OnInit {


  constructor(private http: HttpClient, private constantes: ConstantesService, private router: Router, private VerificarCredencialesService: VerificarCredencialesService) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  productos: producto[] = [];

  CargarDatosPagina = async () => {//void

    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
    if (ClaseVerificarCredenciales.CredencialesExisten == true) {
      var tipo_usuario = localStorage.getItem('tipo_usuario')

      if (tipo_usuario === "1")//Administrador
      { await this.router.navigate(['perfil-administrador']); }
      else if (tipo_usuario === "2")//Tienda
      { await this.router.navigate(['perfil-tienda']); }
      else if (tipo_usuario === "3")//Usuario
      {
        await this.http.get<producto[]>(this.constantes.URL_BASE + "producto/").subscribe
          (
            (response) => {
              this.productos = response;
              console.log(this.productos);
            },
            (error) => console.log(error)
          );
      }
    }
    else { await this.router.navigate(['login']); }

  }


}
