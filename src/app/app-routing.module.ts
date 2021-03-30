import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {LpSolverTestComponent} from './lp-solver-test/lp-solver-test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AjoutJeuComponent} from './ajout-jeu/ajout-jeu.component';
import {FormUserComponent} from './form-user/form-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'ro', component: LpSolverTestComponent},
  { path: 'register', component: FormUserComponent }
  { path: 'register', component: FormUserComponent },
  {path: 'add-game', component: AjoutJeuComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
