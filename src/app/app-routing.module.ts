import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarExperimentosComponent } from './modulo-experimentos/componentes/listar-experimentos/listar-experimentos.component';
import { CrearExperimentoComponent } from './modulo-experimentos/componentes/crear-experimento/crear-experimento.component';
import { VerExperimentoComponent } from './modulo-experimentos/componentes/ver-experimento/ver-experimento.component';
import { EditarExperimentoComponent } from './modulo-experimentos/componentes/editar-experimento/editar-experimento.component';

const routes: Routes = [{
    path: 'experimentos/listar',
    component: ListarExperimentosComponent,
  },
  {
    path: 'experimentos/nuevo',
    component: CrearExperimentoComponent,
  },
  {
    path: 'experimentos/mostrar/:id',
    component: VerExperimentoComponent,
  },
  {
    path: 'experimentos/editar/:id',
    component: EditarExperimentoComponent,
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
