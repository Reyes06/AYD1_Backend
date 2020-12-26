import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';

@Component({
  selector: 'app-perfil-tienda',
  templateUrl: './perfil-tienda.component.html',
  styleUrls: ['./perfil-tienda.component.scss']
})
export class PerfilTiendaComponent implements OnInit {


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
      { await this.router.navigate(['perfil-administrador']);  }
      else if(tipo_usuario==="2")//Tienda
      { await this.router.navigate(['perfil-tienda/Dashboard']);  }
      else if(tipo_usuario==="3")//Usuario
      { await this.router.navigate(['perfil-usuario']);  }
    }
    else
    { await this.router.navigate(['login']); }
    
  }


}
