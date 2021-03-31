import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Theme} from "../theme";
import {ThemeService} from "../theme.service";
import {Editor} from "../editor";
import {EditorService} from "../editor.service";

@Component({
  selector: 'app-ajout-jeu',
  templateUrl: './ajout-jeu.component.html',
  styleUrls: ['./ajout-jeu.component.css']
})

export class AjoutJeuComponent implements OnInit {
  themes: Theme[];
  editeurs: Editor[];

  get nom(): AbstractControl {
    return this.formulaire.get('nom');
  }
  get description(): AbstractControl {
    return this.formulaire.get('description');
  }
  get theme(): AbstractControl {
    return this.formulaire.get('theme');
  }
  get editeur(): AbstractControl {
    return this.formulaire.get('editeur');
  }
  get mecanique(): AbstractControl {
    return this.formulaire.get('mecanique');
  }
  get categorie(): AbstractControl {
    return this.formulaire.get('categorie');
  }
  get regle(): AbstractControl {
    return this.formulaire.get('regle');
  }
  get langue(): AbstractControl {
    return this.formulaire.get('langue');
  }
  get nombre_de_joueurs(): AbstractControl {
    return this.formulaire.get('nombre_de_joueurs');
  }
  get age(): AbstractControl {
    return this.formulaire.get('age');
  }
  get poids(): AbstractControl {
    return this.formulaire.get('poids');
  }
  get duree(): AbstractControl {
    return this.formulaire.get('duree');
  }

  constructor(private http: HttpClient, private router: Router, private themeService: ThemeService, private editorService: EditorService) {
  }

  static httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  formulaire = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required]),
    theme: new FormControl('', [Validators.required]),
    editeur: new FormControl('', [Validators.required]),
    mecanique: new FormControl('', [Validators.required]),
    url_media: new FormControl(''),
    categorie: new FormControl('', [Validators.required]),
    regle: new FormControl('', [Validators.required]),
    langue: new FormControl('', [Validators.required]),
    nombre_de_joueurs: new FormControl('', [Validators.required, Validators.pattern('^[2-8]*$'), Validators.maxLength(1)]),
    age: new FormControl('', [Validators.required, Validators.pattern('^\\d$|^1[0-6]$'), Validators.maxLength(2)]),
    poids: new FormControl('', [Validators.required, Validators.pattern('^[0-5]+[.,]+\\d{1,2}(?:\\d)?$'), Validators.maxLength(5)]),
    duree: new FormControl('', [Validators.required])
  });

  form: any = {
    nom: null,
    description: null,
    theme: null,
    editeur: null,
    mecanique: null,
    url_media: null,
    categorie: null,
    regle: null,
    langue: null,
    nombre_de_joueurs: null,
    age: null,
    poids: null,
    duree: null
  };


  ngOnInit(): void {
    this.themeService.getThemes().subscribe(value => this.themes = value);
    this.editorService.getEditors().subscribe(value => this.editeurs = value);
  }
  onSubmit(): void {
    this.form = {...this.form, ...this.formulaire.value};
    if (this.formulaire.valid){
      if(this.form === ''){
        this.form = 'Non catégorisé';
      }
      const registeredGame: Observable<any> = this.addGame(this.form.nom, this.form.description, this.form.theme, this.form.editeur, this.form.mecanique, this.form.url_media, this.form.regle, this.form.langue, this.form.nombre_de_joueurs, this.form.age, this.form.poids, this.form.duree);
      registeredGame.subscribe(value => {
        console.log('Added game : ' + value);
      });
    }
  }

  addGame(nom: string, description: string, theme: string, editeur: string, mecanique: string, url_media: string, regle: string, langue: string, nombre_de_joueurs: string, age: string, poids: string, duree: string): Observable<any>{
    if (url_media !== ''){
      url_media = 'public/' + url_media;
    }
    return this.http.post<any>(`${environment.apiUrl}/jeux`, {nom, description, theme, editeur, mecanique, url_media, regle, langue, nombre_de_joueurs, age, poids, duree}, AjoutJeuComponent.httpOptions);
  }


}
