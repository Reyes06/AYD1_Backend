import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


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
    { await this.router.navigate(['dashboards/v1']); } 
    
  }


  Registrar = async () => {//void
    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();

    if(ClaseVerificarCredenciales.CredencialesExisten==true)
    { await this.constantes.DesplegarMensajeTemporaldeError("Sesión ya Iniciada", 2000); await this.router.navigate(['dashboards/v1']); }
    else 
    {
      var nombre = <HTMLInputElement>document.getElementById("form104");
      var apellido = <HTMLInputElement>document.getElementById("form105");
      var nacimiento = <HTMLInputElement>document.getElementById("form106");
      var correo = <HTMLInputElement>document.getElementById("form107");
      var sexoM = <HTMLInputElement>document.getElementById("form108");
      var sexoH = <HTMLInputElement>document.getElementById("form109");
      var sexo = null;
      if(sexoM.checked){
        sexo = "F";
      }
      else if(sexoH.checked){
        sexo = "M";
      }
      var contrasenia = <HTMLInputElement>document.getElementById("form110");
      var tarjeta = <HTMLInputElement>document.getElementById("form111");
      var ccv = <HTMLInputElement>document.getElementById("form112");
      var vencimiento = <HTMLInputElement>document.getElementById("form113");
      var tipoUs = <HTMLSelectElement>document.getElementById("form114");
      /*if(correo.validity.valid==false)
      { await this.constantes.DesplegarMensajeTemporaldeError("Correo no valido", 2000); }
      else
      {*/
        await this.http.post(this.constantes.URL_BASE + "usuario/nuevo",
        { nombre: nombre.value, apellido: apellido.value, fecha_nacimiento: nacimiento.value, correo_electronico: correo.value, sexo: sexo, password: contrasenia.value, tarjeta_credito: tarjeta.value, cvv: ccv.value, fecha_expiracion: vencimiento.value, id_tipo_usuario: tipoUs.value}
        ).subscribe( data => this.ExitoalRegistrar(data), err => this.ErroralRegistrar(err) );
      /*}*/
    }
    return false;
    /*1. Ya existe un usuario con el correo indicado
    { "estado": "error", "descripcion": "El usuario ya existe" }
    2. Usuario creado
    { "estado": "ok", "result": [ { "id_usuario": 7 } ] }*/ 
  }  


  ExitoalRegistrar = async (Exito: any) => {//void
    if(Exito.estado=="ok")
    {
      await this.constantes.DesplegarMensajePermantendeExito("Cuenta Creada con Éxito", "Ya puede iniciar sesión");  
      await this.router.navigate(['login/login1']);
    }  
    else
    { await this.constantes.DesplegarMensajeTemporaldeError(Exito.descripcion, 2000); }  
    }
  
  
    ErroralRegistrar = async (Error: any) => {//void
      console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 2000);
    } 
  

    RegistrarComercio = async () => {//void
      var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
  
      if(ClaseVerificarCredenciales.CredencialesExisten==true)
      { await this.constantes.DesplegarMensajeTemporaldeError("Sesión ya Iniciada", 2000); await this.router.navigate(['dashboards/v1']); }
      else 
      {
        var nombre = <HTMLInputElement>document.getElementById("form204");
        //var sector = <HTMLInputElement>document.getElementById("form205");
        //var localizacion = <HTMLInputElement>document.getElementById("form206");
        var direccion = <HTMLInputElement>document.getElementById("form207");
        //var correo = <HTMLInputElement>document.getElementById("form208");
        /*if(correo.validity.valid==false)
        { await this.constantes.DesplegarMensajeTemporaldeError("Correo no valido", 2000); }
        else
        {*/
          await this.http.post(this.constantes.URL_BASE + "formulario/nuevo",
          { nombre: nombre.value, logo: 1010, direccion: direccion.value, id_usuario: 1, id_sector: 3, id_municipio: 1 }
          ).subscribe( data => console.log(data), err => console.log(err) );
        /*}*/
      }
      return false;
      /*[ {"id_formulario": 8} ]*/ 
    }  
  
  
    ExitoalRegistrarComercio = async (Exito: any) => {//void
      console.log(Exito); await this.constantes.DesplegarMensajePermantendeExito("Solicitud enviada con Éxito", "Alguien de nuestro equipo se comunicara con usted lo mas pronto posible");  
      await this.router.navigate(['login/login1']);
    }
    
    
    ErroralRegistrarComercio = async (Error: any) => {//void
      console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión", 2000);
    }

}
