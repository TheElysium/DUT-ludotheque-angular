import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Game} from "./game";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, find, map, tap} from "rxjs/operators";
import {Sort, Filter} from "./game"
import {environment} from "../environments/environment";
import {Commentaire} from "./_models/commentaires";

@Injectable({
  providedIn: 'root'
})
export class GameService {


  constructor(private http: HttpClient) { }

  getGameList(sort?: string, filters? : string[]): Observable<Game[]>{
    const url: string = 'http://localhost:8000/api/jeux';

    let searchParams = new HttpParams();

    if(sort != undefined) {
      searchParams = searchParams.append("sort", sort);
      console.log(sort);
    }
    if(filters != undefined){
      if(filters.length != 0) filters.forEach(couple => searchParams = searchParams.append(couple[0], couple[1]))
    }


    return this.http.get<any>(url, {headers: new HttpHeaders({'Content-Type': 'application/json'}), params: searchParams })
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


  getGameUser(userId: number): Game[]{
    let gameUser: Game[] = [];

    this.getGameList().subscribe(
      (gameList: Game[]) => gameUser = gameList
    );

    return gameUser.filter((game: Game) => game.user.id === userId);
  }

  postComment(comment: Commentaire){
    const url = `${environment.apiUrl + '/commentaires'}`;
    console.log(url);
    // tslint:disable-next-line:no-shadowed-variable
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<any>(url, comment, httpOptions)
      .pipe(
        map(res => res.data.item),
        tap(body => console.log(body)),
        catchError(err => {
          console.log('Erreur http : ', err);
          return of(undefined);
        })
      );
  }
}
