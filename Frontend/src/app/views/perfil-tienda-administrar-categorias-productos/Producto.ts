import { Categoria } from './Categoria';

export class Producto {

    id_producto: string = "";
    nombre: string = "";
    descripcion: string = "";
    precio: string = "";
    cantidad_inventario: string = "";
    imagen: string = "";
    id_departamento: String = "";
    nombre_departamento: String = "";
    Categorias: Categoria[] = [];

constructor(id_producto: string, nombre: string, descripcion: string, precio: string, cantidad_inventario: string, id_departamento: string, nombre_departamento: string, imagen: string, Categorias: Categoria[]){
    this.id_producto = id_producto;
    this.nombre =  nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad_inventario = cantidad_inventario;
    this.id_departamento = id_departamento;
    this.nombre_departamento = nombre_departamento;
    this.imagen = imagen;
    this.Categorias = Categorias;
}

}