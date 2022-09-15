import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Experimento } from '../../modelo/experimento.model'
import { ExperimentosServiceService } from './../../services/experimentos-service.service';

@Component({
  selector: 'app-ver-experimento',
  templateUrl: './ver-experimento.component.html',
  styleUrls: ['./ver-experimento.component.css']
})
export class VerExperimentoComponent implements OnInit {
  experimentosSubscription: Subscription;
  experimento: Experimento = new Experimento();

  constructor(
    private apiExperimento: ExperimentosServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this._getExperimento();
  }

  deleteExperimento() {
    this._deleteExperimento();
  }

  editarExperimento() {
    this.router.navigate(['/experimentos/editar/' + this.experimento._id])
  }

  private _getExperimento() {
    this.experimentosSubscription = this.apiExperimento.getOneExperimento$(this.route.snapshot.params['id']).subscribe({
      next : (data) => { this.experimento = data; },
      error: () => { this.router.navigate(['/experimentos/listar/']); }
    });
  }

  private _deleteExperimento() {
    this.experimentosSubscription = this.apiExperimento.deleteExperimento$(this.experimento._id).subscribe({
      next: () => { this.router.navigate(['/experimentos/listar']); },
      error: (err) => { console.error(err) }
    });
  }
}
