import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageCollaboratorComponent } from '../app/pages/login-page-collaborator/login-page-collaborator.component';
import { SignupPageCollaboratorComponent } from '../app/pages/signup-page-collaborator/signup-page-collaborator.component';
import { from } from 'rxjs';
import { LoginPageRssiComponent } from './pages/login-page-rssi/login-page-rssi.component';
import { CreateWorkSpaceComponent } from './pages/create-work-space/create-work-space.component';
import { SignupPageRssiComponent } from './pages/signup-page-rssi/signup-page-rssi.component';
import { EditRssiComponent } from './pages/edit-rssi/edit-rssi.component';
import { ProfilePageCollaboratorComponent } from './pages/profile-page-collaborator/profile-page-collaborator.component';
import { PageListCollaboratorsComponent } from './pages/page-list-collaborators/page-list-collaborators.component';
import { LoginPageComponent } from '../app/pages/login-page/login-page.component';
import { PhaseComponent } from './pages/phase/phase.component';
import { ExigenceComponent } from './pages/exigence/exigence.component';
import { SousTacheComponent } from './pages/sous-tache/sous-tache.component';
import { WorkSpaceComponent } from './pages/work-space/work-space.component';
import { ChecklistComponent } from './pages/checklist/checklist.component'
import { WorkSpaceCollaboratorViewComponent } from './pages/work-space-collaborator-view/work-space-collaborator-view.component';
import { CollaboratorsListRssiComponent } from './pages/collaborators-list-rssi/collaborators-list-rssi.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'login-collab', component: LoginPageCollaboratorComponent },
  { path: 'signup-collab', component: SignupPageCollaboratorComponent },
  { path: 'create-space', component: CreateWorkSpaceComponent },
  { path: 'login-rssi', component: LoginPageRssiComponent },
  { path: 'signup-rssi', component: SignupPageRssiComponent },
  { path: 'edit-rssi/:rssiId', component: EditRssiComponent },
  { path: 'profil-collaborateur/:collaborateurId', component: ProfilePageCollaboratorComponent },
  { path: 'collaborateurs', component: PageListCollaboratorsComponent },
  { path: 'phases', component: PhaseComponent },
  { path: 'exigences/:phaseId', component: ExigenceComponent },
  { path: 'exigences/:phaseId/:exigenceId', component: ExigenceComponent },
  { path: 'sousTaches/:tacheId', component: SousTacheComponent },
  { path: 'workspace/rssi/:workspaceId', component: WorkSpaceComponent },
  { path: 'workspace/rssi/:workspaceId/collaborators', component: CollaboratorsListRssiComponent },
  { path: 'workspace/collaborator/:workspaceId', component: WorkSpaceCollaboratorViewComponent },
  { path: 'checklist/:phaseId', component: ChecklistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
