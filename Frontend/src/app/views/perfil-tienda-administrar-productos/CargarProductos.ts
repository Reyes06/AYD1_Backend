import { Departamento } from './Departamento';
import { Producto } from './Producto';

export class CargarProductos {


    Separador_: String = "●▲";
    EditarProducto_: String = "EditarProducto";
    EliminarProducto_: String = "EliminarProducto";


    public CambiarHtml_ProductosdelaTienda(ListadeProductos_: Producto[], ListadeDepartamentos_: Departamento[], EditarProducto_photoSelected_: any, EditarProductoID_: number): void {
        
        if(EditarProductoID_>=0)
        {
            this.CambiarHtml_ProductosdelaTienda_EditarProductoActivo(ListadeProductos_, ListadeDepartamentos_, EditarProducto_photoSelected_, EditarProductoID_);
            var Div_Editar_Producto = <HTMLInputElement>document.getElementById("Div_Editar_Producto");
            Div_Editar_Producto.style.display = "block";
        }
        else
        {
            this.CargarProductosdelaTienda_EditarProductoInactivo(ListadeProductos_);
            var Div_Tabla_Productos_Dos = <HTMLInputElement>document.getElementById("Div_Tabla_Productos_Dos");
            Div_Tabla_Productos_Dos.innerHTML = "";
            var Div_Editar_Producto = <HTMLInputElement>document.getElementById("Div_Editar_Producto");
            Div_Editar_Producto.style.display = "none";
            EditarProducto_photoSelected_ = null;
        }
    }


    private CambiarHtml_ProductosdelaTienda_EditarProductoActivo(ListadeProductos_: Producto[], ListadeDepartamentos_: Departamento[], EditarProducto_photoSelected: any, EditarProductoID_: number): void {
        var tope: number = this.CambiarHtml_ProductosdelaTienda_EditarProductoActivo_ParteUno(ListadeProductos_, EditarProductoID_);
        this.CambiarHtml_ProductosdelaTienda_EditarProductoActivo_ParteTres(ListadeProductos_, tope);
        this.CambiarHtml_ProductosdelaTienda_EditarProductoActivo_ParteDos(ListadeProductos_, ListadeDepartamentos_, EditarProducto_photoSelected, EditarProductoID_);
    }


