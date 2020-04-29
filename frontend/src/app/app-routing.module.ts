import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageCollaboratorComponent} from '../app/pages/login-page-collaborator/login-page-collaborator.component';
import {SignupPageCollaboratorComponent} from '../app/pages/signup-page-collaborator/signup-page-collaborator.component';
import { from } from 'rxjs';
import { LoginPageRssiComponent } from './pages/login-page-rssi/login-page-rssi.component';
import {ProfilePageCollaboratorComponent} from  './pages/profile-page-collaborator/profile-page-collaborator.component'; 
import {PageListCollaboratorsComponent} from './pages/page-list-collaborators/page-list-collaborators.component'

const routes: Routes = [
  { path: 'login-collab', component: LoginPageCollaboratorComponent },
  { path: 'signup-collab', component: SignupPageCollaboratorComponent },
  { path: 'login-rssi' , component:LoginPageRssiComponent }, 
  {path : 'profil-collaborateur/:collaborateurId', component: ProfilePageCollaboratorComponent}, 
  {path: 'collaborateurs' , component: PageListCollaboratorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
