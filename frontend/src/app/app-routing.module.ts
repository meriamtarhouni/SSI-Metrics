import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageCollaboratorComponent} from '../app/pages/login-page-collaborator/login-page-collaborator.component';
import {SignupPageCollaboratorComponent} from '../app/pages/signup-page-collaborator/signup-page-collaborator.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'login-collab', component: LoginPageCollaboratorComponent },
  { path: 'signup-collab', component: SignupPageCollaboratorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
