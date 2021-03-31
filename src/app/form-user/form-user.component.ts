import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {MesValidateurs} from '../MesValidateurs';
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";
import {User} from "../_models/user";
import {UserInfo} from "../_models/user-info";

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css', '../app.component.css']
})
export class FormUserComponent implements OnInit {

  @Input() user: UserInfo | undefined;
  @Input() edit: boolean = false;
  @Output() updatedUser: EventEmitter<UserInfo>;


  formulaire: FormGroup = new FormGroup({
      prenom: new FormControl(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      nom: new FormControl(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      pseudo: new FormControl(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      email: new FormControl(undefined, [Validators.required, Validators.email]),
      rgpd: new FormControl(undefined, [Validators.required, Validators.requiredTrue]),
      pwd: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
        confirmPassword: new FormControl('', [Validators.required]),
        // @ts-ignore
      }, [MesValidateurs.mustMatch])
    },
  );


  static httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
    this.updatedUser = new EventEmitter<UserInfo>();
  }

  ngOnInit(): void {
    if(this.user !== undefined){
      this.fillForm();
      this.changeRequiredFields();
    }
  }

  onSubmit(): void {
    this.form = {...this.form, ...this.formulaire.value};

    if (this.formulaire.valid){
      console.log("Valid form...");

      console.log(this.user);

      if (this.edit){
        this.user = { ...this.user, ...this.formulaire.value};
        console.log("Updating user...");
        this.updatedUser.emit(this.user);
      }
      else {
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
    else console.log("Invalid form !");
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

  get rgpd(): AbstractControl{
    return this.formulaire.get('rgpd');
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


  // TO-DO -> changer les messages d'erreurs dans form-user-component
  // j'ai modifié les validators ils ne correspondaient pas à ceux demandés dans l'issue
  // (https://www.cril.univ-artois.fr/~hemery/enseignement/An20-21/projetTutS4/)


  register(prenom: string, nom: string, pseudo: string, email: string, password: string): Observable<any>{
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, {prenom, nom, pseudo, email, password}, FormUserComponent.httpOptions);
  }

  registered(): any{
    this.messageService.add({severity: 'info', summary: 'Enregistrement', detail: `Bienvenue, ${this.pseudo}`, key: 'main'});
    this.router.navigate(['/login'], { queryParams: { email: this.form.email } } );
  }

  fillForm() {
    console.log('Fill form');
    this.formulaire.patchValue({
      nom: this.user.nom,
      prenom: this.user.prenom,
      pseudo: this.user.pseudo,
      email: this.user.email,
    })
  }

  changeRequiredFields() {
    this.pwd.get("password").setValidators(null);
    this.pwd.get("confirmPassword").setValidators(null);
  }
}
