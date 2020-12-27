import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';

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


  photoSelected: any;//string | ArrayBuffer;
  file: File;


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
        var ID_Producto = <HTMLInputElement>document.getElementById("form_id_producto");
        ID_Producto.value = "";
        await this.CargarTienda();  
      }
      else if(tipo_usuario==="3")//Usuario
      { await this.router.navigate(['perfil-usuario']);  }
    }
    else
    { await this.router.navigate(['login']); }
    
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
      await this.CargarDepartamentos(id_tienda);
      await this.constantes.sleep(3000);
      await this.CargarProductos(this.ListadeIDsDepartamentos);
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
      console.log(ListadeProductos);
      await this.CargarProductosAux(ListadeProductos);
    }
  
    ExitoalCargarProductos = async (Exito: any, ListadeProductos: any) => {//void
      var Productos = Exito.productos; 
      for(var i=0; i<ListadeProductos.length; i++)
      { ListadeProductos.push(Productos[i]); }
    }
    
    ErroralCargarProductos = async (Error: any) => {//void
        console.log(Error); /*await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Productos de la Tienda no cargados", 3000);*/
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
      Html += "<td>" + "Productos[i].imagen" + "</td>\n";
      Html += "<td>0</td>\n";

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
        var c = <HTMLInputElement>document.getElementById(Productos[i].id_producto + ",EditarInventario");
        c.addEventListener("click", (evt) => {
          const element = evt.target as HTMLInputElement;    
          var id = element.id;
          this.EditarInventario(id);
        });
      }
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
    this.constantes.DesplegarMensajeTemporaldeExito("Producto eliminado con éxito", 2000);
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
      var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
      if(ClaseVerificarCredenciales.CredencialesExisten==true)
      {
        var tipo_usuario = localStorage.getItem('tipo_usuario')
  
        if(tipo_usuario==="1")//Administrador
        {await this.router.navigate(['perfil-administrador']); }
        else if(tipo_usuario==="2")//Tienda
        { await this.AgregarProductoAux();  }
        else if(tipo_usuario==="3")//Usuario
        { await this.router.navigate(['perfil-usuario']);  }
      }
      else
      { await this.router.navigate(['login']); }
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 4000); }
    
  }
    //Agregar Producto, Último Paso-----------------------------------------------------------------------------------------
  
    AgregarProductoAux = async () => {//void

      var nombre = <HTMLInputElement>document.getElementById("form_nombre");
      var descripcion = <HTMLInputElement>document.getElementById("form_descripcion");
      var id_depto = <HTMLInputElement>document.getElementById("id_departamento");
      console.log("ya voy por agregar producto aux");
      await this.http.post(this.constantes.URL_BASE + "producto/nuevo",
      { nombre: nombre.value, descripcion: descripcion.value, id_depto: id_depto.value, imagen: this.photoSelected}
      ).subscribe( data => this.ExitoalAgregarProducto(data), err => this.ErroralAgregarProducto(err) );
      
    }
  
    ExitoalAgregarProducto = async (Exito: any) => {//void
      console.log(Exito);
      await this.constantes.DesplegarMensajePermantendeExito("Producto agregado con éxito", "");
      await this.CargarDatosPagina();
    }
    
    ErroralAgregarProducto = async (Error: any) => {//void
        console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Producto no agregado", 3000);
    }


    //Editar Producto-------------------------------------------------------------------------------

    EditarProducto = async (id_producto: any) => {//void
      console.log(id_producto);
    }


    //Editar Inventario-------------------------------------------------------------------------------

    EditarInventario = async (id_producto: any) => {//void
      console.log(id_producto);
    }


}