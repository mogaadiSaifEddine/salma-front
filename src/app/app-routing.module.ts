import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChantierComponent } from './components/chantier/chantier.component';
import { LoginComponent } from './components/login/login.component';
import { ProjetComponent } from './components/projet/projet.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './auth.guard';
import { ISPComponent } from './components/isp/isp.component';
const routes: Routes = [
  { path: 'chant', component: ChantierComponent, canActivate: [AuthGuard] },
  { path: 'projet', component: ProjetComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'user', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'isp', component: ISPComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
