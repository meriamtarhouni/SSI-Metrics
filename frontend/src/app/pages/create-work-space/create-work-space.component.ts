import { Component, OnInit } from '@angular/core';
import {Collaborateur} from 'src/app/models/collaborateur.model'
import { WorkspaceService } from 'src/app/workspace.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import {CollaboratorService } from 'src/app/collaborator.service' ; 
import { PageListCollaboratorsComponent } from '../page-list-collaborators/page-list-collaborators.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create-work-space',
	templateUrl: './create-work-space.component.html',
	styleUrls: ['./create-work-space.component.css']
})
export class CreateWorkSpaceComponent implements OnInit {

	constructor(private workspaceService: WorkspaceService,private authRssiService: AuthRssiService, private collaboratorService: CollaboratorService, private router: Router) { }
	
	currentRssiId: string;
  	collaborateurs: Collaborateur[];
  	collaborateursToInvite: string[];
	organisationName : string;
	workspaceId : string;

	ngOnInit(): void {
		this.currentRssiId=this.authRssiService.getRssiId();
        this.organisationName=this.authRssiService.getRssiOrg();
        this.collaborateursToInvite = [];

		this.workspaceService.getOrgCollaboratorsRssi(this.organisationName).subscribe((collaborateurs: Collaborateur[]) => {
  			this.collaborateurs = collaborateurs;
  		});
	}

	onCreateButtonClicked(nom: string){
		this.workspaceService.createWorkspace(nom).subscribe((res: any) => {
			this.workspaceId=res._id;

			this.collaborateursToInvite.forEach(collabId => {
				this.workspaceService.inviteCollab(collabId);
			});

			setTimeout(() => {
				this.router.navigate(['/workspace/rssi',this.workspaceId]);
			}, 500);
		});
	}

	onCollabClicked(event, collabId: string){
		console.log("Clicked on " + collabId);
		let index = this.collaborateursToInvite.indexOf(collabId);
		if(index == -1){
			this.collaborateursToInvite.push(collabId)
		}
		else{
			this.collaborateursToInvite.splice(index, 1);
		}
	}

}
