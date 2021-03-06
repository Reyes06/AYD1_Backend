import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { formularios } from './formularios';

@Component({
  selector: 'app-perfil-administrador-solicitudes',
  templateUrl: './perfil-administrador-solicitudes.component.html',
  styleUrls: ['./perfil-administrador-solicitudes.component.scss']
})
export class PerfilAdministradorSolicitudesComponent implements OnInit {


  constructor(private http: HttpClient, private constantes: ConstantesService) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  CargarDatosPagina = async () => {//void
    await this.CargarDatosPaginaAux();
  }


  users : formularios[] = [];

  CargarDatosPaginaAux = async () => {//void
    await this.http.get<formularios[]>(this.constantes.URL_BASE + "formulario/").subscribe
    ( 
      (response)=>
      {
        this.users = response;
        console.log(this.users);
      },
      (error) => console.log(error)
    );
  }

  aprobar = async (id_formulario:any) => {//void
    this.http.post(this.constantes.URL_BASE + "formulario/aprobar",
    { id_formulario: id_formulario }
    ).subscribe( data => this.ExitoalAceptarComercio(data), err => this.MensajeError(err) );
    await this.constantes.sleep(3000);
    this.CargarDatosPaginaAux();
  }

  rechazar = async (id_formulario:any) => {//void
    this.http.post(this.constantes.URL_BASE + "formulario/denegar",
    { id_formulario: id_formulario }
    ).subscribe( data => this.ExitoalDenegarComercio(data), err => this.MensajeError(err) );
    await this.constantes.sleep(3000);
    this.CargarDatosPaginaAux();
  }

  ExitoalAceptarComercio = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Se otorgo acceso con Éxito", "Las credenciales han sido enviadas");
  }
  
  ExitoalDenegarComercio = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Se denego acceso con Éxito", "Has rechazado la solicitud");    
  }

  MensajeError = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 3000);
  }

}