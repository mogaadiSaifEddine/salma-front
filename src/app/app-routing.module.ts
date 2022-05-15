import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChantierComponent } from './components/chantier/chantier.component';
import { LoginComponent } from './components/login/login.component';
import { ProjetComponent } from './components/projet/projet.component';
import { UsersComponent } from './components/users/users.component';
const routes: Routes = [
  { path: 'chant', component: ChantierComponent },
  { path: 'projet', component: ProjetComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'user', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
