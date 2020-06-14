import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import { WorkspaceService } from 'src/app/workspace.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { CollaboratorService } from 'src/app/collaborator.service' ; 
import { Collaborateur } from 'src/app/models/collaborateur.model'

@Component({
	selector: 'app-collaborators-list',
	templateUrl: './collaborators-list.component.html',
	styleUrls: ['./collaborators-list.component.css']
})
export class CollaboratorsListComponent implements OnInit {
	workspaceCollabs: Collaborateur[] = [];
	workspaceNumber: number;
	organisationName: string;
	
	constructor(private route: ActivatedRoute, private authCollaboratorService: AuthCollaboratorService, private collaboratorService: CollaboratorService, private router: Router) { }
	
	ngOnInit(): void {
		this.organisationName = this.authCollaboratorService.getCollaboratorOrg();
		this.collaboratorService.getOrgCollaborators(this.organisationName).subscribe((collaborateurs: Collaborateur[]) => {
			collaborateurs.forEach((collab: Collaborateur) => {
				if (collab.has_workspace) {
					this.workspaceCollabs.push(collab);
				}
			});

			console.log('WorkspaceCollabs: ', this.workspaceCollabs);
			this.workspaceNumber = this.workspaceCollabs.length;
		});
	}
	
}
