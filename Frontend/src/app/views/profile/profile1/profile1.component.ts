import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
//import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
//import { ClaseVerificarCredenciales } from '../../../models/clases';
import { sector } from './sector';
import { municipio } from '../municipio';

@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.component.html',
  styleUrls: ['./profile1.component.scss']
})
export class Profile1Component implements OnInit {
  constructor(/*private router: Router,*/ private http: HttpClient, private constantes: ConstantesService/*, private VerificarCredencialesService: VerificarCredencialesService*/) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }

  sectores: sector[] = [];
  municipios: municipio[] = [];

  CargarDatosPagina = async () => {//void
    await this.http.get<sector[]>(this.constantes.URL_BASE + "sector/").subscribe
      (
        (response) => {
          this.sectores = response;
          console.log(this.sectores);
        },
        (error) => console.log(error)
      );
    await this.http.get<municipio[]>(this.constantes.URL_BASE + "direccion/municipio/").subscribe
      (
        (response) => {
          this.municipios = response;
          console.log(this.municipios);
        },
        (error) => console.log(error)
      );
  }

  RegistrarComercio = async () => {//void

    var id = Number(localStorage.getItem('id_sesion'));
    var nombre = <HTMLInputElement>document.getElementById("form204");
    var logo = <HTMLInputElement>document.getElementById("form205");
    var sector = <HTMLInputElement>document.getElementById("form206");
    var municipio = <HTMLInputElement>document.getElementById("form207");
    var direccion = <HTMLInputElement>document.getElementById("form208");
    /*if(correo.validity.valid==false)
    { await this.constantes.DesplegarMensajeTemporaldeError("Correo no valido", 2000); }
    else
    {*/
    var terminos = <HTMLInputElement>document.getElementById("form209");
    console.log(id);
    if(terminos.checked){
      await this.http.post(this.constantes.URL_BASE + "formulario/nuevo",
        { nombre: nombre.value, logo: logo.valueAsNumber, direccion: direccion.value, id_usuario: id, id_sector: Number(sector.value), id_municipio: Number(municipio.value) }
      ).subscribe(data => this.ExitoalRegistrarComercio(data), err => this.ErroralRegistrarComercio(err));
    }
    else{ 
      this.AcepteLosTermninos();
    }
    /*}*/

  }


  ExitoalRegistrarComercio = async (Exito: any) => {//void
    console.log(Exito); await this.constantes.DesplegarMensajePermantendeExito("Solicitud enviada con Éxito", "Alguien de nuestro equipo se comunicara con usted lo mas pronto posible");
  }


  ErroralRegistrarComercio = async (Error: any) => {//void
    console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 2000);
  }

  AcepteLosTermninos = async () => {//void
    console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Aun no ha aceptado los terminos y condiciones", 2000);
  }

}
