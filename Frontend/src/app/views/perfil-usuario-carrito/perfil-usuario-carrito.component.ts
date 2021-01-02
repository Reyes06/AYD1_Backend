import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { carrito } from './carrito';

@Component({
  selector: 'app-perfil-usuario-carrito',
  templateUrl: './perfil-usuario-carrito.component.html',
  styleUrls: ['./perfil-usuario-carrito.component.scss']
})
export class PerfilUsuarioCarritoComponent implements OnInit {


  constructor(private http: HttpClient, private constantes: ConstantesService) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  productos: carrito[] = [];
  total: string;

  CargarDatosPagina = async () => {//void

    var usuario = localStorage.getItem("id_usuario");

    await this.http.get<carrito[]>(this.constantes.URL_BASE + "carrito/" + usuario).subscribe
    (
      (response) => {
        this.productos = response;
        console.log(this.productos);
        var valorr = 0;
        for(var i = 0; i < this.productos.length; i++){
          var valor = 0;
          valor = Number(this.productos[i].cantidad) * Number(this.productos[i].precio);
          valorr = valorr + valor;
        }
        this.total = valorr.toString();
      },
      (error) => console.log(error)
    );

  }

  actualizarCarrito = async (idProducto: any, stock: any) => {

    var usuario = localStorage.getItem("id_usuario");
    var llevarr = <HTMLInputElement>document.getElementById(idProducto);

    var llevar = Number(llevarr.value);

    if (Number.isInteger(llevar)) {
      if (Number(llevar) > 0 && Number(llevar) <= Number(stock)) {
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

  efectuarCompra = async () => {
    var usuario = localStorage.getItem("id_usuario");
    var direccion = <HTMLInputElement>document.getElementById("direccion");

    await this.http.post(this.constantes.URL_BASE + "compra/realizarPedido",
      {
        id_usuario: usuario,
        direccion_envio: direccion.value
      }
    ).subscribe(data => this.ExitoAlHacerPedido(data), err => this.ErrorAlHacerPedido(err));
  }

  ExitoAlHacerPedido = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Se ha efectuado su compra", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina();

  }

  ErrorAlHacerPedido = async (Error: any) => {//void
    console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, No se ha podido efectuar su compra", 3000);
  }
}
