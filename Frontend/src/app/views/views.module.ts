import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { CalendarModule,  } from 'angular-calendar';
import { SharedModule } from '../shared/shared.module';

import { FooterComponent } from '../main-layout/footer/footer.component';
import { BasicTableComponent } from './tables/basic-table/basic-table.component';
import { ModalsComponent } from './modals/modals.component';
import { Map1Component } from './maps/map1/map1.component';
import { StatsCardComponent } from './dashboards/common/stats-card/stats-card.component';
import { StatsCard2Component } from './dashboards/common/stats-card2/stats-card2.component';
import { Dashboard1Component } from './dashboards/dashboard1/dashboard1.component';
import { Profile1Component } from './profile/profile1/profile1.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { PerfilAdministradorComponent } from './perfil-administrador/perfil-administrador.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilTiendaComponent } from './perfil-tienda/perfil-tienda.component';
import { RegistrarTiendaComponent } from './registrar-tienda/registrar-tienda.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { PerfilAdministradorDashboardComponent } from './perfil-administrador-dashboard/perfil-administrador-dashboard.component';
import { PerfilAdministradorSolicitudesComponent } from './perfil-administrador-solicitudes/perfil-administrador-solicitudes.component';
import { PerfilTiendaDashboardComponent } from './perfil-tienda-dashboard/perfil-tienda-dashboard.component';
import { PerfilUsuarioDashboardComponent } from './perfil-usuario-dashboard/perfil-usuario-dashboard.component';
import { RegistrarTiendaTerminosyCondicionesComponent } from './registrar-tienda-terminosy-condiciones/registrar-tienda-terminosy-condiciones.component';
import { RegistrarUsuarioTerminosyCondicionesComponent } from './registrar-usuario-terminosy-condiciones/registrar-usuario-terminosy-condiciones.component';
import { PerfilTiendaAdministrarDepartamentosComponent } from './perfil-tienda-administrar-departamentos/perfil-tienda-administrar-departamentos.component';
import { PerfilTiendaAdministrarProductosComponent } from './perfil-tienda-administrar-productos/perfil-tienda-administrar-productos.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: ''
    }),
    CalendarModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    BasicTableComponent,
    ModalsComponent,
    Map1Component,
    StatsCardComponent,
    StatsCard2Component,
    Dashboard1Component,
    Profile1Component,
    HelpComponent,
    LoginComponent,
    PerfilAdministradorComponent,
    PerfilUsuarioComponent,
    PerfilTiendaComponent,
    RegistrarTiendaComponent,
    RegistrarUsuarioComponent,
    PerfilAdministradorDashboardComponent,
    PerfilAdministradorSolicitudesComponent,
    PerfilTiendaDashboardComponent,
    PerfilUsuarioDashboardComponent,
    RegistrarTiendaTerminosyCondicionesComponent,
    RegistrarUsuarioTerminosyCondicionesComponent,
    PerfilTiendaAdministrarDepartamentosComponent,
    PerfilTiendaAdministrarProductosComponent,

  ],
  exports: [
    FooterComponent,
    BasicTableComponent,
    ModalsComponent,
    Map1Component,
    StatsCardComponent,
    StatsCard2Component,    
    Dashboard1Component
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ViewsModule { }
