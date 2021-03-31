import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Theme} from "./theme";
import {catchError, map} from "rxjs/operators";
import {Editor} from "./editor";

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private http: HttpClient) { }

  getEditors(): Observable<Editor[]> {
    const url: string = 'http://localhost:8000/api/editeurs';
    console.log("Retreiving editors ...");
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
