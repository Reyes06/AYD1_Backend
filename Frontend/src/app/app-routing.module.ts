import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { LoginComponent } from './views/login/login.component';
import { RegistrarUsuarioComponent } from './views/registrar-usuario/registrar-usuario.component';
import { RegistrarTiendaComponent } from './views/registrar-tienda/registrar-tienda.component';

import { Map1Component } from './views/maps/map1/map1.component';
import { ModalsComponent } from './views/modals/modals.component';
import { BasicTableComponent } from './views/tables/basic-table/basic-table.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';

import { PerfilAdministradorComponent } from './views/perfil-administrador/perfil-administrador.component';
import { PerfilAdministradorSolicitudesComponent } from './views/perfil-administrador-solicitudes/perfil-administrador-solicitudes.component';
import { PerfilAdministradorDashboardComponent } from './views/perfil-administrador-dashboard/perfil-administrador-dashboard.component';
import { PerfilTiendaComponent } from './views/perfil-tienda/perfil-tienda.component';
import { PerfilTiendaDashboardComponent } from './views/perfil-tienda-dashboard/perfil-tienda-dashboard.component';
import { PerfilUsuarioComponent } from './views/perfil-usuario/perfil-usuario.component';
import { PerfilUsuarioDashboardComponent } from './views/perfil-usuario-dashboard/perfil-usuario-dashboard.component';
import { RegistrarUsuarioTerminosyCondicionesComponent } from './views/registrar-usuario-terminosy-condiciones/registrar-usuario-terminosy-condiciones.component';
import { RegistrarTiendaTerminosyCondicionesComponent } from './views/registrar-tienda-terminosy-condiciones/registrar-tienda-terminosy-condiciones.component';
import { PerfilTiendaAdministrarDepartamentosComponent } from './views/perfil-tienda-administrar-departamentos/perfil-tienda-administrar-departamentos.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registrar/usuario', component: RegistrarUsuarioComponent},
  {path: 'registrar/usuario/TerminosyCondiciones', component: RegistrarUsuarioTerminosyCondicionesComponent},
  {path: 'registrar/tienda', component: RegistrarTiendaComponent},
  {path: 'registrar/tienda/TerminosyCondiciones', component: RegistrarTiendaTerminosyCondicionesComponent},
  {path: 'perfil-administrador', component: PerfilAdministradorComponent},
  {path: 'perfil-administrador/Dashboard', component: PerfilAdministradorDashboardComponent},
  {path: 'perfil-administrador/Solicitudes', component: PerfilAdministradorSolicitudesComponent},
  {path: 'perfil-tienda', component: PerfilTiendaComponent},
  {path: 'perfil-tienda/Dashboard', component: PerfilTiendaDashboardComponent},
  {path: 'perfil-tienda/AdministrarDepartamentos', component: PerfilTiendaAdministrarDepartamentosComponent},
  {path: 'perfil-usuario', component: PerfilUsuarioComponent},
  {path: 'perfil-usuario/Dashboard', component: PerfilUsuarioDashboardComponent},
  {path: 'dashboards/v1', component: Dashboard1Component},
  {path: 'profiles/profile1', component: Profile1Component},
  {path: 'tables/table1', component: BasicTableComponent},
  {path: 'maps/map1', component: Map1Component},
  {path: 'modals', component: ModalsComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
