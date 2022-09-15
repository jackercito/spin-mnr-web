import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

import { Experimento } from '../modelo/experimento.model'
import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ExperimentosServiceService {
  private option = {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth}`)
  }

  constructor(private http: HttpClient, private auth: AuthService) { }

  getExperimentos$(): Observable<Experimento[]> {
    return this.http
      .get<Experimento[]>(environment.API_URL + "/experimento", this.option)
      .pipe(catchError(this._handleError));
  }

  getOneExperimento$(id: string): Observable<Experimento> {
    return this.http
      .get<Experimento>(`${environment.API_URL}/experimento/${id}`, this.option)
      .pipe(catchError(this._handleError));
  }

  setExperimentos$(experimento: Experimento): Observable<any> {
    return this.http
      .post<Experimento>(environment.API_URL + "/experimento", experimento, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth}`) })
      .pipe(catchError(this._handleError));
  }

  putExperimento$(experimento: Experimento): Observable<Experimento> {
    return this.http
      .put<Experimento>(`${environment.API_URL}/experimento/${experimento._id}`, experimento, this.option)
      .pipe(catchError(this._handleError));
  }

  deleteExperimento$(id: string): Observable<any> {
    return this.http
      .delete<any>(`${environment.API_URL}/experimento/${id}`, this.option)
      .pipe(catchError(this._handleError));
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Unable to retrieve data';
    return throwError(errorMsg);
  }
}
