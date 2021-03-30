import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Game} from "./game";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  static url: string = 'http://localhost:8000/api/jeux';

  constructor(private http: HttpClient) { }

  getGameList(): Observable<Game[]>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<any>(GameService.url, httpOptions)
      .pipe(
        map(res => res.data.item),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of([]);
        }),
      );
  }
}
