import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {MessageService} from 'primeng/api';
import {AuthentificationService} from './_services/authentification.service';
import {ThemeService} from "./theme.service";
import {Theme} from "./theme";
import {EditorService} from "./editor.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'ludotheque-client';

  themes: Theme[];

constructor(public messageService: MessageService, public authService: AuthentificationService) {
}

  // show(): void {
  //   const now = moment().format('LL');
  //   this.messageService.add({
  //     key: 'main',
  //     severity: 'info',
  //     detail: `${this.title}, ${now}`,
  //   });
  // }
  //

  logout(): void {
    this.authService.logout();
  }




}
