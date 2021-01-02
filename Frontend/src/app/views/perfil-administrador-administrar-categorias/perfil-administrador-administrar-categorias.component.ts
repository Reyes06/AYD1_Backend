import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { Categoria } from './Categoria';

@Component({
  selector: 'app-perfil-administrador-administrar-categorias',
  templateUrl: './perfil-administrador-administrar-categorias.component.html',
  styleUrls: ['./perfil-administrador-administrar-categorias.component.scss']
})
export class PerfilAdministradorAdministrarCategoriasComponent implements OnInit {


  Separador_: String = "●▲";
  NuevoNombreCategoria_: String = "NuevoNombreCategoria";
  EditarCategoria_: String = "EditarCategoria";
  EliminarCategoria_: String = "EliminarCategoria";


  ListadeCategorias: Categoria[] = [];


  constructor(private http: HttpClient, private constantes: ConstantesService) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  CargarDatosPagina = async () => {//void
    //Obtener Categorias
    await this.ObtenerCategorias();
    await this.constantes.sleep(3000);
    //Cargar Categorias
    await this.CargarCategorias(this.ListadeCategorias);
  }
  
  
  //Obtener Categorias-----------------------------------------------------------------------------------------
  
  ObtenerCategorias = async () => {//void
    this.ListadeCategorias = [];
    await this.http.get(this.constantes.URL_BASE + "categoria"
    ).subscribe( data => this.ExitoalCargarCategorias(data), err => this.ErroralCargarCategorias(err) );
  }
  
  ExitoalCargarCategorias = async (Exito: any) => {//void
    var Categorias = Exito;
    for(var i=0; i<Categorias.length; i++)
    { this.ListadeCategorias.push( new Categoria(Categorias[i].id_categoria, Categorias[i].nombre) ); }
  }
    
  ErroralCargarCategorias = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categorías no cargadas", 3000);
  }


  //Cargar Categorias-----------------------------------------------------------------------------------------

  CargarCategorias = async (ListadeCategorias_: Categoria[]) => {//void
    var Html = "";
  
    var Encabezado = "\n\n<table class=\"table\">\n\n";
    Encabezado += "<thead class=\"mdb-color darken-3\">\n";
    Encabezado += "<tr class=\"text-white\">\n";
    Encabezado += "<th>Número</th>\n";
    Encabezado += "<th>Categoría</th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "</tr>\n";
    Encabezado += "</thead>\n\n"; 
    Encabezado += "<tbody> \n\n";
    
    var Pie = "</tbody>\n\n";
    Pie += "</table>\n\n";
    
    for(var i=0; i<ListadeCategorias_.length; i++)
    {
      Html += "<tr> \n";    
      Html += "<td>" + (i+1) + "</td>\n";
      Html += "<td>" + ListadeCategorias_[i].nombre + "</td>\n";
      Html += "<td><input id=\"" + this.NuevoNombreCategoria_ + this.Separador_ + ListadeCategorias_[i].id_categoria + "\" type=\"text\" placeholder=\"Nuevo Nombre\"></td>\n";
      Html += "<td>\n";
      Html += "<button id=\"" + this.EditarCategoria_ + this.Separador_ + ListadeCategorias_[i].id_categoria + "\" class=\"btn btn-info\" ";
      Html += "(click)=\"EditarCategoria(\"" + this.EditarCategoria_ + this.Separador_ + ListadeCategorias_[i].id_categoria + "\")\">Editar</button>\n";
      Html += "</td>\n";
      Html += "<td>\n";
      Html += "<button id=\"" + this.EliminarCategoria_ + this.Separador_ + ListadeCategorias_[i].id_categoria + "\" class=\"btn btn-danger\" ";
      Html += "(click)=\"EliminarCategoria(\"" + this.EliminarCategoria_ + this.Separador_ + ListadeCategorias_[i].id_categoria + "\")\">Eliminar</button>\n";
      Html += "</td>\n";
      Html += "</tr> \n\n";
    }

    var Div_Tabla_Categorias = <HTMLInputElement>document.getElementById("Div_Tabla_Categorias");
    Div_Tabla_Categorias.innerHTML = Encabezado + Html + Pie;
      
    for(var i=0; i<ListadeCategorias_.length; i++)
    {
      //Editar Categoría
      var a = <HTMLInputElement>document.getElementById(String(this.EditarCategoria_) + String(this.Separador_) + String(ListadeCategorias_[i].id_categoria));
      a.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EditarCategoria(id);
      });
      //Eliminar Categoría
      var b = <HTMLInputElement>document.getElementById(String(this.EliminarCategoria_) + String(this.Separador_) + String(ListadeCategorias_[i].id_categoria));
      b.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EliminarCategoria(id);
      });
    }
  }


  //Editar Categoria-------------------------------------------------------------------------------

  EditarCategoria = async (EditarCategoria_e_id: any) => {//void
    var split_EditarCategoria_e_id = EditarCategoria_e_id.split(this.Separador_);
    var id_categoria = split_EditarCategoria_e_id[1];
    
    var nuevo_nombre_categoria = <HTMLInputElement>document.getElementById(String(this.NuevoNombreCategoria_) + String(this.Separador_) + String(id_categoria));

    if(nuevo_nombre_categoria.value!=null && nuevo_nombre_categoria.value!="")
    {    
      await this.http.post(this.constantes.URL_BASE + "categoria/editar",
      {
        id_categoria: id_categoria,
        nombre_categoria: nuevo_nombre_categoria.value
      }
      ).subscribe( data => this.ExitoalEditarCategoria(data), err => this.ErroralEditarCategoria(err) );
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("El campo Nuevo Nombre no puede quedar vacío", 3000); }
  }
  
  ExitoalEditarCategoria = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajeTemporaldeExito("Categoría editada con éxito", 3000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
    
  ErroralEditarCategoria = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categoría no editada", 3000);
  }


  //Eliminar Categoría-------------------------------------------------------------------------------

  EliminarCategoria = async (EliminarCategoria_e_id: any) => {//void
    var split_EliminarCategoria_e_id = EliminarCategoria_e_id.split(this.Separador_);
    var id_categoria = split_EliminarCategoria_e_id[1];

    await this.http.post(this.constantes.URL_BASE + "categoria/borrar",
    {
      id_categoria: id_categoria
    }
    ).subscribe( data => this.ExitoalEliminarCategoria(data), err => this.ErroralEliminarCategoria(err) );
  }

  ExitoalEliminarCategoria = async (Exito: any) => {//void
    console.log(Exito);
    this.constantes.DesplegarMensajeTemporaldeExito("Categoría eliminada con éxito", 3000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
  
  ErroralEliminarCategoria = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categoría no eliminada", 3000);
  }


  //Agregar Categoría-------------------------------------------------------------------------------

  AgregarCategoria = async () => {//void
    var nombre_categoria = <HTMLInputElement>document.getElementById("form_nombre_categoria")

    if(nombre_categoria.value!=null && nombre_categoria.value!="")
    {
      await this.http.post(this.constantes.URL_BASE + "categoria/nuevo",
      {
        nombre: nombre_categoria.value
      }
      ).subscribe( data => this.ExitoalAgregarCategoria(data), err => this.ErroralAgregarCategoria(err) );
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 3000); } 
  }
  
  ExitoalAgregarCategoria = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajeTemporaldeExito("Categoría agregada con éxito", 3000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
    
  ErroralAgregarCategoria = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categoría no agregada", 3000);
  }


}