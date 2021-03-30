import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../_models/user';

interface Natures {
  nom: string;
}

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  titre: string;

  @Input() user: User;
  @Output() updatedUser: EventEmitter<User>;

  formulaire: FormGroup = new FormGroup({
    prenom: new FormControl(undefined, [Validators.required, Validators.minLength(3)]),
    nom: new FormControl(undefined, [Validators.required]),
    pseudo: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required]),
    email: new FormControl(undefined, [Validators.required, Validators.email]),
  });

  constructor() {
    this.updatedUser = new EventEmitter<User>();
  }

  ngOnInit(): void {
    if (this.user.id !== undefined) {
      this.fillForm();
    }
    if (this.user.id === undefined) {
      this.titre = 'Creation User';
    } else {
      this.titre = 'Modification User';
      this.fillForm();
    }
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

  fillForm(): void {
    this.formulaire.patchValue({
      nom: this.user.nom,
      prenom: this.user.prenom,
      pseudo: this.user.pseudo,
      email: this.user.email,
    });
  }

  onSubmit(): void {
    this.user = { ...this.user, ...this.formulaire.value};
    console.log('après modification : ', this.user);
    this.updatedUser.emit(this.user);
  }
}
