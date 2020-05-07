import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageCollaboratorComponent } from './pages/login-page-collaborator/login-page-collaborator.component';
import { SignupPageCollaboratorComponent } from './pages/signup-page-collaborator/signup-page-collaborator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageRssiComponent } from './pages/login-page-rssi/login-page-rssi.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CreateWorkSpaceComponent } from './pages/create-work-space/create-work-space.component';
import { SignupPageRssiComponent } from './pages/signup-page-rssi/signup-page-rssi.component';
import { WebReqInterceptorRssi } from './web-req-rssi.interceptor';
import { EditRssiComponent } from './pages/edit-rssi/edit-rssi.component';
import { ProfilePageCollaboratorComponent } from './pages/profile-page-collaborator/profile-page-collaborator.component';
import { PageListCollaboratorsComponent } from './pages/page-list-collaborators/page-list-collaborators.component';
import { WebRequestInterceptorCollaborator } from './web-request-collaborator-interceptor.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageCollaboratorComponent,
    SignupPageCollaboratorComponent,
    LoginPageRssiComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    CreateWorkSpaceComponent,
    SignupPageRssiComponent,
    EditRssiComponent,
    ProfilePageCollaboratorComponent,
    PageListCollaboratorsComponent,
    LoginPageComponent
  ],
  imports: [
	FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatCheckboxModule,
  MatStepperModule,
  HttpClientModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptorCollaborator, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptorRssi, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
