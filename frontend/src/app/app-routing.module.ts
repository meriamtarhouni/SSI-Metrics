import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageCollaboratorComponent} from '../app/pages/login-page-collaborator/login-page-collaborator.component';
import {SignupPageCollaboratorComponent} from '../app/pages/signup-page-collaborator/signup-page-collaborator.component';
import { from } from 'rxjs';
import { LoginPageRssiComponent } from './pages/login-page-rssi/login-page-rssi.component';
import { SignupPageRssiComponent } from './pages/signup-page-rssi/signup-page-rssi.component';
import { EditRssiComponent } from './pages/edit-rssi/edit-rssi.component';

const routes: Routes = [
  { path: 'login-collab', component: LoginPageCollaboratorComponent },
  { path: 'signup-collab', component: SignupPageCollaboratorComponent },
  { path: 'login-rssi' , component:LoginPageRssiComponent },
  { path: 'signup-rssi' , component:SignupPageRssiComponent},
  { path: 'edit-rssi/:rssiId' ,component:EditRssiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
