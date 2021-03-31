import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MecanicService {

  constructor(public http: HttpClient) { }

  getMechanics(): Observable<any[]>{
    const url: string = 'http://localhost:8000/api/mechanics';
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };

    return this.http.get<any>(url, httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }

  getMechanicById(mechId: number): any{
    this.getMechanics().subscribe(mechanics => {
      return mechanics.filter(m => {
        if (m.id === mechId) {
          return m;
        }
      });
    });
  }

}

export interface Mecanic{
  nom: string;
  id: number;
}
