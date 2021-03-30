import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  static httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  get nom(): AbstractControl {
    return this.formulaire.get('nom');
  }

  get prenom(): AbstractControl {
    return this.formulaire.get('prenom');
  }

  get pseudo(): AbstractControl {
    return this.formulaire.get('pseudo');
  }

  get email(): AbstractControl {
    return this.formulaire.get('email');
  }

  get password(): AbstractControl{
    return this.formulaire.get('password');
  }

  titre: string;

  form: any = {
    prenom: null,
    nom: null,
    pseudo: null,
    password: null,
    email: null
  };

  formulaire: FormGroup = new FormGroup({
    prenom: new FormControl(undefined, [Validators.required, Validators.minLength(3)]),
    nom: new FormControl(undefined, [Validators.required]),
    pseudo: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required]),
    email: new FormControl(undefined, [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.formulaire.value};
    if (this.formulaire.valid){
      console.log(this.form.prenom, this.form.nom);
      console.log('register() function');
      const registeredUser: Observable<any> = this.register(this.form.prenom, this.form.nom, this.form.pseudo, this.form.email, this.form.password);
      registeredUser.subscribe(value => {
        console.log('Registered : ' + value);
        this.registered(value);
      });
    }
  }



  register(prenom: string, nom: string, pseudo: string, email: string, password: string): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, {prenom, nom, pseudo, email, password}, FormUserComponent.httpOptions);
  }

  registered(response): any{
    this.router.navigate(['/login']);
  }
}
