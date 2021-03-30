import {AbstractControl, FormGroup} from '@angular/forms';

export class MesValidateurs {
  // tslint:disable-next-line:typedef
  static mustMatch(c: AbstractControl): { [s: string]: boolean} {
    if (c.get('password').value !== c.get('confirmPassword').value){
      return {invalid: true};
    }
    return null;
  }
}
