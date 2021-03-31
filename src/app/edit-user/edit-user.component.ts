import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {UserInfo} from "../_models/user-info";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  loading: boolean;
  user: UserInfo

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getProfile().subscribe(
      user => {
        this.user = {...this.user, ...user};
        this.loading = false;
      },
      (err) => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'ERROR ZEBI' , key: 'main'});
        this.loading = false;
        this.router.navigateByUrl('/');
      }
    );
  }

  onSubmit(): void{
  }

  editUser($user: UserInfo): void{
    console.log("Modification d'un utilisateur");
    this.loading = true;
    this.userService.updateUser($user).subscribe( user => {
      this.loading = false;
      this.router.navigate(['/profile'])
      }
    )
  }

}
