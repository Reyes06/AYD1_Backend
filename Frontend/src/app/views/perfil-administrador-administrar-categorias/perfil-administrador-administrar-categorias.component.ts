import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';

@Component({
  selector: 'app-perfil-administrador-administrar-categorias',
  templateUrl: './perfil-administrador-administrar-categorias.component.html',
  styleUrls: ['./perfil-administrador-administrar-categorias.component.scss']
})
export class PerfilAdministradorAdministrarCategoriasComponent implements OnInit {


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
      { 
        var ID_Categoria = <HTMLInputElement>document.getElementById("form_id_categoria");
        ID_Categoria.value = "";
        await this.CargarCategorias(); 
      }
      else if(tipo_usuario==="2")//Tienda
      { await this.router.navigate(['perfil-tienda']); }
      else if(tipo_usuario==="3")//Usuario
      { await this.router.navigate(['perfil-usuario']);  }
    }
    else
    { await this.router.navigate(['login']); }
    
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
        console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categorías no cargados", 3000);
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
      Html += "<button id=\"" + Categorias[i].id_categoria + "," + Categorias[i].nombre + "\" class=\"btn btn-info\" ";
      Html += "(click)=\"EditarCategoria(\"" + Categorias[i].id_categoria + "," + Categorias[i].nombre + "\")\">Editar</button>\n";
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
        var b = <HTMLInputElement>document.getElementById(Categorias[i].id_categoria + "," + Categorias[i].nombre);
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
    await this.constantes.DesplegarMensajeTemporaldeExito("Categoría eliminada con éxito", 2000);
    await this.CargarDatosPagina();
  }
  
  ErroralEliminarCategoria = async (Error: any) => {//void
      console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categoría no eliminada", 3000);
  }

  //Editar Categoria-------------------------------------------------------------------------------

  EditarCategoria = async (id_y_nombre_categoria: any) => {//void
    var split_id_y_nombre_categoria = id_y_nombre_categoria.split(",");
    var id_categoria = split_id_y_nombre_categoria[0];
    var nombre_categoria = "";
    for(var i=1; i<split_id_y_nombre_categoria.length; i++)
    { nombre_categoria += split_id_y_nombre_categoria[i]; }
    
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
      var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
      if(ClaseVerificarCredenciales.CredencialesExisten==true)
      {
        var tipo_usuario = localStorage.getItem('tipo_usuario')
  
        if(tipo_usuario==="1")//Administrador
        {await this.EditarCategoriaAuxAux(id_categoria.value, nombre_categoria.value); }
        else if(tipo_usuario==="2")//Tienda
        { await this.router.navigate(['perfil-tienda']); }
        else if(tipo_usuario==="3")//Usuario
        { await this.router.navigate(['perfil-usuario']);  }
      }
      else
      { await this.router.navigate(['login']); }
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
    await this.CargarDatosPagina();

  }
    
  ErroralEditarCategoriaAuxAux = async (Error: any) => {//void
    console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categoría no editada", 3000);
  }


  //Agregar Categoría-------------------------------------------------------------------------------

  AgregarCategoria = async () => {//void
    var nombre_categoria = <HTMLInputElement>document.getElementById("form_nombre_categoria")

    if(nombre_categoria.value!=null && nombre_categoria.value!="")
    {
      var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
      if(ClaseVerificarCredenciales.CredencialesExisten==true)
      {
        var tipo_usuario = localStorage.getItem('tipo_usuario')
  
        if(tipo_usuario==="1")//Administrador
        {await this.AgregarCategoriaAux(nombre_categoria.value); }
        else if(tipo_usuario==="2")//Tienda
        { await this.router.navigate(['perfil-tienda']); }
        else if(tipo_usuario==="3")//Usuario
        { await this.router.navigate(['perfil-usuario']);  }
      }
      else
      { await this.router.navigate(['login']); }
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
    await this.CargarDatosPagina();
  }
    
  ErroralAgregarCategoriaAux = async (Error: any) => {//void
    console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categoría no agregada", 3000);
  }


}