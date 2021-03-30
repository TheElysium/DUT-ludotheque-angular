import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';



@Component({
    selector: 'app-create-user',
    templateUrl: 'register.component.html',
})

export class RegisterComponent implements OnInit{
    userId: number;
    loading: boolean;
    user: User;

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {

    }
  // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit(): void {
    this.userId= +this.route.snapshot.paramMap.get('id');
    this.user = {id: this.userId, nom: undefined, prenom: undefined, pseudo: undefined, email: undefined};
    console.log(this.user);
  }
  createUser($user: User): void {
    console.log('Demande de création d\' un user, $user ');
    this.loading = true;
    this.userService.createUser($user).subscribe(user => {
      console.log('Retour du serveur ', this.user.id);
      this.loading = false;
    });

  }
}
