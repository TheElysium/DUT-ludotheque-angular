import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthentificationService} from './_services/authentification.service';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {registerLocaleData} from '@angular/common';
import {MomentModule} from 'ngx-moment';
import 'moment/locale/fr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptorService} from './_services/jwt-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import {UserService} from './_services/user.service';
import { LpSolverTestComponent } from './lp-solver-test/lp-solver-test.component';
import {MarkdownModule} from 'ngx-markdown';
import { AlertService } from './_services/index';
import { ErrorMessageComponent } from './error-message/error-message.component';

import { GameListComponent } from './game-list/game-list.component';
import {GameService} from './game.service';
import { GameCardComponent } from './game-card/game-card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { GameDetailsComponent } from './game-details/game-details.component';
import { AjoutJeuComponent } from './ajout-jeu/ajout-jeu.component';
import { FormUserComponent } from './form-user/form-user.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { APP_BASE_HREF} from '@angular/common';
import {EditorService} from "./editor.service";
import {ThemeService} from "./theme.service";
import { EditUserComponent } from './edit-user/edit-user.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    LpSolverTestComponent,
    ErrorMessageComponent,
    GameCardComponent,
    PageNotFoundComponent,
    GameListComponent,
    AjoutJeuComponent,
    FormUserComponent,
    HomeComponent,
    GameDetailsComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    MomentModule,
    MessagesModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [AuthentificationService, MessageService,
    {provide: LOCALE_ID, useValue: 'fr-FR'},
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    UserService,
    AlertService,
    AuthentificationService,
    GameService,
    {provide: APP_BASE_HREF, useValue : '/'},
    EditorService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
