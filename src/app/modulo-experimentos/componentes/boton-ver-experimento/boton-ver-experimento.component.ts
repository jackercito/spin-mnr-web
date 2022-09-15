import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-ver-experimento',
  templateUrl: './boton-ver-experimento.component.html',
  styleUrls: ['./boton-ver-experimento.component.css']
})
export class BotonVerExperimentoComponent implements ICellRendererAngularComp {

  public params: any;
  public id: string;

  constructor(private router: Router) {}

  agInit(params: any): void {
    this.params = params;
    this.id = this.params.data._id;
  }

  refresh(): boolean {
    return false;
  }

  fn(): void {
    this.router.navigate(['/experimentos/mostrar/' + this.id])
  }
}
