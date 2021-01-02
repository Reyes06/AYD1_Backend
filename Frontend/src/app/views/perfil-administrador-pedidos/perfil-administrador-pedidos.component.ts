import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConstantesService } from 'src/app/services/constantes.service';
import { pedidos } from './pedidos';

@Component({
  selector: 'app-perfil-administrador-pedidos',
  templateUrl: './perfil-administrador-pedidos.component.html',
  styleUrls: ['./perfil-administrador-pedidos.component.scss']
})
export class PerfilAdministradorPedidosComponent implements OnInit {

  constructor(private http: HttpClient, private constantes: ConstantesService) { }


  ngOnInit() {
    this.CargarPagina();
  }


  CargarPagina = async () => {
    await this.CargarDatosPagina();
  }


  CargarDatosPagina = async () => {//void
    await this.CargarDatosPaginaAux();
  }


  pedido: pedidos[] = [];

  CargarDatosPaginaAux = async () => {//void
    await this.http.get<pedidos[]>(this.constantes.URL_BASE + "compra/pendientes").subscribe
      (
        (response) => {
          this.pedido = response;
          console.log(this.pedido);
        },
        (error) => console.log(error)
      );
  }

  aprobar = async (id_compra: any) => {//void
    this.http.post(this.constantes.URL_BASE + "compra/confirmarPedido",
      { id_compra: id_compra }
    ).subscribe(data => this.ExitoEnvio(data), err => this.MensajeError(err));
    await this.constantes.sleep(3000);
    this.CargarDatosPaginaAux();
  }

  ExitoEnvio = async (Exito: any) => {//void
    console.log(Exito);
    await this.constantes.DesplegarMensajePermantendeExito("Se ha enviado el pedido", "Se ha generado la factura por correo electronico");
  }

  MensajeError = async (Error: any) => {//void
    console.log(Error);
    await this.constantes.DesplegarMensajeTemporaldeError("Sin Conexión, no se ha podido hacer el envio", 3000);
  }

}
