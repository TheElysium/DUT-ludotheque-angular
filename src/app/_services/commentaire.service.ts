import { Injectable } from '@angular/core';
import {Commentaire} from "../_models/commentaires";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  constructor(private http: HttpClient) { }

  postComment(note: number, commentaire: string, jeu_id: number, date_com: string){
    const url = `${environment.apiUrl + '/commentaires'}`;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    const data = {
      "note": note,
      "commentaire": commentaire,
      "jeu_id": jeu_id,
      "date_com": date_com,
    }

    return this.http.post<any>(url, data, httpOptions)
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