    private CargarProductosdelaTienda_EditarProductoInactivo(ListadeProductos_: Producto[]): void {//void    
        var Html = "";
        var Encabezado = "\n\n<table class=\"table\">\n\n";
        Encabezado += "<thead class=\"mdb-color darken-3\">\n";
        Encabezado += "<tr class=\"text-white\">\n";
        Encabezado += "<th>Número</th>\n";
        Encabezado += "<th>Nombre</th>\n";
        Encabezado += "<th>Descripción</th>\n";
        Encabezado += "<th>Precio</th>\n";
        Encabezado += "<th>Cantidad Inventario</th>\n";
        Encabezado += "<th>Departamento</th>\n";
        Encabezado += "<th>Imagen</th>\n";
        Encabezado += "<th></th>\n";
        Encabezado += "<th></th>\n";
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
          Html += "<td>" + ListadeProductos_[i].descripcion + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].precio + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].cantidad_inventario + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].nombre_departamento + "</td>\n";
          Html += "<td>\n"
          Html += "<img\n";
          Html += "src=\"" + ListadeProductos_[i].imagen + "\"\n";
          Html += "alt=\"...\"\n";
          Html += "class=\"img-fluid\"\n";
          Html += "style=\"width: auto; height: auto; max-height: 100px\"\n";
          Html += "/>\n";
          Html += "</td>\n"
          Html += "<td>\n";
          Html += "<button id=\"" + this.EditarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\" class=\"btn btn-info\" ";
          Html += "(click)=\"EditarProducto(\"" + this.EditarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\")\">Editar</button>\n";
          Html += "</td>\n";
          Html += "<td>\n";
          Html += "<button id=\"" + this.EliminarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\" class=\"btn btn-danger\" ";
          Html += "(click)=\"EliminarDepartamento(\"" + this.EliminarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\")\">Eliminar</button>\n";
          Html += "</td>\n";
          Html += "</tr> \n\n";
        }
        
        var Div_Tabla_Productos = <HTMLInputElement>document.getElementById("Div_Tabla_Productos");
        Div_Tabla_Productos.innerHTML = Encabezado + Html + Pie;
    }


    private CambiarHtml_ProductosdelaTienda_EditarProductoActivo_ParteUno(ListadeProductos_: Producto[], EditarProductoID_: number): number {
        var Html = "";
        var Encabezado = "\n\n<table class=\"table\">\n\n";
        Encabezado += "<thead class=\"mdb-color darken-3\">\n";
        Encabezado += "<tr class=\"text-white\">\n";
        Encabezado += "<th>Número</th>\n";
        Encabezado += "<th>Nombre</th>\n";
        Encabezado += "<th>Descripción</th>\n";
        Encabezado += "<th>Precio</th>\n";
        Encabezado += "<th>Cantidad Inventario</th>\n";
        Encabezado += "<th>Departamento</th>\n";
        Encabezado += "<th>Imagen</th>\n";
        Encabezado += "<th></th>\n";
        Encabezado += "<th></th>\n";
        Encabezado += "</tr>\n";
        Encabezado += "</thead>\n\n"; 
        Encabezado += "<tbody> \n\n";
        
        var Pie = "</tbody>\n\n";
        Pie += "</table>\n\n";
    
        var tope: number = 0;
        for(var i=0; i<ListadeProductos_.length; i++)
        {
          Html += "<tr> \n";    
          Html += "<td>" + (i+1) + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].nombre + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].descripcion + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].precio + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].cantidad_inventario + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].nombre_departamento + "</td>\n";
          Html += "<td>\n"
          Html += "<img\n";
          Html += "src=\"" + ListadeProductos_[i].imagen + "\"\n";
          Html += "alt=\"...\"\n";
          Html += "class=\"img-fluid\"\n";
          Html += "style=\"width: auto; height: auto; max-height: 100px\"\n";
          Html += "/>\n";
          Html += "</td>\n"
          Html += "<td>\n";
          Html += "<button id=\"" + this.EditarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\" class=\"btn btn-info\" ";
          Html += "(click)=\"EditarProducto(\"" + this.EditarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\")\">Editar</button>\n";
          Html += "</td>\n";
          Html += "<td>\n";
          Html += "<button id=\"" + this.EliminarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\" class=\"btn btn-danger\" ";
          Html += "(click)=\"EliminarDepartamento(\"" + this.EliminarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\")\">Eliminar</button>\n";
          Html += "</td>\n";
          Html += "</tr> \n\n";
          if( ListadeProductos_[i].id_producto == String(EditarProductoID_) )
          {
            tope = (i+1);
            i = ListadeProductos_.length;
          }
        }
        
        var Div_Tabla_Productos = <HTMLInputElement>document.getElementById("Div_Tabla_Productos");
        Div_Tabla_Productos.innerHTML = Encabezado + Html + Pie;
    
        return tope;
    }


    private CambiarHtml_ProductosdelaTienda_EditarProductoActivo_ParteTres(ListadeProductos_: Producto[], tope_: number): void {
        var Html = "";
        var Encabezado = "\n\n<table class=\"table\">\n\n";
        Encabezado += "<thead class=\"mdb-color darken-3\">\n";
        Encabezado += "<tr class=\"text-white\">\n";
        Encabezado += "<th>Número</th>\n";
        Encabezado += "<th>Nombre</th>\n";
        Encabezado += "<th>Descripción</th>\n";
        Encabezado += "<th>Precio</th>\n";
        Encabezado += "<th>Cantidad Inventario</th>\n";
        Encabezado += "<th>Departamento</th>\n";
        Encabezado += "<th>Imagen</th>\n";
        Encabezado += "<th></th>\n";
        Encabezado += "<th></th>\n";
        Encabezado += "</tr>\n";
        Encabezado += "</thead>\n\n"; 
        Encabezado += "<tbody> \n\n";
        
        var Pie = "</tbody>\n\n";
        Pie += "</table>\n\n";
    
        for(var i=tope_; i<ListadeProductos_.length; i++)
        {
          Html += "<tr> \n";    
          Html += "<td>" + (i+1) + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].nombre + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].descripcion + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].precio + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].cantidad_inventario + "</td>\n";
          Html += "<td>" + ListadeProductos_[i].nombre_departamento + "</td>\n";
          Html += "<td>\n"
          Html += "<img\n";
          Html += "src=\"" + ListadeProductos_[i].imagen + "\"\n";
          Html += "alt=\"...\"\n";
          Html += "class=\"img-fluid\"\n";
          Html += "style=\"width: auto; height: auto; max-height: 100px\"\n";
          Html += "/>\n";
          Html += "</td>\n"
          Html += "<td>\n";
          Html += "<button id=\"" + this.EditarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\" class=\"btn btn-info\" ";
          Html += "(click)=\"EditarProducto(\"" + this.EditarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\")\">Editar</button>\n";
          Html += "</td>\n";
          Html += "<td>\n";
          Html += "<button id=\"" + this.EliminarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\" class=\"btn btn-danger\" ";
          Html += "(click)=\"EliminarDepartamento(\"" + this.EliminarProducto_ + this.Separador_ + ListadeProductos_[i].id_producto + "\")\">Eliminar</button>\n";
          Html += "</td>\n";
          Html += "</tr> \n\n";
        }
        
        var Div_Tabla_Productos_Dos = <HTMLInputElement>document.getElementById("Div_Tabla_Productos_Dos");
        Div_Tabla_Productos_Dos.innerHTML = Encabezado + Html + Pie;
    }


    private CambiarHtml_ProductosdelaTienda_EditarProductoActivo_ParteDos(ListadeProductos_: Producto[], ListadeDepartamentos_: Departamento[], EditarProducto_photoSelected_: any, EditarProductoID_: number): void {

        console.log(EditarProducto_photoSelected_);

        var nombre = <HTMLInputElement>document.getElementById("EditarProducto_form_nombre");
        var descripcion = <HTMLInputElement>document.getElementById("EditarProducto_form_descripcion");
        var precio = <HTMLInputElement>document.getElementById("EditarProducto_form_precio");
        var cantidad_inventario = <HTMLInputElement>document.getElementById("EditarProducto_form_cantidad_inventario");
        var id_depto = <HTMLSelectElement>document.getElementById("EditarProducto_form_id_departamento");

        for(var i=0; i<ListadeProductos_.length; i++)
        { 
            if(ListadeProductos_[i].id_producto == String(EditarProductoID_))
            {
                nombre.value = ListadeProductos_[i].nombre;
                descripcion.value = ListadeProductos_[i].descripcion;
                precio.value = ListadeProductos_[i].precio;
                cantidad_inventario.value = ListadeProductos_[i].cantidad_inventario;
                nombre.value = ListadeProductos_[i].nombre;
                
                for(var j=0; j<ListadeDepartamentos_.length; j++)
                {
                    if(ListadeDepartamentos_[j].id_depto == ListadeProductos_[i].id_departamento)
                    {
                        if(id_depto.options.length>j)
                        {
                            var option_id_depto = <HTMLOptionElement>id_depto.options.item(j);
                            option_id_depto.selected = true;
                        }
                        j = ListadeDepartamentos_.length;
                    }
                }

                EditarProducto_photoSelected_ = ListadeProductos_[i].imagen;
            }
        }
    
    }


}