import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { Departamento } from './Departamento';
import { Producto } from './Producto';
import { CargarProductos } from './CargarProductos';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-perfil-tienda-administrar-productos',
  templateUrl: './perfil-tienda-administrar-productos.component.html',
  styleUrls: ['./perfil-tienda-administrar-productos.component.scss']
})
export class PerfilTiendaAdministrarProductosComponent implements OnInit {


  Separador_: String = "●▲";
  EditarProducto_: String = "EditarProducto";
  EliminarProducto_: String = "EliminarProducto";


  ListadeProductos: Producto[] = [];
  ListadeDepartamentos: Departamento[] = [];


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
    //Obtener Productos de la Tienda
    await this.ObtenerProductosdelaTienda();
    await this.constantes.sleep(3000);
    //Cargar Productos de la Tienda
    await this.CargarProductosdelaTienda(this.ListadeProductos, this.ListadeDepartamentos, this.EditarProducto_photoSelected, Number(this.EditarProductoID));
    //Obtener Departamentos de la Tienda
    await this.ObtenerDepartamentosdelaTienda();
    await this.constantes.sleep(3000);
    //Cargar Departamentos de la Tienda
    await this.CargarDepartamentosdelaTienda(this.ListadeDepartamentos);
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

  EditarProducto_onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.EditarProducto_file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = _e => this.EditarProducto_photoSelected = reader.result;
      reader.readAsDataURL(this.EditarProducto_file);
    }
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
    { this.ListadeProductos.push( new Producto(Productos[i].id_producto, Productos[i].nombre, Productos[i].descripcion, Productos[i].precio, Productos[i].cantidad_inventario, Productos[i].id_departamento, Productos[i].nombre_departamento, Productos[i].imagen) ); }
  }
    
  ErroralObtenerProductosdelaTienda = async (Error: any) => {//void
    console.log(Error); 
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Productos de la Tienda no cargados", 3000);
  }


  //Cargar Productos de la Tienda-----------------------------------------------------------------------------------------
  
  CargarProductosdelaTienda = async (ListadeProductos_: Producto[], ListadeDepartamentos_: Departamento[], EditarProducto_photoSelected_: any, EditarProductoID_: number) => {//void
    
    var cargarProductos: CargarProductos = new CargarProductos();
    cargarProductos.CambiarHtml_ProductosdelaTienda(ListadeProductos_, ListadeDepartamentos_, EditarProducto_photoSelected_, EditarProductoID_);

    for(var i=0; i<ListadeProductos_.length; i++)
    {
      //Editar Producto
      var a = <HTMLInputElement>document.getElementById(String(this.EditarProducto_) + String(this.Separador_) + String(ListadeProductos_[i].id_producto));
      a.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EditarProducto(id);
      });
      //Eliminar Departamento
      var a = <HTMLInputElement>document.getElementById(String(this.EliminarProducto_) + String(this.Separador_) + String(ListadeProductos_[i].id_producto));
      a.addEventListener("click", (evt) => {
        const element = evt.target as HTMLInputElement;    
        var id = element.id;
        this.EliminarProducto(id);
      });
    }
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
    var Html_ = "";
    for(var i=0; i<ListadeDepartamentos_.length; i++)
    {
      Html_ += "<option value=" + ListadeDepartamentos_[i].id_depto + ">" + ListadeDepartamentos_[i].nombre + "</option> \n"; 
    }
    var id_departamento = <HTMLInputElement>document.getElementById("form_id_departamento");
    id_departamento.innerHTML = Html_;
    var EditarProducto_id_departamento = <HTMLInputElement>document.getElementById("EditarProducto_form_id_departamento");
    EditarProducto_id_departamento.innerHTML = Html_;
  }


  //Eliminar Producto-------------------------------------------------------------------------------

  EliminarProducto = async (EliminarProducto_e_id: any) => {//void
    var split_EliminarProducto_e_id = EliminarProducto_e_id.split(this.Separador_);
    var id_producto = split_EliminarProducto_e_id[1];

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
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Producto no eliminado", 3000);
  }


  //Agregar Producto-------------------------------------------------------------------------------
  AgregarProducto = async () => {//void
    var nombre = <HTMLInputElement>document.getElementById("form_nombre");
    var descripcion = <HTMLInputElement>document.getElementById("form_descripcion");
    var precio = <HTMLInputElement>document.getElementById("form_precio");
    var cantidad_inventario = <HTMLInputElement>document.getElementById("form_cantidad_inventario");
    var id_depto = <HTMLInputElement>document.getElementById("form_id_departamento");

    if(nombre.value!=null && nombre.value!="" && descripcion.value!=null && descripcion.value!="" 
    && precio.value!=null && precio.value!="" && cantidad_inventario.value!=null && cantidad_inventario.value!="" 
    && id_depto.value!=null && id_depto.value!="" && this.photoSelected!=null)
    {
      if((Number(precio.value))>=0)
      {
        if( cantidad_inventario.value.includes(".")==false && (Number(cantidad_inventario.value))>=0 )
        {
          await this.http.post(this.constantes.URL_BASE + "producto/nuevo",
          { nombre: nombre.value, descripcion: descripcion.value, precio: precio.value, cantidad_inventario: cantidad_inventario.value, id_depto: id_depto.value, imagen: this.photoSelected}
          ).subscribe( data => this.ExitoalAgregarProducto(data), err => this.ErroralAgregarProducto(err) );
        }
        else
        { this.constantes.DesplegarMensajeTemporaldeError("La Cantidad Inventario debe ser entero y mayor o igual 0", 3000); }
      }
      else
      { this.constantes.DesplegarMensajeTemporaldeError("El Precio debe ser mayor o igual 0", 3000); }
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 3000); }
  }
  
  ExitoalAgregarProducto = async (Exito: any) => {//void
    console.log(Exito);
    var nombre = <HTMLInputElement>document.getElementById("form_nombre");
    var descripcion = <HTMLInputElement>document.getElementById("form_descripcion");
    var precio = <HTMLInputElement>document.getElementById("form_precio");
    var cantidad_inventario = <HTMLInputElement>document.getElementById("form_cantidad_inventario");
    var id_depto = <HTMLSelectElement>document.getElementById("form_id_departamento");
    nombre.value = "";
    descripcion.value = "";
    precio.value = "";
    cantidad_inventario.value = "";
    if(this.ListadeDepartamentos.length>0)
    {
      var option_id_depto = <HTMLOptionElement>id_depto.options.item(0);
      option_id_depto.selected = true;      
    }
    this.photoSelected = null;
    //this.file = null;
    await this.constantes.DesplegarMensajePermantendeExito("Producto agregado con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
    
  ErroralAgregarProducto = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Producto no agregado", 3000);
  }


  //Editar Producto-------------------------------------------------------------------------------

  EditarProducto = async (EditarProducto_e_id: any) => {//void
    var split_EditarProducto_e_id = EditarProducto_e_id.split(this.Separador_);
    var id_producto = split_EditarProducto_e_id[1];
    
    if(id_producto != this.EditarProductoID)
    { 
      this.EditarProductoID = id_producto;
    }
    else if(id_producto == this.EditarProductoID)
    { this.EditarProductoID = "-1"; }
    else if( Number(this.EditarProductoID) >= 0 )
    { this.EditarProductoID = "-1"; }
    else if( Number(this.EditarProductoID) < 0 )
    { 
      this.EditarProductoID = id_producto;
    }
    else
    { this.EditarProductoID = "-1"; }
    
    await this.CargarProductosdelaTienda(this.ListadeProductos, this.ListadeDepartamentos, this.EditarProducto_photoSelected, Number(this.EditarProductoID));

    if( this.EditarProductoID != "-1" ){
      for(var i=0; i<this.ListadeProductos.length; i++)
      { 
        if(this.ListadeProductos[i].id_producto == String(this.EditarProductoID))
        {
          this.EditarProducto_photoSelected = this.ListadeProductos[i].imagen;
          i = this.ListadeProductos.length;
        }
      }
    }

  }

  EditarProductoAux = async () => {//void
    var nombre = <HTMLInputElement>document.getElementById("EditarProducto_form_nombre");
    var descripcion = <HTMLInputElement>document.getElementById("EditarProducto_form_descripcion");
    var precio = <HTMLInputElement>document.getElementById("EditarProducto_form_precio");
    var cantidad_inventario = <HTMLInputElement>document.getElementById("EditarProducto_form_cantidad_inventario");
    var id_depto = <HTMLSelectElement>document.getElementById("EditarProducto_form_id_departamento");

    if(nombre.value!=null && nombre.value!="" && descripcion.value!=null && descripcion.value!="" 
    && precio.value!=null && precio.value!="" && cantidad_inventario.value!=null && cantidad_inventario.value!="" 
    && id_depto.value!=null && id_depto.value!="" && this.EditarProducto_photoSelected!=null)
    {
      if((Number(precio.value))>=0)
      {
        if( cantidad_inventario.value.includes(".")==false && (Number(cantidad_inventario.value))>=0 )
        {
          await this.http.post(this.constantes.URL_BASE + "producto/update",
          { nombre: nombre.value, descripcion: descripcion.value, precio: precio.value, cantidad_inventario: cantidad_inventario.value, id_depto: id_depto.value, imagen: this.EditarProducto_photoSelected, id_producto: this.EditarProductoID}
          ).subscribe( data => this.ExitoalEditarProductoAux(data), err => this.ErroralEditarProductoAux(err) );
        }
        else
        { this.constantes.DesplegarMensajeTemporaldeError("La Cantidad Inventario debe ser entero y mayor o igual 0", 3000); }
      }
      else
      { this.constantes.DesplegarMensajeTemporaldeError("El Precio debe ser mayor o igual 0", 3000); }
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 3000); }
  }
  
  ExitoalEditarProductoAux = async (Exito: any) => {//void
    console.log(Exito);
    this.EditarProductoID = "-1";
    this.EditarProducto_photoSelected = null;
    //this.EditarProducto_file = null;
    await this.constantes.DesplegarMensajePermantendeExito("Producto editado con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();
  }
      
  ErroralEditarProductoAux = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Producto no editado", 3000);
  }


}