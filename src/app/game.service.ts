import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Game} from "./game";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, find, map} from "rxjs/operators";
import {Sort, Filter} from "./game"

@Injectable({
  providedIn: 'root'
})
export class GameService {


  constructor(private http: HttpClient) { }

  getGameList(sort?: Sort, filter? : string[]): Observable<Game[]>{
    const url: string = 'http://localhost:8000/api/jeux';


    let searchParams = new HttpParams();
    if(sort != undefined) searchParams.set("sort", sort.toString());
    if(filter != undefined){
      filter.forEach(couple => searchParams.set(couple[0], couple[1]))
    }

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

  getGameById(id: number): Observable<Game>{
    const url: string = 'http://localhost:8000/api/jeux/' + id;
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
}
