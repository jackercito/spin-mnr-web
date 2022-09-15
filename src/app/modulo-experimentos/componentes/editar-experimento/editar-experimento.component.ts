import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { Experimento } from '../../modelo/experimento.model'
import { ExperimentosServiceService } from './../../services/experimentos-service.service';

const ESPECTROMETROS = ['ESPECTRÓMETRO BRUKER AVANCE NEO', 'ESPECTRÓMETRO BRUKER AVANCE III / 500(Muestras Líquidas)', 'ESPECTRÓMETRO BRUKER AVANCE III / HD(Muestras sólidas)'];
const SONDA_A = ['PI HR BB0400 (5mm)', 'PA BBI400 S1 (5mm)']
const SONDA_B = ['PABBI (5mm)', 'PASEX (10mm)']
const SONDA_C = ['SPRB400172_7164 (7,5mm)', 'SPRB400172_7423 (7,5mm)', 'H8906-20_007 (Triple Resonancia)', 'H13664_0016 (2,5mm)', 'H12138_0076 (Dobe Resonancia)', 'H13349_0014 (Baja frecuencia)']

@Component({
  selector: 'app-editar-experimento',
  templateUrl: './editar-experimento.component.html',
  styleUrls: ['./editar-experimento.component.css']
})
export class EditarExperimentoComponent implements OnInit {
  authSubscription: Subscription;
  experimentosSubscription: Subscription;

  experimento: Experimento = new Experimento();

  finDateFechaEntrada: Date = new Date();
  finDateFechaSalida: Date = new Date();

  espectrometros: string[] = ESPECTROMETROS;
  sondas: string[];

  espectrometroSeleccionado: string;
  sondaSeleccionada: string;

  constructor(
    private apiExperimento: ExperimentosServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this._getExperimento();
  }

  ngOnDestroy() {
    if (this.authSubscription)
      this.authSubscription.unsubscribe();
    this._destroyExperimentoSubscription();
  }

  onSelectEspectrometro(event) {
    switch (event) {
      case ESPECTROMETROS[0]:
        this.sondas = SONDA_A;
        break;
      case ESPECTROMETROS[1]:
        this.sondas = SONDA_B;
        break;
      case ESPECTROMETROS[2]:
        this.sondas = SONDA_C;
        break;
    }
  }

  editarExperimento() {
    this.experimento.espectrometro = this.espectrometroSeleccionado
    this.experimento.sonda = this.sondaSeleccionada
    this.experimento.fecha_entrada = this.finDateFechaEntrada;
    if (this.experimento.completo) this.experimento.fecha_salida = this.finDateFechaSalida
    this._putExperimento();
  }

  goBack() {
    this._location.back();
  }

  private _getExperimento() {
    this.experimentosSubscription = this.apiExperimento.getOneExperimento$(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.experimento = data;
        this.onSelectEspectrometro(this.experimento.espectrometro);
        this.espectrometroSeleccionado = this.experimento.espectrometro;
        this.sondaSeleccionada = this.experimento.sonda;
        this.finDateFechaEntrada = this.experimento.fecha_entrada;
        this.finDateFechaSalida = this.experimento.fecha_salida;
      },
      error: () => { this.router.navigate(['/experimentos/listar/']); }
    });
  }

  private _putExperimento() {
    this.experimentosSubscription = this.apiExperimento.putExperimento$(this.experimento).subscribe({
      next: () => { this.router.navigate(['/experimentos/mostrar/', this.experimento._id]); },
      error: (err) => console.error(err)
    })
  }

  private _destroyExperimentoSubscription() {
    if (this.experimentosSubscription)
      this.experimentosSubscription.unsubscribe();
  }
}
