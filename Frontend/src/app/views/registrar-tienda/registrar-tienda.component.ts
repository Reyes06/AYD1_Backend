import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';


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


  constructor(private router: Router, private http: HttpClient, private constantes: ConstantesService, private VerificarCredencialesService: VerificarCredencialesService) 
  { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  CargarDatosPagina = async () => {//void

    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
    if(ClaseVerificarCredenciales.CredencialesExisten==true)
    {
      var tipo_usuario = localStorage.getItem('tipo_usuario')

      if(tipo_usuario==="0")//Administrador
      { await this.router.navigate(['perfil-administrador']);  }
      else if(tipo_usuario==="1")//Tienda
      { await this.router.navigate(['perfil-tienda']);  }
      else if(tipo_usuario==="2")//Usuario
      { await this.router.navigate(['perfil-usuario']);  }
  
    }
    
  }


  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = _e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }


  RegistrarTienda = async () => {//void
    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();

    if(ClaseVerificarCredenciales.CredencialesExisten==true)
    { 
      await this.constantes.DesplegarMensajeTemporaldeError("Sesión ya Iniciada", 2000); await this.router.navigate(['dashboards/v1']); 

      var tipo_usuario = localStorage.getItem('tipo_usuario')
        
      if(tipo_usuario==="0")//Administrador
      { await this.router.navigate(['perfil-administrador']);  }
      else if(tipo_usuario==="1")//Tienda
      { await this.router.navigate(['perfil-tienda']);  }
      else if(tipo_usuario==="2")//Usuario
      { await this.router.navigate(['perfil-usuario']);  }
      else
      { this.constantes.DesplegarMensajeTemporaldeError("Algo ha salido mal. Vuelve a Intentarlo", 2000); }
    }
    else 
    {
      var nombre = <HTMLInputElement>document.getElementById("form_nombre");
      var apellido = <HTMLInputElement>document.getElementById("form_apellido");
      var fecha_de_nacimiento = <HTMLInputElement>document.getElementById("form_fecha_de_nacimiento");
      var correo = <HTMLInputElement>document.getElementById("form_correo_electronico");
      var sexoFemenino = <HTMLInputElement>document.getElementById("form_sexo_femenino");
      var sexoMasculino = <HTMLInputElement>document.getElementById("form_sexo_masculino");
      var sexo = null;
      if(sexoFemenino.checked){
        sexo = "F";
      }
      else if(sexoMasculino.checked){
        sexo = "M";
      }
      var id_sector = <HTMLInputElement>document.getElementById("id_sector");
      var nombre_de_la_tienda = <HTMLInputElement>document.getElementById("form_nombre_de_la_tienda");
      var TerminosyCondiciones = <HTMLInputElement>document.getElementById("TerminosyCondiciones");

      if(nombre.value!=null && nombre.value!="" && apellido.value!=null && apellido.value!="" 
      && fecha_de_nacimiento.value!=null && fecha_de_nacimiento.value!=""
      && correo.value!=null && correo.value!="" && (sexoFemenino.checked!=true || sexoFemenino.checked==true) 
      && sexo!=null && sexo!="" && id_sector.value!=null && id_sector.value!="" 
      && nombre_de_la_tienda.value!=null && nombre_de_la_tienda.value!="" && this.photoSelected!=null)
      {
        if(TerminosyCondiciones.checked == true)
        {
          await this.http.post(this.constantes.URL_BASE + "formulario/nuevo",
          { nombre: nombre.value, apellido: apellido.value, fecha_nacimiento: fecha_de_nacimiento.value, correo_electronico: correo.value, sexo: sexo, id_tipo_usuario: 1, id_sector: id_sector.value, nombre_tienda: nombre_de_la_tienda.value, logo_tienda: this.photoSelected}
          ).subscribe( data => this.ExitoalRegistrarTienda(data), err => this.ErroralRegistrarTienda(err) );
        }
        else
        { this.constantes.DesplegarMensajeTemporaldeError("Para registrarse debe de aceptar los términos y condiciones", 4000); }
      }
      else
      { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 2000); }
    }
    return false;
    /*1. Formulario Recibido:
    { "estado": "ok" }
    2. Error Inesperado:
    { "estado": "error" }*/ 
  }  


  ExitoalRegistrarTienda = async (Exito: any) => {//void
    if(Exito.estado=="ok")
    {
      await this.constantes.DesplegarMensajePermantendeExito("Formulario Enviado con Éxito", "Te contactaremos lo más pronto posible");  
      await this.router.navigate(['login']);
    }  
    else
    { await this.constantes.DesplegarMensajeTemporaldeError("Algo ha salido mal. Vuelve a Intentarlo", 2000); }  
  }
  
  
  ErroralRegistrarTienda = async (Error: any) => {//void
      console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 2000);
  }


}