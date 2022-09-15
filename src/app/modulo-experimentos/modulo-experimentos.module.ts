import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//ag-grid
import { AgGridModule } from 'ag-grid-angular';

import { ListarExperimentosComponent } from './componentes/listar-experimentos/listar-experimentos.component';
import { CrearExperimentoComponent } from './componentes/crear-experimento/crear-experimento.component';
import { VerExperimentoComponent } from './componentes/ver-experimento/ver-experimento.component';
import { EditarExperimentoComponent } from './componentes/editar-experimento/editar-experimento.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule
  ],
  declarations: [
    ListarExperimentosComponent,
    CrearExperimentoComponent,
    VerExperimentoComponent,
    EditarExperimentoComponent,
  ],
  exports: [
  ]
})
export class ModuloExperimentosModule { }
