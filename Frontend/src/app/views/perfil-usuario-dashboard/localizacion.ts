export class localizacion
{
    id_municipio:string;
    municipio:string;
    departamento:string;
    pais:string;


    constructor(id_municipio: any, municipio: any, departamento: any, pais: any){
        this.id_municipio = id_municipio;
        this.municipio = municipio;
        this.departamento = departamento;
        this.pais = pais;
    }


}