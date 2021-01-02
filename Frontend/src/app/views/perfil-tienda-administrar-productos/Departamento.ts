export class Departamento {

id_depto: String = "";
nombre: String = "";
tienda_id_tienda: String = "";

constructor(id_depto: String, nombre: String, tienda_id_tienda: String){
    this.id_depto = id_depto;
    this.nombre =  nombre;
    this.tienda_id_tienda = tienda_id_tienda;
}

}