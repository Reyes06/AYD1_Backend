import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';

@Component({
  selector: 'app-perfil-administrador-administrar-categorias',
  templateUrl: './perfil-administrador-administrar-categorias.component.html',
  styleUrls: ['./perfil-administrador-administrar-categorias.component.scss']
})
export class PerfilAdministradorAdministrarCategoriasComponent implements OnInit {


  separador: String = "ôﻶ"


  constructor(private http: HttpClient, private constantes: ConstantesService) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  CargarDatosPagina = async () => {//void
    await this.CargarCategorias();
  }
  
  
  //Categorias-----------------------------------------------------------------------------------------
  
  CargarCategorias = async () => {//void
    await this.http.get(this.constantes.URL_BASE + "categoria"
    ).subscribe( data => this.ExitoalCargarCategorias(data), err => this.ErroralCargarCategorias(err) );
  }
  
  ExitoalCargarCategorias = async (Exito: any) => {//void
    var Categorias = Exito;
    await this.CargarCategoriasAux(Categorias);
  }
    
  ErroralCargarCategorias = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categorías no cargados", 3000);
  }


  //Departamentos-----------------------------------------------------------------------------------------

  CargarCategoriasAux = async (Categorias: any) => {//void
    var Html = "";console.log(Categorias);console.log(Categorias[0])
  
    var Encabezado = "\n\n<table class=\"table\">\n\n";
    Encabezado += "<thead class=\"mdb-color darken-3\">\n";
    Encabezado += "<tr class=\"text-white\">\n";
    Encabezado += "<th>Número</th>\n";
    Encabezado += "<th>Categoría</th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "</tr>\n";
    Encabezado += "</thead>\n\n"; 
    Encabezado += "<tbody> \n\n";
    
    var Pie = "</tbody>\n\n";
    Pie += "</table>\n\n";
    
    for(var i=0; i<Categorias.length; i++)
    {
      Html += "<tr> \n";    
      Html += "<td>" + (i+1) + "</td>\n";
      Html += "<td>" + Categorias[i].nombre + "</td>\n";
      Html += "<td>\n";
      Html += "<button id=\"" + Categorias[i].id_categoria + "\" class=\"btn btn-danger\" ";
      Html += "(click)=\"EliminarCategoria(" + Categorias[i].id_categoria + ")\">Eliminar</button>\n";
      Html += "</td>\n";
      Html += "<td>\n";
      Html += "<button id=\"" + Categorias[i].id_categoria + this.separador + Categorias[i].nombre + "\" class=\"btn btn-info\" ";
      Html += "(click)=\"EditarCategoria(\"" + Categorias[i].id_categoria + this.separador + Categorias[i].nombre + "\")\">Editar</button>\n";
      Html += "</td>\n";
      Html += "</tr> \n\n";
    }

    var Div_Tabla_Categorias = <HTMLInputElement>document.getElementById("Div_Tabla_Categorias");
    Div_Tabla_Categorias.innerHTML = Encabezado + Html + Pie;
      
    for(var i=0; i<Categorias.length; i++)
    {
      //Eliminar Categoría 
      var a = <HTMLInputElement>document.getElementById(Categorias[i].id_categoria);
      a.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EliminarCategoria(id);
      });
      //Editar Categoría 
      var b = <HTMLInputElement>document.getElementById(Categorias[i].id_categoria + this.separador + Categorias[i].nombre);
      b.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EditarCategoria(id);
      });
    }
  }


  //Eliminar Categoria-------------------------------------------------------------------------------

  EliminarCategoria = async (id_categoria: any) => {//void
    await this.http.post(this.constantes.URL_BASE + "categoria/borrar",
    {
      id_categoria: id_categoria
    }
    ).subscribe( data => this.ExitoalEliminarCategoria(data), err => this.ErroralEliminarCategoria(err) );
  }

  ExitoalEliminarCategoria = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajeTemporaldeExito("Categoría eliminada con éxito", 3000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
  
  ErroralEliminarCategoria = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categoría no eliminada", 3000);
  }


  //Editar Categoria-------------------------------------------------------------------------------

  EditarCategoria = async (id_y_nombre_categoria: any) => {//void
    var split_id_y_nombre_categoria = id_y_nombre_categoria.split(this.separador);
    var id_categoria = split_id_y_nombre_categoria[0];
    var nombre_categoria = split_id_y_nombre_categoria[1];
    
    var ID_Categoria = <HTMLInputElement>document.getElementById("form_id_categoria");
    ID_Categoria.value = id_categoria;
    var Nombre_Categoria = <HTMLInputElement>document.getElementById("form_nombre_categoria");
    Nombre_Categoria.value = nombre_categoria;
  }

  EditarCategoriaAux = async () => {//void
    var id_categoria = <HTMLInputElement>document.getElementById("form_id_categoria")
    var nombre_categoria = <HTMLInputElement>document.getElementById("form_nombre_categoria")
    
    if(id_categoria.value!=null && id_categoria.value!="" && nombre_categoria.value!=null && nombre_categoria.value!="")
    {
      await this.EditarCategoriaAuxAux(id_categoria.value, nombre_categoria.value);
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 4000); }  
  }
  
  EditarCategoriaAuxAux = async (id_categoria: any, nombre_categoria: any) => {//void
    await this.http.post(this.constantes.URL_BASE + "categoria/editar",
    {
      id_categoria: id_categoria,
      nombre_categoria: nombre_categoria
    }
    ).subscribe( data => this.ExitoalEditarCategoriaAuxAux(data), err => this.ErroralEditarCategoriaAuxAux(err) );
  }
  
  ExitoalEditarCategoriaAuxAux = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Categoría editada con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();

  }
    
  ErroralEditarCategoriaAuxAux = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categoría no editada", 3000);
  }


  //Agregar Categoría-------------------------------------------------------------------------------

  AgregarCategoria = async () => {//void
    var nombre_categoria = <HTMLInputElement>document.getElementById("form_nombre_categoria")

    if(nombre_categoria.value!=null && nombre_categoria.value!="")
    {
      await this.AgregarCategoriaAux(nombre_categoria.value);
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 4000); }
    
  }
  
  AgregarCategoriaAux = async (nombre_categoria: any) => {//void
    await this.http.post(this.constantes.URL_BASE + "categoria/nuevo",
    {
      nombre: nombre_categoria
    }
    ).subscribe( data => this.ExitoalAgregarCategoriaAux(data), err => this.ErroralAgregarCategoriaAux(err) );
  }
  
  ExitoalAgregarCategoriaAux = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Categoría agregada con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
    
  ErroralAgregarCategoriaAux = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categoría no agregada", 3000);
  }


}