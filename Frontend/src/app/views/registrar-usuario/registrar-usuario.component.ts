import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {


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

      if(tipo_usuario==="1")//Administrador
      { await this.router.navigate(['perfil-administrador']);  }
      else if(tipo_usuario==="2")//Tienda
      { await this.router.navigate(['perfil-tienda']);  }
      else if(tipo_usuario==="3")//Usuario
      { await this.router.navigate(['perfil-usuario']);  }
  
    }
    
  }


  //Usuario----------------------------------------------------------------------------------------

  RegistrarUsuario = async () => {//void
    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();

    if(ClaseVerificarCredenciales.CredencialesExisten==true)
    { 
      await this.constantes.DesplegarMensajeTemporaldeError("Sesión ya Iniciada", 2000); await this.router.navigate(['dashboards/v1']); 

      var tipo_usuario = localStorage.getItem('tipo_usuario')
        
      if(tipo_usuario==="1")//Administrador
      { await this.router.navigate(['perfil-administrador']);  }
      else if(tipo_usuario==="2")//Tienda
      { await this.router.navigate(['perfil-tienda']);  }
      else if(tipo_usuario==="3")//Usuario
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
      var contrasena = <HTMLInputElement>document.getElementById("form_contrasena");
      var TerminosyCondiciones = <HTMLInputElement>document.getElementById("TerminosyCondiciones");

      if(nombre.value!=null && nombre.value!="" && apellido.value!=null && apellido.value!="" 
      && fecha_de_nacimiento.value!=null && fecha_de_nacimiento.value!=""
      && correo.value!=null && correo.value!="" && (sexoFemenino.checked!=true || sexoFemenino.checked==true) 
      && sexo!=null && sexo!="" && contrasena.value!=null && contrasena.value!="")
      {
        if(TerminosyCondiciones.checked == true)
        {
          await this.http.post(this.constantes.URL_BASE + "usuario/nuevo",
          { nombre: nombre.value, apellido: apellido.value, fecha_nacimiento: fecha_de_nacimiento.value, correo_electronico: correo.value, sexo: sexo, password: contrasena.value}
          ).subscribe( data => this.ExitoalRegistrarUsuario(data), err => this.ErroralRegistrarUsuario(err) );
        }
        else
        { this.constantes.DesplegarMensajeTemporaldeError("Para registrarse debe de aceptar los términos y condiciones", 4000); }
      }
      else
      { this.constantes.DesplegarMensajeTemporaldeError("Ningún campo puede quedar vacío", 2000); }
    }
    return false;
  }  

  ExitoalRegistrarUsuario = async (Exito: any) => {//void
    if(Exito.estado=="ok")
    {
      await this.constantes.DesplegarMensajePermantendeExito("Cuenta Creada con Éxito", "Ya puede iniciar sesión");  
      await this.router.navigate(['login']);
    }  
    else
    { await this.constantes.DesplegarMensajeTemporaldeError(Exito.descripcion, 2000); }  
  }
    
  ErroralRegistrarUsuario = async (Error: any) => {//void
      console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 2000);
  }


}