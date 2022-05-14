import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChantierComponent } from './components/chantier/chantier.component';
import { ProjetComponent } from './components/projet/projet.component';
const routes: Routes = [
  { path: 'chant', component: ChantierComponent },
  { path: 'projet', component: ProjetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
