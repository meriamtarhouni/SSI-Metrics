import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageCollaboratorComponent} from '../app/pages/login-page-collaborator/login-page-collaborator.component';
import {SignupPageCollaboratorComponent} from '../app/pages/signup-page-collaborator/signup-page-collaborator.component';
import { from } from 'rxjs';
import { LoginPageRssiComponent } from './pages/login-page-rssi/login-page-rssi.component';
import { SignupPageRssiComponent } from './pages/signup-page-rssi/signup-page-rssi.component';
import { EditRssiComponent } from './pages/edit-rssi/edit-rssi.component';
import {ProfilePageCollaboratorComponent} from  './pages/profile-page-collaborator/profile-page-collaborator.component'; 
import {PageListCollaboratorsComponent} from './pages/page-list-collaborators/page-list-collaborators.component'; 
import {LoginPageComponent} from '../app/pages/login-page/login-page.component';
import { PhaseComponent } from './pages/phase/phase.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'login-collab', component: LoginPageCollaboratorComponent },
  { path: 'signup-collab', component: SignupPageCollaboratorComponent },
  { path: 'login-rssi' , component:LoginPageRssiComponent },
  { path: 'signup-rssi' , component:SignupPageRssiComponent},
  { path: 'edit-rssi/:rssiId' ,component:EditRssiComponent},
  {path : 'profil-collaborateur/:collaborateurId', component: ProfilePageCollaboratorComponent}, 
  {path: 'collaborateurs' , component: PageListCollaboratorsComponent},
  {path: 'phases', component: PhaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
