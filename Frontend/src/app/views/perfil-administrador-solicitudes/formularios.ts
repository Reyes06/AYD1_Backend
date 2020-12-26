export class formularios
{
    id_formulario:string;
    nombre:string;
    logo:string;
    direccion:string;
    estado:string;
    usuario_id_usuario:string;
    municipio_id_municipio:string;
    sector_id_sector:string;


    constructor(id_formulario: any, nombre: any, logo: any, direccion: any, estado: any, usuario_id_usuario: any, municipio_id_municipio: any, sector_id_sector: any){
        this.id_formulario = id_formulario;
        this.nombre = nombre;
        this.logo = logo;
        this.direccion = direccion;
        this.estado = estado;
        this.usuario_id_usuario = usuario_id_usuario;
        this.municipio_id_municipio = municipio_id_municipio;
        this.sector_id_sector = sector_id_sector;
    }


}