import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
//import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { formularios } from './formularios';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit {

  constructor(/*private router: Router,*/ private http: HttpClient, private constantes: ConstantesService/*, private VerificarCredencialesService: VerificarCredencialesService*/) 
  { }

  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }

  users : formularios[] = [];

  CargarDatosPagina = async () => {//void
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

  aprobar(id_formulario:any){
    this.http.post(this.constantes.URL_BASE + "formulario/aprobar/" + id_formulario,
    {  }
    ).subscribe( data => this.ExitoalAceptarComercio(data), err => this.MensajeError(err) );
    this.CargarDatosPagina();
  }

  rechazar(id_formulario:any){
    this.http.post(this.constantes.URL_BASE + "formulario/denegar/" + id_formulario,
    {  }
    ).subscribe( data => this.ExitoalDenegarComercio(data), err => this.MensajeError(err) );
    this.CargarDatosPagina();
  }

  ExitoalAceptarComercio = async (Exito: any) => {//void
    console.log(Exito); await this.constantes.DesplegarMensajePermantendeExito("Se otorgo acceso con Éxito", "Las credenciales han sido enviadas");  
    
  }
  
  ExitoalDenegarComercio = async (Exito: any) => {//void
    console.log(Exito); await this.constantes.DesplegarMensajePermantendeExito("Se denego acceso con Éxito", "Has rechazado la solicitud");  
    
  }

  MensajeError = async (Error: any) => {//void
    console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 2000);
  }

}
