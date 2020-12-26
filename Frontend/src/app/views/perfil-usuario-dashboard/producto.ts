export class producto
{
    id_producto:string;
    nombre:string;
    descripcion:string;
    categoria:string;


    constructor(id_producto: any, nombre: any, descripcion: any, categoria: any){
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }


}