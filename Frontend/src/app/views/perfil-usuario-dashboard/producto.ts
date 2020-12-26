export class producto
{
    id_producto:string;
    nombre:string;
    descripcion:string;
    imagen:string;
    categoria:string;


    constructor(id_producto: any, nombre: any, descripcion: any, imagen: any, categoria: any){
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.categoria = categoria;
    }


}