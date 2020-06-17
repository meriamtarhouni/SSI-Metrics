import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../workspace.service';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';

@Component({
	selector: 'app-invitation-dialog-content',
	templateUrl: './invitation-dialog-content.component.html',
	styleUrls: ['./invitation-dialog-content.component.css']
})
export class InvitationDialogContentComponent implements OnInit {

	organizationName: string;

	constructor(private authCollaboratorService: AuthCollaboratorService, private workspaceService: WorkspaceService) { }

	ngOnInit(): void {
		this.organizationName = this.authCollaboratorService.getCollaboratorOrg();
	}

	acceptInvitation() {
		this.workspaceService.acceptInvitation();
		console.log("Invitation accepted!");
	}

}
