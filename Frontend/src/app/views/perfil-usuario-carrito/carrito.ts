export class carrito
{
    id_producto:string;
    nombre_producto:string;
    descripcion:string;
    imagen:string;
    nombre_depto:string;
    precio:string;
    cantidad:string;
    inventario:string;
    nombre_tienda:string;


    constructor(id_producto: any, nombre_producto: any, descripcion: any, imagen: any, nombre_depto: any, precio: any, cantidad:any, inventario: any, nombre_tienda: any){
        this.id_producto = id_producto;
        this.nombre_producto = nombre_producto;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.nombre_depto = nombre_depto;
        this.precio = precio;
        this.cantidad = cantidad;
        this.inventario = inventario;
        this.nombre_tienda = nombre_tienda;
    }


}