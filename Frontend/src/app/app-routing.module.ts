import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';

//Login
import { LoginComponent } from './views/login/login.component';

//Registrar Usuario
import { RegistrarUsuarioComponent } from './views/registrar-usuario/registrar-usuario.component';
import { RegistrarUsuarioTerminosyCondicionesComponent } from './views/registrar-usuario-terminosy-condiciones/registrar-usuario-terminosy-condiciones.component';

//Registrar Tienda
import { RegistrarTiendaComponent } from './views/registrar-tienda/registrar-tienda.component';
import { RegistrarTiendaTerminosyCondicionesComponent } from './views/registrar-tienda-terminosy-condiciones/registrar-tienda-terminosy-condiciones.component';

//Perfil Administrador
import { PerfilAdministradorSolicitudesComponent } from './views/perfil-administrador-solicitudes/perfil-administrador-solicitudes.component';
import { PerfilAdministradorDashboardComponent } from './views/perfil-administrador-dashboard/perfil-administrador-dashboard.component';
import { PerfilAdministradorAdministrarCategoriasComponent } from './views/perfil-administrador-administrar-categorias/perfil-administrador-administrar-categorias.component';
import { PerfilAdministradorPedidosComponent } from './views/perfil-administrador-pedidos/perfil-administrador-pedidos.component';

//Perfil Tienda
import { PerfilTiendaDashboardComponent } from './views/perfil-tienda-dashboard/perfil-tienda-dashboard.component';
import { PerfilTiendaAdministrarDepartamentosComponent } from './views/perfil-tienda-administrar-departamentos/perfil-tienda-administrar-departamentos.component';
import { PerfilTiendaAdministrarProductosComponent } from './views/perfil-tienda-administrar-productos/perfil-tienda-administrar-productos.component';

//Perfil Usuario
import { PerfilUsuarioDashboardComponent } from './views/perfil-usuario-dashboard/perfil-usuario-dashboard.component';
import { PerfilUsuarioCarritoComponent } from './views/perfil-usuario-carrito/perfil-usuario-carrito.component';

import { Map1Component } from './views/maps/map1/map1.component';
import { ModalsComponent } from './views/modals/modals.component';
import { BasicTableComponent } from './views/tables/basic-table/basic-table.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';

//Auth
import { AuthPerfilGuard } from './guards/auth-perfil.guard';
import { AuthPerfilAdministradorGuard } from './guards/auth-perfil-administrador.guard';
import { AuthPerfilTiendaGuard } from './guards/auth-perfil-tienda.guard';
import { AuthPerfilUsuarioGuard } from './guards/auth-perfil-usuario.guard';

const routes: Routes = [
  //Login
  {path: 'login', component: LoginComponent, canActivate: [AuthPerfilGuard]},
  
  //Registrar Usuario
  {path: 'registrar/usuario', component: RegistrarUsuarioComponent, canActivate: [AuthPerfilGuard]},
  {path: 'registrar/usuario/TerminosyCondiciones', component: RegistrarUsuarioTerminosyCondicionesComponent, canActivate: [AuthPerfilGuard]},

  //Registrar Tienda
  {path: 'registrar/tienda', component: RegistrarTiendaComponent, canActivate: [AuthPerfilGuard]},
  {path: 'registrar/tienda/TerminosyCondiciones', component: RegistrarTiendaTerminosyCondicionesComponent, canActivate: [AuthPerfilGuard]},
  
  //Perfil Administrador
  {path: 'perfil-administrador', component: PerfilAdministradorDashboardComponent, canActivate: [AuthPerfilAdministradorGuard]},
  {path: 'perfil-administrador/Dashboard', component: PerfilAdministradorDashboardComponent, canActivate: [AuthPerfilAdministradorGuard]},
  {path: 'perfil-administrador/Solicitudes', component: PerfilAdministradorSolicitudesComponent, canActivate: [AuthPerfilAdministradorGuard]},
  {path: 'perfil-administrador/AdministrarCategorias', component: PerfilAdministradorAdministrarCategoriasComponent, canActivate: [AuthPerfilAdministradorGuard]},
  {path: 'perfil-administrador/Pedidos', component: PerfilAdministradorPedidosComponent, canActivate: [AuthPerfilAdministradorGuard]},
  
  //Perfil Tienda
  {path: 'perfil-tienda', component: PerfilTiendaDashboardComponent, canActivate: [AuthPerfilTiendaGuard]},
  {path: 'perfil-tienda/Dashboard', component: PerfilTiendaDashboardComponent, canActivate: [AuthPerfilTiendaGuard]},
  {path: 'perfil-tienda/AdministrarDepartamentos', component: PerfilTiendaAdministrarDepartamentosComponent, canActivate: [AuthPerfilTiendaGuard]},
  {path: 'perfil-tienda/AdministrarProductos', component: PerfilTiendaAdministrarProductosComponent, canActivate: [AuthPerfilTiendaGuard]},
  
  //Perfil Usuario
  {path: 'perfil-usuario', component: PerfilUsuarioDashboardComponent, canActivate: [AuthPerfilUsuarioGuard]},
  {path: 'perfil-usuario/Dashboard', component: PerfilUsuarioDashboardComponent, canActivate: [AuthPerfilUsuarioGuard]},
  {path: 'perfil-usuario/Carrito', component: PerfilUsuarioCarritoComponent, canActivate: [AuthPerfilUsuarioGuard]},
  
  {path: 'dashboards/v1', component: Dashboard1Component},
  {path: 'profiles/profile1', component: Profile1Component},
  {path: 'tables/table1', component: BasicTableComponent},
  {path: 'maps/map1', component: Map1Component},
  {path: 'modals', component: ModalsComponent},
  
  //Reglas
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
