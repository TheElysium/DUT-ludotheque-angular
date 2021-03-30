import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Theme} from "./theme";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  getThemes(): Observable<Theme[]>{
    const url: string = 'http://localhost:8000/api/themes';

    return this.http.get<any>(url, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }
}
