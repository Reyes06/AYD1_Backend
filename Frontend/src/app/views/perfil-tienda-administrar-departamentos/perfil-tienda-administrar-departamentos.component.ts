import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { Departamento } from './Departamento';

@Component({
  selector: 'app-perfil-tienda-administrar-departamentos',
  templateUrl: './perfil-tienda-administrar-departamentos.component.html',
  styleUrls: ['./perfil-tienda-administrar-departamentos.component.scss']
})
export class PerfilTiendaAdministrarDepartamentosComponent implements OnInit {


  Separador_: String = "●▲";
  NuevoNombreDepartamento_: String = "NuevoNombreDepartamento";
  EditarDepartamento_: String = "EditarDepartamento";
  EliminarDepartamento_: String = "EliminarDepartamento";


  ListadeDepartamentos: Departamento[] = [];


  constructor(private http: HttpClient, private constantes: ConstantesService) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  CargarDatosPagina = async () => {//void
    //Obtener Departamentos de la Tienda
    await this.ObtenerDepartamentosdelaTienda();
    await this.constantes.sleep(3000);
    //Cargar Departamentos de la Tienda
    await this.CargarDepartamentosdelaTienda(this.ListadeDepartamentos);
  }
  
  
  //Obtener Departamentos de la Tienda-----------------------------------------------------------------------------------------
  
  ObtenerDepartamentosdelaTienda = async () => {//void
    this.ListadeDepartamentos = [];
    var id_usuario = localStorage.getItem('id_usuario');
    await this.http.get(this.constantes.URL_BASE + "departamento/usuario/" + id_usuario
    ).subscribe( data => this.ExitoalObtenerDepartamentosdelaTienda(data), err => this.ErroralObtenerDepartamentosdelaTienda(err) );
  }
  
  ExitoalObtenerDepartamentosdelaTienda = async (Exito: any) => {//void
    var Departamentos = Exito.departamentos;
    for(var i=0; i<Departamentos.length; i++)
    { this.ListadeDepartamentos.push( new Departamento(Departamentos[i].id_depto, Departamentos[i].nombre, Departamentos[i].tienda_id_tienda) ); }
  }
      
