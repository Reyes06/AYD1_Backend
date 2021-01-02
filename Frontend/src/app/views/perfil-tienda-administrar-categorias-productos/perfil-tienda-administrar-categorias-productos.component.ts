import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { Producto } from './Producto';
import { Categoria } from './Categoria';

/*interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}*/

@Component({
  selector: 'app-perfil-tienda-administrar-categorias-productos',
  templateUrl: './perfil-tienda-administrar-categorias-productos.component.html',
  styleUrls: ['./perfil-tienda-administrar-categorias-productos.component.scss']
})
export class PerfilTiendaAdministrarCategoriasProductosComponent implements OnInit {


  Separador_: String = "●▲";
  AgregarCategoriaProducto_: String = "AgregarCategoriaProducto";
  EliminarCategoriaProducto_: String = "EliminarProducto";
  Select_: String = "Select";


  ListadeProductos: Producto[] = [];
  ListadeCategorias: Categoria[] = [];


  photoSelected: any;//string | ArrayBuffer;
  file: File;


  EditarProductoID: String = "-1";
  EditarProducto_photoSelected: any;//string | ArrayBuffer;
  EditarProducto_file: File;


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
    //Obtener Productos de la Tienda
    await this.ObtenerProductosdelaTienda();
    await this.constantes.sleep(3000);
    //Cargar Productos de la Tienda
    await this.CargarProductosdelaTienda(this.ListadeProductos, this.ListadeCategorias);
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


  //Obtener Productos de la Tienda-----------------------------------------------------------------------------------------

  ObtenerProductosdelaTienda = async () => {//void
    this.ListadeProductos = [];
    var id_usuario = localStorage.getItem('id_usuario');
    await this.http.get(this.constantes.URL_BASE + "producto/usuario/" + id_usuario
    ).subscribe( data => this.ExitoalObtenerProductosdelaTienda(data), err => this.ErroralObtenerProductosdelaTienda(err) );
  }
  
  ExitoalObtenerProductosdelaTienda = async (Exito: any) => {//void
    var Productos = Exito.productos;
    for(var i=0; i<Productos.length; i++)
    { this.ListadeProductos.push( new Producto(Productos[i].id_producto, Productos[i].nombre, Productos[i].descripcion, Productos[i].precio, Productos[i].cantidad_inventario, Productos[i].id_departamento, Productos[i].nombre_departamento, Productos[i].imagen, /*Productos[i].categorias*/[]) ); }
  }
    
  ErroralObtenerProductosdelaTienda = async (Error: any) => {//void
    console.log(Error); 
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Productos de la Tienda no cargados", 3000);
  }


  //Cargar Productos de la Tienda-----------------------------------------------------------------------------------------
  
  CargarProductosdelaTienda = async (ListadeProductos_: Producto[], ListadeCategorias_: Categoria[]) => {//void
    var Html = "";
    var Encabezado = "\n\n<table class=\"table\">\n\n";
    Encabezado += "<thead class=\"mdb-color darken-3\">\n";
    Encabezado += "<tr class=\"text-white\">\n";
    Encabezado += "<th>Número</th>\n";
    Encabezado += "<th>Nombre</th>\n";
    Encabezado += "<th>Imagen</th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "<th></th>\n";
    //Encabezado += "<th></th>\n";
    //Encabezado += "<th></th>\n";
    Encabezado += "</tr>\n";
    Encabezado += "</thead>\n\n"; 
    Encabezado += "<tbody> \n\n";
    
    var Pie = "</tbody>\n\n";
    Pie += "</table>\n\n";

    for(var i=0; i<ListadeProductos_.length; i++)
    {
      Html += "<tr> \n";    
      Html += "<td>" + (i+1) + "</td>\n";
      Html += "<td>" + ListadeProductos_[i].nombre + "</td>\n";
      
      Html += "<td>\n"
      Html += "<img\n";
      Html += "src=\"" + ListadeProductos_[i].imagen + "\"\n";
      Html += "alt=\"...\"\n";
      Html += "class=\"img-fluid\"\n";
      Html += "style=\"width: auto; height: auto; max-height: 100px\"\n";
      Html += "/>\n";
      Html += "</td>\n";

      Html += "<td>\n";
      Html += "<select id=\"" + this.Select_ + this.AgregarCategoriaProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\">\n";
      for(var j=0; j<ListadeCategorias_.length; j++)
      { 
        Html += "<option value=\"" + ListadeCategorias_[j].id_categoria + "\">" + ListadeCategorias_[j].nombre + "</option> \n"; 
      }
      Html += "</select>\n";
      Html += "<td>\n";

      Html += "<td>\n";
      Html += "<button id=\"" + this.AgregarCategoriaProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\" class=\"btn btn-success\" ";
      Html += "(click)=\"AgregarCategoriaProducto(\"" + this.AgregarCategoriaProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\")\">Agregar</button>\n";
      Html += "</td>\n";
      
      /*Html += "<td>\n";
      Html += "<select id=\"" + this.Select_ + this.EliminarCategoriaProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\">\n";
      for(var j=0; j<ListadeProductos_[i].Categorias.length; j++)
      { 
        Html += "<option value=\"" + ListadeProductos_[i].Categorias[j].id_categoria + "\">" + ListadeProductos_[i].Categorias[j].nombre + "</option> \n"; 
      }
      Html += "</select>\n";
      Html += "</td>\n";

      Html += "<td>\n";
      Html += "<button id=\"" + this.EliminarCategoriaProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\" class=\"btn btn-danger\" ";
      Html += "(click)=\"EliminarCategoriaProducto(\"" + this.EliminarCategoriaProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\")\">Eliminar</button>\n";
      Html += "</td>\n";*/

      Html += "</tr>\n\n";
    }
    
    var Div_Tabla_Productos = <HTMLInputElement>document.getElementById("Div_Tabla_Productos");
    Div_Tabla_Productos.innerHTML = Encabezado + Html + Pie;

    for(var i=0; i<ListadeProductos_.length; i++)
    {
      //Agregar Categoria Producto
      var a = <HTMLInputElement>document.getElementById(String(this.AgregarCategoriaProducto_) + String(this.Separador_) + String(ListadeProductos_[i].id_producto));
      a.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.AgregarCategoriaProducto(id);
      });
      //Eliminar Departamento
      /*var a = <HTMLInputElement>document.getElementById(String(this.EliminarCategoriaProducto_) + String(this.Separador_) + String(ListadeProductos_[i].id_producto));
      a.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EliminarCategoriaProducto(id);
      });*/
    }
  }


  //Agregar Categoria Producto-------------------------------------------------------------------------------

  AgregarCategoriaProducto = async (AgregarCategoriaProducto_e_id: any) => {//void
    var split_AgregarCategoriaProducto_e_id = AgregarCategoriaProducto_e_id.split(this.Separador_);
    var id_producto = split_AgregarCategoriaProducto_e_id[1];

    var id_categoria = <HTMLInputElement>document.getElementById(String(this.Select_) + String(this.AgregarCategoriaProducto_) + String(this.Separador_) + String(id_producto))

    if(id_categoria.value!=null && id_categoria.value!="")
    {
      await this.http.post(this.constantes.URL_BASE + "producto/categorias/add",
      {
        id_producto: id_producto,
        id_categoria: id_categoria.value
      }
      ).subscribe( data => this.ExitoalAgregarCategoriaProducto(data), err => this.ErroralAgregarCategoriaProducto(err) );
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Se debe de tener selecciona alguan categoría", 3000); }
  }

  ExitoalAgregarCategoriaProducto = async (Exito: any) => {//void
    console.log(Exito);
    this.constantes.DesplegarMensajeTemporaldeExito("Categoria agregada al producto con éxito", 3000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
  
  ErroralAgregarCategoriaProducto = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Categoria no agregada al producto", 3000);
  }


  //Eliminar Categoria Producto-------------------------------------------------------------------------------

  EliminarCategoriaProducto = async (EliminarCategoriaProducto_e_id: any) => {//void
    var split_EliminarCategoriaProducto_e_id = EliminarCategoriaProducto_e_id.split(this.Separador_);
    var id_producto = split_EliminarCategoriaProducto_e_id[1];
    console.log(id_producto);
    /*await this.http.post(this.constantes.URL_BASE + "producto/borrar",
    {
      id_producto: id_producto
    }
    ).subscribe( data => this.ExitoalEliminarProducto(data), err => this.ErroralEliminarProducto(err) );*/
  }

  /*ExitoalEliminarProducto = async (Exito: any) => {//void
    console.log(Exito);
    this.constantes.DesplegarMensajeTemporaldeExito("Producto eliminado con éxito", 3000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
  
  ErroralEliminarProducto = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Producto no eliminado", 3000);
  }*/


}
