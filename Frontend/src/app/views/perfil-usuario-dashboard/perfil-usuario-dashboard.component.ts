import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { VerificarCredencialesService } from 'src/app/services/verificar-credenciales.service';
import { ClaseVerificarCredenciales } from '../../models/clases';
import { producto } from './producto';
import { localizacion } from './localizacion';
import { tienda } from './tienda';
import { sector } from './sector';
import { categoria } from './categoria';

@Component({
  selector: 'app-perfil-usuario-dashboard',
  templateUrl: './perfil-usuario-dashboard.component.html',
  styleUrls: ['./perfil-usuario-dashboard.component.scss']
})
export class PerfilUsuarioDashboardComponent implements OnInit {


  constructor(private http: HttpClient, private constantes: ConstantesService, private router: Router, private VerificarCredencialesService: VerificarCredencialesService) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina(0,0);
  }


  productos: producto[] = [];
  localidad: localizacion[] = [];
  tiendas: tienda[] = [];
  sectores: sector[] = [];
  categorias: categoria[] = [];

  CargarDatosPagina = async (filtro: any, id_a_mandar: any) => {//void

    var ClaseVerificarCredenciales: ClaseVerificarCredenciales = await this.VerificarCredencialesService.VerificarCredenciales();
    if (ClaseVerificarCredenciales.CredencialesExisten == true) {
      var tipo_usuario = localStorage.getItem('tipo_usuario')

      if (tipo_usuario === "1")//Administrador
      { await this.router.navigate(['perfil-administrador']); }
      else if (tipo_usuario === "2")//Tienda
      { await this.router.navigate(['perfil-tienda']); }
      else if (tipo_usuario === "3")//Usuario
      {

        if (filtro === 0) {
          await this.http.get<producto[]>(this.constantes.URL_BASE + "producto/").subscribe
            (
              (response) => {
                this.productos = response;
                console.log(this.productos);
              },
              (error) => console.log(error)
            );
        }
        else if (filtro === 1) {
          
          await this.http.get<producto[]>(this.constantes.URL_BASE + "producto/filtro/localizacion/" + id_a_mandar).subscribe
            (
              (response) => {
                this.productos = response;
                console.log(this.productos);
              },
              (error) => console.log(error)
            );
        }
        else if (filtro === 2) {
          
          await this.http.get<producto[]>(this.constantes.URL_BASE + "producto/filtro/tienda/" + id_a_mandar).subscribe
            (
              (response) => {
                this.productos = response;
                console.log(this.productos);
              },
              (error) => console.log(error)
            );
        }
        else if (filtro === 3) {
          
          await this.http.get<producto[]>(this.constantes.URL_BASE + "producto/filtro/sector/" + id_a_mandar).subscribe
            (
              (response) => {
                this.productos = response;
                console.log(this.productos);
              },
              (error) => console.log(error)
            );
        }
        else if (filtro === 4) {
          
          await this.http.get<producto[]>(this.constantes.URL_BASE + "producto/filtro/categoria/" + id_a_mandar).subscribe
            (
              (response) => {
                this.productos = response;
                console.log(this.productos);
              },
              (error) => console.log(error)
            );
        }
      }
    }
    else { await this.router.navigate(['login']); }

  }

  cargarLoc = async () => {
    
    await this.http.get<localizacion[]>(this.constantes.URL_BASE + "producto/filtro/localizacion").subscribe
    (
      (response) => {
        this.localidad = response;
        console.log(this.localidad);
      },
      (error) => console.log(error)
    );

  }

  cargarTien = async () => {
    
    await this.http.get<tienda[]>(this.constantes.URL_BASE + "producto/filtro/tienda").subscribe
    (
      (response) => {
        this.tiendas = response;
        console.log(this.tiendas);
      },
      (error) => console.log(error)
    );

  }

  cargarSec = async () => {
    
    await this.http.get<sector[]>(this.constantes.URL_BASE + "producto/filtro/sector").subscribe
    (
      (response) => {
        this.sectores = response;
        console.log(this.sectores);
      },
      (error) => console.log(error)
    );

  }

  cargarCat = async () => {
    
    await this.http.get<categoria[]>(this.constantes.URL_BASE + "producto/filtro/categoria").subscribe
    (
      (response) => {
        this.categorias = response;
        console.log(this.categorias);
      },
      (error) => console.log(error)
    );

  }


  agregarCarrito = async (idProducto: any, stock: any) => {

    var usuario = localStorage.getItem("id_usuario");
    var llevarr = <HTMLInputElement>document.getElementById(idProducto);

    var llevar = Number(llevarr.value);

    if (Number.isInteger(llevar)) {
      if (Number(llevar) > 0 && Number(llevar) <= Number(stock)) {
        await this.AgregarAlCarroAux(usuario, idProducto, llevar);
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

  agregarCarritoEXP = async (idProducto: any, stock: any) => {

    var usuario = localStorage.getItem("id_usuario");
    var llevarr = <HTMLInputElement>document.getElementById('exp' + idProducto);

    var llevar = Number(llevarr.value);

    if (Number.isInteger(llevar)) {
      if (Number(llevar) > 0 && Number(llevar) <= Number(stock)) {
        await this.AgregarAlCarroAux(usuario, idProducto, llevar);
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

  AgregarAlCarroAux = async (usuario: any, producto: any, cant: any) => {//void
    await this.http.post(this.constantes.URL_BASE + "carrito/agregar",
      {
        id_usuario: usuario,
        id_producto: producto,
        cantidad: cant
      }
    ).subscribe(data => this.ExitoalAgregarAlCarroAux(data), err => this.ErroralAgregarAlCarroAux(err));
  }

  ExitoalAgregarAlCarroAux = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Producto agregado al carrito con éxito", "");
    await this.constantes.sleep(3000);
    await this.CargarDatosPagina(0,0);

  }

  ErroralAgregarAlCarroAux = async (Error: any) => {//void
    console.log(Error); await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, Producto no agregado", 3000);
  }

}
