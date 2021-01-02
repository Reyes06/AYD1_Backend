import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-registrar-tienda',
  templateUrl: './registrar-tienda.component.html',
  styleUrls: ['./registrar-tienda.component.scss']
})
export class RegistrarTiendaComponent implements OnInit {


  photoSelected: any;//string | ArrayBuffer;
  file: File;


  constructor(private router: Router, private http: HttpClient, private constantes: ConstantesService) 
  { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }

  CargarDatosPagina = async () => {//void
    await this.CargarPaises();
    await this.constantes.sleep(3000);
    await this.CargarSectores();
  }


  //Países-----------------------------------------------------------------------------------------

  CargarPaises = async () => {//void
    //Borro lista de paises actual
    var id_pais = <HTMLInputElement>document.getElementById("id_pais");
    id_pais.innerHTML = "";
    //Borro lista de departamentos actual
    var id_departamento = <HTMLInputElement>document.getElementById("id_departamento");
    id_departamento.innerHTML = "";
    //Borro lista de municipios actual
    var id_municipio = <HTMLInputElement>document.getElementById("id_municipio");
    id_municipio.innerHTML = "";
    //Obtengo países y agrego la nueva lista de países
    await this.http.get(this.constantes.URL_BASE + "direccion/pais"
    ).subscribe( data => this.ExitoalCargarPaises(data), err => this.ErroralCargarPaises(err) );
  }

  ExitoalCargarPaises = async (Exito: any) => {//void
    //Agrego la nueva lista de países
    var Html_ = "";
    for(var i=0; i<Exito.length; i++)
    { Html_ += "<option value=" + Exito[i].id_pais + ">" + Exito[i].nombre + "</option> \n"; }
    var id_pais = <HTMLInputElement>document.getElementById("id_pais");
    id_pais.innerHTML = Html_;
    //Cargamos Departamentos
    await this.CargarDepartamentos(id_pais.value);
  }
  
  ErroralCargarPaises = async (Error: any) => {//void
      console.log(Error);
      await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, lista de Países no cargada", 3000);
  }

  on_id_pais = async () => {//void
    var id_pais = <HTMLInputElement>document.getElementById("id_pais");
    //Cargamos Departamentos
    await this.CargarDepartamentos(id_pais.value);
  }


  //Departamentos----------------------------------------------------------------------------------

  CargarDepartamentos = async (id_pais: any) => {//void
    //Borro lista de departamentos actual
    var id_departamento = <HTMLInputElement>document.getElementById("id_departamento");
    id_departamento.innerHTML = "";
    //Borro lista de municipios actual
    var id_municipio = <HTMLInputElement>document.getElementById("id_municipio");
    id_municipio.innerHTML = "";
    //Obtengo departamentos y agrego la nueva lista de departamentos
    await this.http.get(this.constantes.URL_BASE + "direccion/departamentos/" + id_pais
    ).subscribe( data => this.ExitoalCargarDepartamentos(data), err => this.ErroralCargarDepartamentos(err) );
  }

  ExitoalCargarDepartamentos = async (Exito: any) => {//void
    //Agrego la nueva lista de departamentos
    var Html_ = "";
    for(var i=0; i<Exito.length; i++)
    { Html_ += "<option value=" + Exito[i].id_depto + ">" + Exito[i].nombre + "</option> \n"; }
    var id_departamento = <HTMLInputElement>document.getElementById("id_departamento");
    id_departamento.innerHTML = Html_;
    //Cargamos Municipios
    await this.CargarMunicipios(id_departamento.value);
  }
  
  ErroralCargarDepartamentos = async (Error: any) => {//void
      console.log(Error);
      await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, lista de Departamentos no cargada", 3000);
  }

  on_id_departamento = async () => {//void
    var id_departamento = <HTMLInputElement>document.getElementById("id_departamento");
    //Cargamos Municipios
    await this.CargarMunicipios(id_departamento.value);
  }


  //Municipios-------------------------------------------------------------------------------------

  CargarMunicipios = async (id_departamento: any) => {//void
    //Borro lista de municipios actual
    var id_municipio = <HTMLInputElement>document.getElementById("id_municipio");
    id_municipio.innerHTML = "";
    //Obtengo municipios y agrego la nueva lista de municipio
    await this.http.get(this.constantes.URL_BASE + "direccion/municipios/" + id_departamento
    ).subscribe( data => this.ExitoalCargarMunicipios(data), err => this.ErroralCargarMunicipios(err) );
  }

