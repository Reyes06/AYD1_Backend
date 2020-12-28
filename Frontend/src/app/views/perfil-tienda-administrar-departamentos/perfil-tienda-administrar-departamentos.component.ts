import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';

@Component({
  selector: 'app-perfil-tienda-administrar-departamentos',
  templateUrl: './perfil-tienda-administrar-departamentos.component.html',
  styleUrls: ['./perfil-tienda-administrar-departamentos.component.scss']
})
export class PerfilTiendaAdministrarDepartamentosComponent implements OnInit {


  separador: String = "ôﻶ"


  constructor(private router: Router, private http: HttpClient, private constantes: ConstantesService, private VerificarCredencialesService: VerificarCredencialesService) { }


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
      {await this.router.navigate(['perfil-administrador']); }
      else if(tipo_usuario==="2")//Tienda
      { 
        var ID_Departamento = <HTMLInputElement>document.getElementById("form_id_departamento");
        ID_Departamento.value = "";
        await this.CargarTienda();  
      }
      else if(tipo_usuario==="3")//Usuario
      { await this.router.navigate(['perfil-usuario']);  }
    }
    else
    { await this.router.navigate(['login']); }
    
  }
  
  
    //Tienda-----------------------------------------------------------------------------------------
  
    CargarTienda = async () => {//void
      var id_usuario = localStorage.getItem('id_usuario');
      await this.http.get(this.constantes.URL_BASE + "tienda/" + id_usuario
      ).subscribe( data => this.ExitoalCargarTienda(data), err => this.ErroralCargarTienda(err) );
    }
  
    ExitoalCargarTienda = async (Exito: any) => {//void
      var id_tienda = Exito.tiendas[0].id_tienda;
      await this.CargarDepartamentos(id_tienda);
    }
    
    ErroralCargarTienda = async (Error: any) => {//void
        console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, datos de la Tienda no cargados", 3000);
    }


    //Departamentos-----------------------------------------------------------------------------------------
  
    CargarDepartamentos = async (id_tienda: any) => {//void
      await this.http.get(this.constantes.URL_BASE + "departamento/" + id_tienda
      ).subscribe( data => this.ExitoalCargarDepartamentos(data), err => this.ErroralCargarDepartamentos(err) );
    }
  
    ExitoalCargarDepartamentos = async (Exito: any) => {//void
      var Departamentos = Exito.departamentos;
      await this.CargarDepartamentosAux(Departamentos);
    }
    
    ErroralCargarDepartamentos = async (Error: any) => {//void
        console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamentos de la Tienda no cargados", 3000);
    }

    CargarDepartamentosAux = async (Departamentos: any) => {//void
      var Html = "";
  
      var Encabezado = "\n\n<table class=\"table\">\n\n";
      Encabezado += "<thead class=\"mdb-color darken-3\">\n";
      Encabezado += "<tr class=\"text-white\">\n";
      Encabezado += "<th>Número</th>\n";
      Encabezado += "<th>Departamento</th>\n";
      Encabezado += "<th></th>\n";
      Encabezado += "<th></th>\n";
      Encabezado += "</tr>\n";
      Encabezado += "</thead>\n\n"; 
      Encabezado += "<tbody> \n\n";
    
      var Pie = "</tbody>\n\n";
      Pie += "</table>\n\n";
    
      for(var i=0; i<Departamentos.length; i++)
      {
      Html += "<tr> \n";    
      Html += "<td>" + (i+1) + "</td>\n";
      Html += "<td>" + Departamentos[i].nombre + "</td>\n";
      Html += "<td>\n";
      Html += "<button id=\"" + Departamentos[i].id_depto + "\" class=\"btn btn-danger\" ";
      Html += "(click)=\"EliminarDepartamento(" + Departamentos[i].id_depto + ")\">Eliminar</button>\n";
      Html += "</td>\n";
      Html += "<td>\n";
      Html += "<button id=\"" + Departamentos[i].id_depto + this.separador + Departamentos[i].nombre + "\" class=\"btn btn-info\" ";
      Html += "(click)=\"EditarDepartamento(\"" + Departamentos[i].id_depto + this.separador + Departamentos[i].nombre + "\")\">Editar</button>\n";
      Html += "</td>\n";
      Html += "</tr> \n\n";
      }
    
      var Div_Tabla_Departamentos = <HTMLInputElement>document.getElementById("Div_Tabla_Departamentos");
      Div_Tabla_Departamentos.innerHTML = Encabezado + Html + Pie;
      
      for(var i=0; i<Departamentos.length; i++)
      {
        //Eliminar Departamento
        var a = <HTMLInputElement>document.getElementById(Departamentos[i].id_depto);
        a.addEventListener("click", (evt) => {
          const element = evt.target as HTMLInputElement;    
          var id = element.id;
          this.EliminarDepartamento(id);
        });
        //Editar Departamento
        var b = <HTMLInputElement>document.getElementById(Departamentos[i].id_depto + this.separador + Departamentos[i].nombre);
        b.addEventListener("click", (evt) => {
          const element = evt.target as HTMLInputElement;    
          var id = element.id;
          this.EditarDepartamento(id);
        });
      }
    }


  //Eliminar Departamento-------------------------------------------------------------------------------

  EliminarDepartamento = async (id_departamento: any) => {//void
    await this.http.post(this.constantes.URL_BASE + "departamento/borrar",
    {
      id_depto: id_departamento
    }
    ).subscribe( data => this.ExitoalEliminarDepartamento(data), err => this.ErroralEliminarDepartamento(err) );
  }

  ExitoalEliminarDepartamento = async (Exito: any) => {//void
    console.log(Exito);
    this.constantes.DesplegarMensajeTemporaldeExito("Departamento eliminado con éxito", 2000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
  
  ErroralEliminarDepartamento = async (Error: any) => {//void
      console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamento no eliminado", 3000);
  }


  //Editar Departamento-------------------------------------------------------------------------------

  EditarDepartamento = async (id_y_nombre_departamento: any) => {//void
    var split_id_y_nombre_departamento = id_y_nombre_departamento.split(this.separador);
    var id_departamento = split_id_y_nombre_departamento[0];
    var nombre_departamento = split_id_y_nombre_departamento[1];
    
    var ID_Categoria = <HTMLInputElement>document.getElementById("form_id_departamento");
    ID_Categoria.value = id_departamento;
    var Nombre_Categoria = <HTMLInputElement>document.getElementById("form_nombre_departamento");
    Nombre_Categoria.value = nombre_departamento;
  }

  EditarDepartamentoAux = async () => {//void
    var id_departamento = <HTMLInputElement>document.getElementById("form_id_departamento")
    var nombre_departamento = <HTMLInputElement>document.getElementById("form_nombre_departamento")
    
    if(id_departamento.value!=null && id_departamento.value!="" && nombre_departamento.value!=null && nombre_departamento.value!="")
    {
      var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
      if(ClaseVerificarCredenciales.CredencialesExisten==true)
      {
        var tipo_usuario = localStorage.getItem('tipo_usuario')
  
        if(tipo_usuario==="1")//Administrador
        { await this.router.navigate(['perfil-administrador']); }
        else if(tipo_usuario==="2")//Tienda
        { await this.EditarDepartamentoAuxAux(id_departamento.value, nombre_departamento.value);}
        else if(tipo_usuario==="3")//Usuario
        { await this.router.navigate(['perfil-usuario']);  }
      }
      else
      { await this.router.navigate(['login']); }
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 4000); }
    
  }
  
  EditarDepartamentoAuxAux = async (id_departamento: any, nombre_departamento: any) => {//void
    await this.http.post(this.constantes.URL_BASE + "departamento/editar",
    {
      id_depto: id_departamento,
      nombre: nombre_departamento
    }
    ).subscribe( data => this.ExitoalEditarDepartamentoAuxAux(data), err => this.ErroralEditarDepartamentoAuxAux(err) );
  }
  
  ExitoalEditarDepartamentoAuxAux = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Departamento editado con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();

  }
    
  ErroralEditarDepartamentoAuxAux = async (Error: any) => {//void
    console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamento no editado", 3000);
  }


  //Agregar Departamento-------------------------------------------------------------------------------

  AgregarDepartamento = async () => {//void
    var nombre_departamento = <HTMLInputElement>document.getElementById("form_nombre_departamento")

    if(nombre_departamento.value!=null && nombre_departamento.value!="")
    {
      var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
      if(ClaseVerificarCredenciales.CredencialesExisten==true)
      {
        var tipo_usuario = localStorage.getItem('tipo_usuario')
  
        if(tipo_usuario==="1")//Administrador
        {await this.router.navigate(['perfil-administrador']); }
        else if(tipo_usuario==="2")//Tienda
        { await this.AgregarDepartamentoAux();  }
        else if(tipo_usuario==="3")//Usuario
        { await this.router.navigate(['perfil-usuario']);  }
      }
      else
      { await this.router.navigate(['login']); }
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 4000); }
    
  }
    
    //Agregar Departamento, Tienda-----------------------------------------------------------------------------------------
  
    AgregarDepartamentoAux = async () => {//void
      var id_usuario = localStorage.getItem('id_usuario');
      await this.http.get(this.constantes.URL_BASE + "tienda/" + id_usuario
      ).subscribe( data => this.ExitoalAgregarDepartamentoAux(data), err => this.ErroralAgregarDepartamentoAux(err) );
    }
  
    ExitoalAgregarDepartamentoAux = async (Exito: any) => {//void
      var id_tienda = Exito.tiendas[0].id_tienda;
      await this.AgregarDepartamentoAuxAux(id_tienda);
    }
    
    ErroralAgregarDepartamentoAux = async (Error: any) => {//void
      console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamento no agregado", 3000);
    }

    //Agregar Departamento, Último Paso-----------------------------------------------------------------------------------------
  
    AgregarDepartamentoAuxAux = async (id_tienda: any) => {//void
      var nombre_departamento = <HTMLInputElement>document.getElementById("form_nombre_departamento");
      await this.http.post(this.constantes.URL_BASE + "departamento/nuevo",
      {
        nombre: nombre_departamento.value,
        id_tienda: id_tienda
      }
      ).subscribe( data => this.ExitoalAgregarDepartamentoAuxAux(data), err => this.ErroralAgregarDepartamentoAuxAux(err) );
    }
  
    ExitoalAgregarDepartamentoAuxAux = async (Exito: any) => {//void
      console.log(Exito);
      await this.constantes.DesplegarMensajePermantendeExito("Departamento agregado con éxito", "");
      await this.constantes.sleep(3000);
      await this.CargarDatosPagina();
    }
    
    ErroralAgregarDepartamentoAuxAux = async (Error: any) => {//void
        console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamento no agregado", 3000);
    }


}