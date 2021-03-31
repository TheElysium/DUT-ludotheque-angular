import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AjoutJeuComponent} from './ajout-jeu/ajout-jeu.component';
import {FormUserComponent} from './form-user/form-user.component';
import {GameListComponent} from './game-list/game-list.component';
import {HomeComponent} from './home/home.component';
import {GameDetailsComponent} from './game-details/game-details.component';
import {EditUserComponent} from "./edit-user/edit-user.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'games', component: GameListComponent},
  {path: 'game/:id', component: GameDetailsComponent},
  {path: 'ro', component: LpSolverTestComponent},
  { path: 'register', component: FormUserComponent },
  {path: 'add-game', component: AjoutJeuComponent},
  {path: 'user/:id/edit', component: EditUserComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