  ExitoalCargarMunicipios = async (Exito: any) => {//void
    //Agrego la nueva lista de municipios
    var Html_ = "";
    for(var i=0; i<Exito.length; i++)
    { Html_ += "<option value=" + Exito[i].id_municipio + ">" + Exito[i].nombre + "</option> \n"; }
    var id_municipio = <HTMLInputElement>document.getElementById("id_municipio");
    id_municipio.innerHTML = Html_;
  }
  
  ErroralCargarMunicipios = async (Error: any) => {//void
      console.log(Error);
      await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, lista de Municipios no cargada", 3000);
  }

  on_id_municipio = async () => {//void
    
  }

  //Sectores---------------------------------------------------------------------------------------

  CargarSectores = async () => {//void
    await this.http.get(this.constantes.URL_BASE + "sector"
    ).subscribe( data => this.ExitoalCargarSectores(data), err => this.ErroralCargarSectores(err) );
  }

  ExitoalCargarSectores = async (Exito: any) => {//void
    var Html_ = "";
    for(var i=0; i<Exito.length; i++)
    { Html_ += "<option value=" + Exito[i].id_sector + ">" + Exito[i].nombre + "</option> \n"; }
    var id_municipio = <HTMLInputElement>document.getElementById("id_sector");
    id_municipio.innerHTML = Html_;
  }
  
  ErroralCargarSectores = async (Error: any) => {//void
      console.log(Error);
      await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, lista de Sectores no cargada", 3000);
  }


  //Logo-------------------------------------------------------------------------------------------

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = _e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }


  //Registrar Tienda-------------------------------------------------------------------------------

  RegistrarTienda = async () => {//void
    var nombre = <HTMLInputElement>document.getElementById("form_nombre");
    var apellido = <HTMLInputElement>document.getElementById("form_apellido");
    var fecha_de_nacimiento = <HTMLInputElement>document.getElementById("form_fecha_de_nacimiento");
    var correo = <HTMLInputElement>document.getElementById("form_correo_electronico");
    var contrasena = <HTMLInputElement>document.getElementById("form_contrasena");
    var nombre_tienda = <HTMLInputElement>document.getElementById("form_nombre_tienda");
    var id_pais = <HTMLInputElement>document.getElementById("id_pais");
    var id_departamento = <HTMLInputElement>document.getElementById("id_departamento");
    var id_municipio = <HTMLInputElement>document.getElementById("id_municipio");
    var direccion = <HTMLInputElement>document.getElementById("form_direccion");
    var id_sector = <HTMLInputElement>document.getElementById("id_sector");
    var TerminosyCondiciones = <HTMLInputElement>document.getElementById("TerminosyCondiciones");

    if(nombre.value!=null && nombre.value!="" && apellido.value!=null && apellido.value!="" 
    && fecha_de_nacimiento.value!=null && fecha_de_nacimiento.value!=""
    && correo.value!=null && correo.value!="" && contrasena.value!=null && contrasena.value!="" 
    && nombre_tienda.value!=null && nombre_tienda.value!="" && id_pais.value!=null && id_pais.value!="" 
    && id_departamento.value!=null && id_departamento.value!="" 
    && id_municipio.value!=null && id_municipio.value!="" && direccion.value!=null && direccion.value!="" 
    && id_sector.value!=null && id_sector.value!="" && this.photoSelected!=null)
    {
      if(TerminosyCondiciones.checked == true)
      {
        await this.http.post(this.constantes.URL_BASE + "formulario/nuevo",
        { usuario_nombre: nombre.value, usuario_apellido: apellido.value, usuario_fecha_nacimiento: fecha_de_nacimiento.value, usuario_correo_electronico: correo.value, usuario_password: contrasena.value, nombre_tienda: nombre_tienda.value, id_municipio: id_municipio.value, direccion: direccion.value, id_sector: id_sector.value, logo: this.photoSelected}
        ).subscribe( data => this.ExitoalRegistrarTienda(data), err => this.ErroralRegistrarTienda(err) );
      }
      else
      { this.constantes.DesplegarMensajeTemporaldeError("Para registrarse debe de aceptar los términos y condiciones", 4000); }
    }
    else
    { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 3000); }
  
    return false;
  }  

  ExitoalRegistrarTienda = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Formulario Enviado con Éxito", "Te contactaremos lo más pronto posible");  
    await this.router.navigate(['login']);
  }
    
  ErroralRegistrarTienda = async (Error: any) => {//void
      console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 3000);
  }


}