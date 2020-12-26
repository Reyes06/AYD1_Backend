import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';

@Component({
  selector: 'app-perfil-usuario-dashboard',
  templateUrl: './perfil-usuario-dashboard.component.html',
  styleUrls: ['./perfil-usuario-dashboard.component.scss']
})
export class PerfilUsuarioDashboardComponent implements OnInit {


  constructor(private router: Router, private VerificarCredencialesService: VerificarCredencialesService) { }


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
      { await this.router.navigate(['perfil-administrador']); }
      else if(tipo_usuario==="2")//Tienda
      { await this.router.navigate(['perfil-tienda']); }
      else if(tipo_usuario==="3")//Usuario
      { }
    }
    else
    { await this.router.navigate(['login']); }
    
  }


}
