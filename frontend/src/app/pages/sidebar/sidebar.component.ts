import { Component, OnInit } from '@angular/core';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { WebRequestService } from '../../web-request.service';
import { WorkspaceService } from '../../workspace.service';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import { MatDialog } from '@angular/material/dialog';
import { InvitationDialogContentComponent } from '../invitation-dialog-content/invitation-dialog-content.component';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	constructor(public dialog: MatDialog, private authRssiService: AuthRssiService, private authCollaboratorService: AuthCollaboratorService, private webService: WebRequestService, private workspaceService: WorkspaceService) { }
	rssiId: string;
	rssiWorkspaceId: string;
	collaboratorId: string;
	collabWorkspaceId: string;
	collabOrg: string;
	invitationId: string;

	ngOnInit(): void {
		this.rssiId = this.authRssiService.getRssiId();
		this.rssiWorkspaceId = this.authRssiService.getWorkSpaceId();

		this.collaboratorId = this.authCollaboratorService.getCollaboratorId();
		this.collabWorkspaceId = this.authCollaboratorService.getWorkspaceId();
		this.invitationId = this.authCollaboratorService.getInvitationId();
		this.collabOrg = this.authCollaboratorService.getCollaboratorOrg();
	}

	getUserState() {                                     // MUST BE CHANGED TO AN EVENT LISTENER FOR PERFORMANCE
		let isRssi = this.authRssiService.isLoggedIn();
		let isCollaborator = this.authCollaboratorService.isLoggedIn();

		console.assert(!isRssi || !isCollaborator);

		if (isRssi) {
			let hasWorkspace = this.authRssiService.hasWorkspace();
			if (hasWorkspace) return '1';
			else return '2';
		}
		else if (isCollaborator) {
			let hasWorkspace = this.authCollaboratorService.hasWorkspace();
			let isInvited = this.authCollaboratorService.hasInvitation();
			if (hasWorkspace) return '3';
			else if (isInvited) return '4';
			else return '5';
		}
		else return '0';
	}

	getUserStateMsg() {
		switch (this.getUserState()) {
			case '1': {
				return 'Logged in as: RSSI';
			}
			case '2': {
				return 'Logged in as: RSSI';
			}
			case '3': {
				return 'Logged in as: Collaborator';
			}
			case '4': {
				return 'Logged in as: Collaborator';
			}
			case '5': {
				return 'Logged in as: Collaborator';
			}
			default: {
				return 'Not logged in';
			}
		}
	}

	openInvitationDialog() {
		const dialogRef = this.dialog.open(InvitationDialogContentComponent);

		dialogRef.afterClosed().subscribe(result => {
			if (result == true) {
				let workspaceId = this.authCollaboratorService.getInvitationById(this.invitationId).subscribe((invitation: any) => {
					this.authCollaboratorService.setWorkspace(invitation.workspaceId);
				});
			}
		});
	}

	onLogoutCollaborateurClicked() {
		this.authCollaboratorService.logout()
		// we have logged out successfully
		console.log("Great");
	}

	onLogoutRssiClicked() {
		this.authRssiService.logout()
		// we have logged out successfully
		console.log("Great");
	}

}
