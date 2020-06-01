import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { WorkspaceService } from 'src/app/workspace.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Collaborateur } from 'src/app/models/collaborateur.model'

@Component({
	selector: 'app-collaborators-list-rssi',
	templateUrl: './collaborators-list-rssi.component.html',
	styleUrls: ['./collaborators-list-rssi.component.css']
})
export class CollaboratorsListRssiComponent implements OnInit {
	totalNumber: number;
	totalCollabs: Collaborateur[] = [];
	workspaceCollabs: Collaborateur[] = [];
	workspaceNumber: number;
	invitedCollabs: Collaborateur[] = [];
	invitedNumber: number;
	unInvitedCollabs: Collaborateur[] = [];
	unInvitedNumber: number;
	organisationName: string;

	constructor(private route: ActivatedRoute, private authRssiService: AuthRssiService, private workspaceService: WorkspaceService, private router: Router) { }

	ngOnInit() {
		this.organisationName = this.authRssiService.getRssiOrg();
		this.workspaceService.getOrgCollaboratorsRssi(this.organisationName).subscribe((collaborateurs: Collaborateur[]) => {
			this.totalCollabs = collaborateurs;
			collaborateurs.forEach((collab: Collaborateur) => {
				if (collab.has_workspace) {
					this.workspaceCollabs.push(collab);
				}
				else if (collab.has_invitation) {
					this.invitedCollabs.push(collab);
				}
				else {
					this.unInvitedCollabs.push(collab);
				}
			});

			this.updateNumbers();

			console.log('TotalCollabs: ', this.totalCollabs);
			console.log('WorkspaceCollabs: ', this.workspaceCollabs);
			console.log('InvitedCollabs: ', this.invitedCollabs);
			console.log('UnInvitedCollabs: ', this.unInvitedCollabs);
		});
	}

	updateNumbers() {
		this.totalNumber = this.totalCollabs.length;
		this.workspaceNumber = this.workspaceCollabs.length;
		this.invitedNumber = this.invitedCollabs.length;
		this.unInvitedNumber = this.unInvitedCollabs.length;
	}

	inviteCollab(event, collabId: string) {
		this.workspaceService.inviteCollab(collabId).subscribe((res: any) => {
		});

		let collabToInvite: Collaborateur;
		this.unInvitedCollabs.forEach((collab: Collaborateur) => {
			if (collab._id == collabId) {
				collabToInvite = collab;
			}
		});
		let index = this.unInvitedCollabs.indexOf(collabToInvite);
		this.unInvitedCollabs.splice(index, 1);
		this.invitedCollabs.push(collabToInvite);

		this.updateNumbers();
	}

	removeCollab(event, collabId: string) {
		this.workspaceService.removeCollab(collabId).subscribe((res: any) => {
		});

		let collabToRemove: Collaborateur;
		this.workspaceCollabs.forEach((collab: Collaborateur) => {
			if (collab._id == collabId) {
				collabToRemove = collab;
			}
		});
		let index = this.workspaceCollabs.indexOf(collabToRemove);
		this.workspaceCollabs.splice(index, 1);
		this.unInvitedCollabs.push(collabToRemove);

		this.updateNumbers();
	}
}
