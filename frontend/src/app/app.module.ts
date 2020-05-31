import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageCollaboratorComponent } from './pages/login-page-collaborator/login-page-collaborator.component';
import { SignupPageCollaboratorComponent } from './pages/signup-page-collaborator/signup-page-collaborator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageRssiComponent } from './pages/login-page-rssi/login-page-rssi.component';
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
import { PhaseComponent } from './pages/phase/phase.component';
import { ExigenceComponent } from './pages/exigence/exigence.component';
import { SousTacheComponent } from './pages/sous-tache/sous-tache.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { AddCollaborateurComponent } from './pages/add-collaborateur/add-collaborateur.component';
import { WorkSpaceComponent } from './pages/work-space/work-space.component';
import { ChecklistComponent } from './pages/checklist/checklist.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkSpaceCollaboratorViewComponent } from './pages/work-space-collaborator-view/work-space-collaborator-view.component';
import { CollaboratorsListRssiComponent } from './pages/collaborators-list-rssi/collaborators-list-rssi.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageCollaboratorComponent,
    SignupPageCollaboratorComponent,
    LoginPageRssiComponent,
    SidebarComponent,
    FooterComponent,
    CreateWorkSpaceComponent,
    SignupPageRssiComponent,
    EditRssiComponent,
    ProfilePageCollaboratorComponent,
    PageListCollaboratorsComponent,
    LoginPageComponent,
    PhaseComponent,
    ExigenceComponent,
    SousTacheComponent,
    AddCollaborateurComponent,
    WorkSpaceComponent,
    ChecklistComponent,
    WorkSpaceCollaboratorViewComponent,
    CollaboratorsListRssiComponent
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
    HttpClientModule,
    MatDialogModule,
    DragDropModule,
    MatTabsModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptorCollaborator, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptorRssi, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }