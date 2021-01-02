import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-perfil-tienda-administrar-productos',
  templateUrl: './perfil-tienda-administrar-productos.component.html',
  styleUrls: ['./perfil-tienda-administrar-productos.component.scss']
})
export class PerfilTiendaAdministrarProductosComponent implements OnInit {


  ListadeIDsDepartamentos: any = [];
  separador: String = "ôﻶ"
  ListadeIDsProductos: any = [];


  photoSelected: any;//string | ArrayBuffer;
  file: File;


  constructor(private http: HttpClient, private constantes: ConstantesService) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  CargarDatosPagina = async () => {//void
    await this.CargarTienda();
  }


  //Imagen-------------------------------------------------------------------------------------------

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = _e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }
  
  
  //Tienda-----------------------------------------------------------------------------------------
  
  CargarTienda = async () => {//void
    var id_usuario = localStorage.getItem('id_usuario');
    await this.http.get(this.constantes.URL_BASE + "tienda/" + id_usuario
    ).subscribe( data => this.ExitoalCargarTienda(data), err => this.ErroralCargarTienda(err) );
  }
  
  ExitoalCargarTienda = async (Exito: any) => {//void
    var id_tienda = Exito.tiendas[0].id_tienda;
    this.ListadeIDsDepartamentos = [];
    this.ListadeIDsProductos = [];
    await this.CargarDepartamentos(id_tienda);
    await this.constantes.sleep(3000);
    await this.CargarProductos(this.ListadeIDsDepartamentos);
    await this.constantes.sleep(3000);
    await this.CargarInventariosdeProductos(this.ListadeIDsProductos);
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
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamentos de la Tienda no cargados", 3000);
  }

  CargarDepartamentosAux = async (Departamentos: any) => {//void
    var Html_ = "";
    for(var i=0; i<Departamentos.length; i++)
    { 
      this.ListadeIDsDepartamentos.push(Departamentos[i].id_depto);
      Html_ += "<option value=" + Departamentos[i].id_depto + ">" + Departamentos[i].nombre + "</option> \n"; 
    }
    var id_departamento = <HTMLInputElement>document.getElementById("id_departamento");
    id_departamento.innerHTML = Html_;
  }


  //Productos-----------------------------------------------------------------------------------------
  
  CargarProductos = async (ListadeIDsDepartamentos: any) => {//void
    var ListadeProductos: any = [];

    for(var i=0; i<this.ListadeIDsDepartamentos.length; i++)
    {
      await this.http.get(this.constantes.URL_BASE + "producto/" + ListadeIDsDepartamentos[i]
      ).subscribe( data => this.ExitoalCargarProductos(data, ListadeProductos), err => this.ErroralCargarProductos(err) );
      await this.constantes.sleep(1000);
    }
  
    await this.CargarProductosAux(ListadeProductos);
  }
  
  ExitoalCargarProductos = async (Exito: any, ListadeProductos: any) => {//void
    var Productos = Exito.productos; 
    for(var i=0; i<Productos.length; i++)
    { 
      ListadeProductos.push(Productos[i]);
      this.ListadeIDsProductos.push(Productos[i].id_producto)
    }
  }
    
  ErroralCargarProductos = async (Error: any) => {//void
    console.log(Error); 
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Productos de la Tienda no cargados", 3000);
  }

  CargarProductosAux = async (Productos: any) => {//void
    var Html = "";
  
    var Encabezado = "\n\n<table class=\"table\">\n\n";
    Encabezado += "<thead class=\"mdb-color darken-3\">\n";
    Encabezado += "<tr class=\"text-white\">\n";
    Encabezado += "<th>Número</th>\n";
    Encabezado += "<th>ID Producto</th>\n";
    Encabezado += "<th>Nombre</th>\n";
    Encabezado += "<th>Descripción</th>\n";
    Encabezado += "<th>Precio</th>\n";
    Encabezado += "<th>Imagen</th>\n";
    Encabezado += "<th>Inventario</th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "<th></th>\n";
    Encabezado += "</tr>\n";
    Encabezado += "</thead>\n\n"; 
    Encabezado += "<tbody> \n\n";
    
    var Pie = "</tbody>\n\n";
    Pie += "</table>\n\n";
    
    for(var i=0; i<Productos.length; i++)
    {
      Html += "<tr> \n";    
      Html += "<td>" + (i+1) + "</td>\n";
      Html += "<td>" + Productos[i].id_producto + "</td>\n";
      Html += "<td>" + Productos[i].nombre + "</td>\n";
      Html += "<td>" + Productos[i].descripcion + "</td>\n";
      Html += "<td>0.00</td>\n";
      Html += "<td>"
      Html += "<img\n";
      Html += "src=\"" + Productos[i].imagen + "\"";
      Html += "alt=\"...\"";
      Html += "class=\"img-fluid\"";
      Html += "/>";
      Html += "</td>"
      Html += "<td><input id=\"Inventario" + Productos[i].id_producto + "\" type=\"number\" min=\"1\" pattern=\"^[0-9]+\"></td>\n";
      Html += "<td>\n";
      Html += "<button id=\"" + Productos[i].id_producto + "\" class=\"btn btn-danger\" ";
      Html += "(click)=\"EliminarProducto(" + Productos[i].id_producto + ")\">Eliminar Producto</button>\n";
      Html += "</td>\n";

      var Texto_Editar_Producto = Productos[i].id_producto + this.separador;
      Texto_Editar_Producto += Productos[i].nombre + this.separador;
      Texto_Editar_Producto += Productos[i].descripcion + this.separador;
      Texto_Editar_Producto += "0.00" + this.separador;
      Texto_Editar_Producto += Productos[i].imagen;

      Html += "<td>\n";
      Html += "<button id=\"" + Texto_Editar_Producto + "\" class=\"btn btn-info\" ";
      Html += "(click)=\"EditarProducto(\"" + Texto_Editar_Producto + "\")\">Editar Producto</button>\n";
      Html += "</td>\n";

      Html += "<td>\n";
      Html += "<button id=\"" + Productos[i].id_producto + ",EditarInventario" + "\" class=\"btn btn-light\" ";
      Html += "(click)=\"EditarInventario(\"" + Productos[i].id_producto + ",EditarInventario" + "\")\">Editar Inventario</button>\n";
      Html += "</td>\n";

      Html += "</tr> \n\n";
    }
    
    var Div_Tabla_Productos = <HTMLInputElement>document.getElementById("Div_Tabla_Productos");
    Div_Tabla_Productos.innerHTML = Encabezado + Html + Pie;
      
    for(var i=0; i<Productos.length; i++)
    {
      //Eliminar Producto
      var a = <HTMLInputElement>document.getElementById(Productos[i].id_producto);
      a.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EliminarProducto(id);
      });
      //Editar Producto
      Texto_Editar_Producto = Productos[i].id_producto + this.separador;
      Texto_Editar_Producto += Productos[i].nombre + this.separador;
      Texto_Editar_Producto += Productos[i].descripcion + this.separador;
      Texto_Editar_Producto += "0.00" + this.separador;
      Texto_Editar_Producto += Productos[i].imagen;
      var b = <HTMLInputElement>document.getElementById(Texto_Editar_Producto);
      b.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EditarProducto(id);
      });
      //Editar Inventario
      var c = <HTMLInputElement>document.getElementById(Productos[i].id_producto + this.separador + "EditarInventario");
      c.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EditarInventario(id);
      });
    }
  }


  //Inventarios de Productos-----------------------------------------------------------------------------------------
  
  CargarInventariosdeProductos = async (ListadeIDsProductos: any) => {//void
    for(var i=0; i<this.ListadeIDsProductos.length; i++)
    {
      await this.http.get(this.constantes.URL_BASE + "producto/inventario/" + ListadeIDsProductos[i]
      ).subscribe( data => this.ExitoalCargarInventariosdeProductos(data), err => this.ErroralCargarInventariosdeProductos(err) );
      await this.constantes.sleep(1000);
    }
  }
  
  ExitoalCargarInventariosdeProductos = async (Exito: any) => {//void
    if( Exito.length>0 )
    {
      var Inventario_Producto = <HTMLInputElement>document.getElementById("Inventario"+Exito[0].producto_id_producto);
      Inventario_Producto.value = Exito[0].cantidad;
    }
  }
    
  ErroralCargarInventariosdeProductos = async (Error: any) => {//void
    console.log(Error); 
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Inventario de Productos de la Tienda no cargados", 3000);
  }


  //Eliminar Producto-------------------------------------------------------------------------------

  EliminarProducto = async (id_producto: any) => {//void
    await this.http.post(this.constantes.URL_BASE + "producto/borrar",
    {
      id_producto: id_producto
    }
    ).subscribe( data => this.ExitoalEliminarProducto(data), err => this.ErroralEliminarProducto(err) );
  }

  ExitoalEliminarProducto = async (Exito: any) => {//void
    console.log(Exito);
    this.constantes.DesplegarMensajeTemporaldeExito("Producto eliminado con éxito", 3000);
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
  
  ErroralEliminarProducto = async (Error: any) => {//void
      console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Producto no eliminado", 3000);
  }


  //Agregar Producto-------------------------------------------------------------------------------

  AgregarProducto = async () => {//void
    var nombre = <HTMLInputElement>document.getElementById("form_nombre");
    var descripcion = <HTMLInputElement>document.getElementById("form_descripcion");
    var precio = <HTMLInputElement>document.getElementById("form_precio");
    var id_depto = <HTMLInputElement>document.getElementById("id_departamento");

    if(nombre.value!=null && nombre.value!="" && descripcion.value!=null && descripcion.value!="" 
    && precio.value!=null && precio.value!="" && id_depto.value!=null && id_depto.value!="" && this.photoSelected!=null)
    {
      await this.AgregarProductoAux();
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 3000); } 
  }

  //Agregar Producto, Último Paso-----------------------------------------------------------------------------------------
  
  AgregarProductoAux = async () => {//void
    var nombre = <HTMLInputElement>document.getElementById("form_nombre");
    var descripcion = <HTMLInputElement>document.getElementById("form_descripcion");
    var id_depto = <HTMLInputElement>document.getElementById("id_departamento");
    await this.http.post(this.constantes.URL_BASE + "producto/nuevo",
    { nombre: nombre.value, descripcion: descripcion.value, id_depto: id_depto.value, imagen: this.photoSelected}
    ).subscribe( data => this.ExitoalAgregarProducto(data), err => this.ErroralAgregarProducto(err) );
  }
  
  ExitoalAgregarProducto = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Producto agregado con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
    
  ErroralAgregarProducto = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Producto no agregado", 3000);
  }


  //Editar Producto-------------------------------------------------------------------------------

  EditarProducto = async (datos_producto: any) => {//void
    var split_datos_producto = datos_producto.split(this.separador);
    var id_producto = split_datos_producto[0];
    var nombre = split_datos_producto[1];
    var descripcion = split_datos_producto[2];
    var precio = split_datos_producto[3];
    var imagen = split_datos_producto[4];
    console.log(imagen);
    var form_id_producto = <HTMLInputElement>document.getElementById("form_id_producto");
    form_id_producto.value = id_producto;
    var form_nombre = <HTMLInputElement>document.getElementById("form_nombre");
    form_nombre.value = nombre;
    var form_descripcion = <HTMLInputElement>document.getElementById("form_descripcion");
    form_descripcion.value = descripcion;
    var form_precio = <HTMLInputElement>document.getElementById("form_precio");
    form_precio.value = precio;
    this.photoSelected = imagen;
  }

  EditarDepartamentoAux = async () => {//void
    var id_departamento = <HTMLInputElement>document.getElementById("form_id_departamento")
    var nombre_departamento = <HTMLInputElement>document.getElementById("form_nombre_departamento")
    
    if(id_departamento.value!=null && id_departamento.value!="" && nombre_departamento.value!=null && nombre_departamento.value!="")
    {
      await this.EditarDepartamentoAuxAux(id_departamento.value, nombre_departamento.value);
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 3000); }  
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
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Departamento no editado", 3000);
  }


  //Editar Inventario-------------------------------------------------------------------------------

  EditarInventario = async (id_inventario_y_palabra: any) => {//void
    var split_id_inventario_y_palabra = id_inventario_y_palabra.split(this.separador);
    var id_inventario = split_id_inventario_y_palabra[0];
      
    var cantidad_inventario = <HTMLInputElement>document.getElementById("Inventario" + id_inventario);
      
    if(cantidad_inventario.value!=null && cantidad_inventario.value!="" && cantidad_inventario.checked==true)
    {
      await this.EditarDepartamentoAuxAux(id_inventario, cantidad_inventario);
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Inventario no válido", 3000); }    
  }
    
  EditarInventarioAux = async (id_inventario: any, cantidad_inventario: any) => {//void
    await this.http.post(this.constantes.URL_BASE + "producto/inventario",
    {
      id_producto: id_inventario, 
      nueva_cantidad: cantidad_inventario
    }
    ).subscribe( data => this.ExitoalEditarInventarioAux(data), err => this.ErroralEditarInventarioAux(err) );
  }
    
  ExitoalEditarInventarioAux = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Inventario editado con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
      
  ErroralEditarInventarioAux = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Inventario no editado", 3000);
  }


}