import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'portal', component: PortalComponent },
  { path: 'registro', component: RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
