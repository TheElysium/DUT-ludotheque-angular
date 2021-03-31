import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {UserInfo} from '../_models/user-info';
import {Observable} from 'rxjs';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {Game} from '../game';
import {GameService} from '../game.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthentificationService} from "../_services/authentification.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthentificationService, private http: HttpClient, private userService: UserService, private messageService: MessageService, private router: Router, private gameService: GameService) {
    this.loading = false;
  }
  static httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  form: any = {
    game: null,
    storage: null,
    date: null,
    price: null
  };
  error = '';

  errorMessages = [];
  loading: boolean;
  user: UserInfo;
  games: Game[];
  gameUser: Game[];
  formulaire = new FormGroup({
    game: new FormControl('', [Validators.required]),
    storage: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern('^\\b([1-9]|[1-9][0-9]|[1-2][0-4][1-9])$')])
  });

  ngOnInit(): void {
    this.loading = true;
    this.userService.getProfile().subscribe(
      user => {
        this.user = {...this.user, ...user};
        this.loading = false;
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'impossible d\'obtenir le profil de l\'utilisateur' , key: 'main'});
        this.loading = false;
        this.router.navigateByUrl('/');
      }
    );
    this.getGameList();
  }
  get game(): AbstractControl {
    return this.formulaire.get('game');
  }

  get date(): AbstractControl {
    return this.formulaire.get('date');
  }

  get price(): AbstractControl {
    return this.formulaire.get('price');
  }

  get storage(): AbstractControl {
    return this.formulaire.get('storage');
  }
  getGameList(sort?: string, filters?: string[]): void{
    this.gameService.getGameList(sort, filters).subscribe(
      (gameList: Game[]) => this.games = gameList
    );
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.form = {...this.form, ...this.formulaire.value};
    if (this.formulaire.valid) {
      console.log(this.form.game, this.form.date);
      console.log('register() function');
      // tslint:disable-next-line:max-line-length
      const registeredUser: Observable<any> = this.achat(this.form.game, this.form.date, this.form.storage, this.form.price);
      registeredUser.subscribe(value => {
        console.log('Registered : ' + value);
      });
    }
  }
  // tslint:disable-next-line:variable-name
  achat(jeu_id: number, date_achat: string, lieu: string, prix: number): Observable<any>{
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${environment.apiUrl}/users/${this.authService.userValue.id}/achat`, {jeu_id, date_achat, lieu, prix}, ProfileComponent.httpOptions);
  }
}
