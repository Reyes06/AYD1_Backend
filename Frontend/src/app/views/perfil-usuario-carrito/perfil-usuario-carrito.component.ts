import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';
import { carrito } from './carrito';

@Component({
  selector: 'app-perfil-usuario-carrito',
  templateUrl: './perfil-usuario-carrito.component.html',
  styleUrls: ['./perfil-usuario-carrito.component.scss']
})
export class PerfilUsuarioCarritoComponent implements OnInit {


  constructor(private http: HttpClient, private constantes: ConstantesService, private router: Router, private VerificarCredencialesService: VerificarCredencialesService) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  productos: carrito[] = [];

  CargarDatosPagina = async () => {//void

    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
    if (ClaseVerificarCredenciales.CredencialesExisten == true) {
      var tipo_usuario = localStorage.getItem('tipo_usuario')

      if (tipo_usuario === "1")//Administrador
      { await this.router.navigate(['perfil-administrador']); }
      else if (tipo_usuario === "2")//Tienda
      { await this.router.navigate(['perfil-tienda']); }
      else if (tipo_usuario === "3")//Usuario
      {
        var usuario = localStorage.getItem("id_usuario");

          await this.http.get<carrito[]>(this.constantes.URL_BASE + "carrito/" + usuario).subscribe
            (
              (response) => {
                this.productos = response;
                console.log(this.productos);
              },
              (error) => console.log(error)
            );
      }
    }
    else { await this.router.navigate(['login']); }

  }

  actualizarCarrito = async (idProducto: any, stock: any) => {

    var usuario = localStorage.getItem("id_usuario");
    var llevarr = <HTMLInputElement>document.getElementById(idProducto);

    var llevar = Number(llevarr.value);

    if (Number.isInteger(llevar)) {
      if (Number(llevar) > 0 && Number(llevar) <= Number(stock)) {
        console.log('aaa->'+llevar);
        await this.actualizarCarritoAux(usuario, idProducto, llevar);
      }
      else if (Number(llevar) < 1) {
        this.constantes.DesplegarMensajeTemporaldeError("La cantidad debe ser mayor a 0", 4000);
      }
      else if (Number(llevar) > Number(stock)) {
        this.constantes.DesplegarMensajeTemporaldeError("No hay esa cantidad en stock", 4000);
      }
    }
    else {
      this.constantes.DesplegarMensajeTemporaldeError("Debe ingresar un numero", 4000);
    }
  }

  actualizarCarritoEXP = async (idProducto: any, stock: any) => {

    var usuario = localStorage.getItem("id_usuario");
    var llevarr = <HTMLInputElement>document.getElementById('exp' + idProducto);

    var llevar = Number(llevarr.value);

    if (Number.isInteger(llevar)) {
      if (Number(llevar) > 0 && Number(llevar) <= Number(stock)) {
        console.log('aaa->'+llevar);
        await this.actualizarCarritoAux(usuario, idProducto, llevar);
      }
      else if (Number(llevar) < 1) {
        this.constantes.DesplegarMensajeTemporaldeError("La cantidad debe ser mayor a 0", 4000);
      }
      else if (Number(llevar) > Number(stock)) {
        this.constantes.DesplegarMensajeTemporaldeError("No hay esa cantidad en stock", 4000);
      }
    }
    else {
      this.constantes.DesplegarMensajeTemporaldeError("Debe ingresar un numero", 4000);
    }
  }

  actualizarCarritoAux = async (usuario: any, producto: any, cant: any) => {//void
    await this.http.post(this.constantes.URL_BASE + "carrito/cantidad/update",
      {
        id_usuario: usuario,
        id_producto: producto,
        nueva_cantidad: cant
      }
    ).subscribe(data => this.ExitoalactualizarCarritoAux(data), err => this.ErroralactualizarCarritoAux(err));
  }

  ExitoalactualizarCarritoAux = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Carrito actualizado con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();

  }

  ErroralactualizarCarritoAux = async (Error: any) => {//void
    console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Carrito no actualizado", 3000);
  }

  quitardelCarritoEXP = async (producto: any) => {
    var usuario = localStorage.getItem("id_usuario");

    await this.http.post(this.constantes.URL_BASE + "carrito/borrar",
      {
        id_usuario: usuario,
        id_producto: producto
      }
    ).subscribe(data => this.ExitoalquitardelCarritoAux(data), err => this.ErroralactualizarCarritoAux(err));
  }

  ExitoalquitardelCarritoAux = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Se ha quitado producto del carrito con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();

  }

  vaciarCarrito = async () => {
    var usuario = localStorage.getItem("id_usuario");

    await this.http.post(this.constantes.URL_BASE + "carrito/borrar/all",
      {
        id_usuario: usuario
      }
    ).subscribe(data => this.ExitoalVaciarCarritoAux(data), err => this.ErroralactualizarCarritoAux(err));
  }

  ExitoalVaciarCarritoAux = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Se ha vaciado el carrito con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();

  }
}