  ErroralObtenerDepartamentosdelaTienda = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamentos de la Tienda no cargados", 3000);
  }


  //Cargar Departamentos de la Tienda-----------------------------------------------------------------------------------------
  
  CargarDepartamentosdelaTienda = async (ListadeDepartamentos_: Departamento[]) => {//void
    var Html = "";
  
    var Encabezado = "\n\n<table class=\"table\">\n\n";
    Encabezado += "<thead class=\"mdb-color darken-3\">\n";
    Encabezado += "<tr class=\"text-white\">\n";
    Encabezado += "<th>Número</th>\n";
    Encabezado += "<th>Departamento</th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "</tr>\n";
    Encabezado += "</thead>\n\n"; 
    Encabezado += "<tbody> \n\n";
    
    var Pie = "</tbody>\n\n";
    Pie += "</table>\n\n";

    for(var i=0; i<ListadeDepartamentos_.length; i++)
    {
      Html += "<tr> \n";    
      Html += "<td>" + (i+1) + "</td>\n";
      Html += "<td>" + ListadeDepartamentos_[i].nombre + "</td>\n";
      Html += "<td><input id=\"" + this.NuevoNombreDepartamento_ + this.Separador_ + ListadeDepartamentos_[i].id_depto + "\" type=\"text\" placeholder=\"Nuevo Nombre\"></td>\n";
      Html += "<td>\n";
      Html += "<button id=\"" + this.EditarDepartamento_ + this.Separador_ + ListadeDepartamentos_[i].id_depto + "\" class=\"btn btn-info\" ";
      Html += "(click)=\"EditarDepartamento(\"" + this.EditarDepartamento_ + this.Separador_ + ListadeDepartamentos_[i].id_depto + "\")\">Editar</button>\n";
      Html += "</td>\n";
      Html += "<td>\n";
      Html += "<button id=\"" + this.EliminarDepartamento_ + this.Separador_ + ListadeDepartamentos_[i].id_depto + "\" class=\"btn btn-danger\" ";
      Html += "(click)=\"EliminarDepartamento(\"" + this.EliminarDepartamento_ + this.Separador_ + ListadeDepartamentos_[i].id_depto + "\")\">Eliminar</button>\n";
      Html += "</td>\n";
      Html += "</tr> \n\n";
    }

    var Div_Tabla_Departamentos = <HTMLInputElement>document.getElementById("Div_Tabla_Departamentos");
    Div_Tabla_Departamentos.innerHTML = Encabezado + Html + Pie; 
    
    for(var i=0; i<ListadeDepartamentos_.length; i++)
    {
      //Editar Departamento
      var a = <HTMLInputElement>document.getElementById(String(this.EditarDepartamento_) + String(this.Separador_) + String(ListadeDepartamentos_[i].id_depto));
      a.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EditarDepartamento(id);
      });
      //Eliminar Departamento
      var a = <HTMLInputElement>document.getElementById(String(this.EliminarDepartamento_) + String(this.Separador_) + String(ListadeDepartamentos_[i].id_depto));
      a.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EliminarDepartamento(id);
      });
    }
  }


  //Editar Departamento-------------------------------------------------------------------------------

  EditarDepartamento = async (EditarDepartamento_e_id: any) => {//void
    var split_EditarDepartamento_e_id = EditarDepartamento_e_id.split(this.Separador_);
    var id_departamento = split_EditarDepartamento_e_id[1];
    
    var nuevo_nombre_departamento = <HTMLInputElement>document.getElementById(String(this.NuevoNombreDepartamento_) + String(this.Separador_) + String(id_departamento));

    if(nuevo_nombre_departamento.value!=null && nuevo_nombre_departamento.value!="")
    {
      await this.http.post(this.constantes.URL_BASE + "departamento/editar",
      {
        id_depto: id_departamento,
        nombre: nuevo_nombre_departamento.value
      }
      ).subscribe( data => this.ExitoalEditarDepartamento(data), err => this.ErroralEditarDepartamento(err) );
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("El campo Nuevo Nombre no puede quedar vacío", 3000); }
  }
  
  ExitoalEditarDepartamento = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajeTemporaldeExito("Departamento editado con éxito", 3000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
    
  ErroralEditarDepartamento = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamento no editado", 3000);
  }



  //Eliminar Departamento-------------------------------------------------------------------------------

  EliminarDepartamento = async (EliminarDepartamento_e_id: any) => {//void
    var split_EliminarDepartamento_e_id = EliminarDepartamento_e_id.split(this.Separador_);
    var id_departamento = split_EliminarDepartamento_e_id[1];

    await this.http.post(this.constantes.URL_BASE + "departamento/borrar",
    {
      id_depto: id_departamento
    }
    ).subscribe( data => this.ExitoalEliminarDepartamento(data), err => this.ErroralEliminarDepartamento(err) );
  }

  ExitoalEliminarDepartamento = async (Exito: any) => {//void
    console.log(Exito);
    this.constantes.DesplegarMensajeTemporaldeExito("Departamento eliminado con éxito", 3000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
  
  ErroralEliminarDepartamento = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamento no eliminado", 3000);
  }


  //Agregar Departamento-------------------------------------------------------------------------------

  AgregarDepartamento = async () => {//void
    var nombre_departamento = <HTMLInputElement>document.getElementById("form_nombre_departamento");

    if(nombre_departamento.value!=null && nombre_departamento.value!="")
    {
      await this.AgregarDepartamentoAux();
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 3000); }
    
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
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamento no agregado", 3000);
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
    var nombre_departamento = <HTMLInputElement>document.getElementById("form_nombre_departamento");
    nombre_departamento.value = "";
    await this.constantes.DesplegarMensajeTemporaldeExito("Departamento agregado con éxito", 3000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
    
  ErroralAgregarDepartamentoAuxAux = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamento no agregado", 3000);
  }


}