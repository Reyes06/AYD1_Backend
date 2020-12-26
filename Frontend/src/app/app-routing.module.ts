import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegistrarUsuarioComponent } from './views/registrar-usuario/registrar-usuario.component';
import { RegistrarTiendaComponent } from './views/registrar-tienda/registrar-tienda.component';
import { Map1Component } from './views/maps/map1/map1.component';
import { ModalsComponent } from './views/modals/modals.component';
import { BasicTableComponent } from './views/tables/basic-table/basic-table.component';
import { Profile1Component } from './views/profile/profile1/profile1.component';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { Dashboard1Component } from './views/dashboards/dashboard1/dashboard1.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registrarusuario', component: RegistrarUsuarioComponent},
  {path: 'registrartienda', component: RegistrarTiendaComponent},
  {path: 'dashboards/v1', component: Dashboard1Component},
  {path: 'profiles/profile1', component: Profile1Component},
  {path: 'tables/table1', component: BasicTableComponent},
  {path: 'maps/map1', component: Map1Component},
  {path: 'modals', component: ModalsComponent},
  {path: '**', component: NotFoundComponent },

  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
