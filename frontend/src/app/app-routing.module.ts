import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageRssiComponent } from './pages/login-page-rssi/login-page-rssi.component';
import { AppComponent } from './app.component';
import { SignupPageCollaboratorComponent } from './pages/signup-page-collaborator/signup-page-collaborator.component';


const routes: Routes = [
 
  { path: 'loginRssi', component: LoginPageRssiComponent },
  {path: 'signUpCollaborateur', component: SignupPageCollaboratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
