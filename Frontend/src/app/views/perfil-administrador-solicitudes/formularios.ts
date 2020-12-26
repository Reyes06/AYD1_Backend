export class formularios
{
    id_formulario:string;
    nombre_tienda:string;
    logo:string;
    direccion:string;
    estado:string;
    usuario_nombre:string;
    usuario_apellido:string;
    usuario_sexo:string;
    usuario_fecha_nacimiento:string;
    usuario_correo_electronico:string;


    constructor(id_formulario: any, nombre_tienda: any, logo: any, direccion: any, estado: any, usuario_nombre: any, usuario_apellido: any, usuario_sexo: any, usuario_fecha_nacimiento: any, usuario_correo_electronico: any){
        this.id_formulario = id_formulario;
        this.nombre_tienda = nombre_tienda;
        this.logo = logo;
        this.direccion = direccion;
        this.estado = estado;
        this.usuario_nombre = usuario_nombre;
        this.usuario_apellido = usuario_apellido;
        this.usuario_sexo = usuario_sexo;
        this.usuario_fecha_nacimiento = usuario_fecha_nacimiento;
        this.usuario_correo_electronico = usuario_correo_electronico;
    }


}