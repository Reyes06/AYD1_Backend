export class producto
{
    id_producto:string;
    nombre:string;
    descripcion:string;
    imagen:string;
    departamento:string;
    precio:string;
    inventario:string;
    tienda:string;


    constructor(id_producto: any, nombre: any, descripcion: any, imagen: any, departamento: any, precio: any, inventario: any, tienda: any){
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.departamento = departamento;
        this.precio = precio;
        this.inventario = inventario;
        this.tienda = tienda;
    }


}