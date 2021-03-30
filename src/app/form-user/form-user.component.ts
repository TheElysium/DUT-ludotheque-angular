import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MesValidateurs} from '../MesValidateurs';
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  static httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
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
    return this.formulaire.get('pwd').get('password');
  }
  get confirmPassword(): AbstractControl{
    return this.formulaire.get('pwd').get('confirmPassword');
  }
  get pwd(): AbstractControl{
    return this.formulaire.get('pwd');
  }
  titre: string;

  form: any = {
    prenom: null,
    nom: null,
    pseudo: null,
    password: null,
    confirmPassword: null,
    email: null
  };


  formulaire: FormGroup = new FormGroup({
    prenom: new FormControl(undefined, [Validators.required, Validators.minLength(3)]),
    nom: new FormControl(undefined, [Validators.required]),
    pseudo: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [Validators.required, Validators.email]),
    pwd: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    // @ts-ignore
    }, [MesValidateurs.mustMatch])
  },
  );

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.formulaire.value};
    if (this.formulaire.valid){
      console.log(this.form.prenom, this.form.nom);
      console.log('register() function');
      // tslint:disable-next-line:max-line-length
      const registeredUser: Observable<any> = this.register(this.form.prenom, this.form.nom, this.form.pseudo, this.form.email, this.form.pwd.password);
      registeredUser.subscribe(value => {
        console.log('Registered : ' + value);
        this.registered();
      });
    }
  }

  register(prenom: string, nom: string, pseudo: string, email: string, password: string): Observable<any>{
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, {prenom, nom, pseudo, email, password}, FormUserComponent.httpOptions);
  }

  registered(): any{
    this.messageService.add({severity: 'info', summary: 'Enregistrement', detail: `Bienvenue, ${this.pseudo}`, key: 'main'});
    this.router.navigate(['/login'], { queryParams: { email: this.form.email } } );
  }
}
