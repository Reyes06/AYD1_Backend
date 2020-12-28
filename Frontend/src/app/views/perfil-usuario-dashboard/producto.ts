export class producto
{
    id_producto:string;
    nombre:string;
    descripcion:string;
    departamento:string;


    constructor(id_producto: any, nombre: any, descripcion: any, departamento: any){
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.departamento = departamento;
    }


}