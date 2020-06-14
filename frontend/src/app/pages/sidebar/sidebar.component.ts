import { Component, OnInit } from '@angular/core';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { WebRequestService } from '../../web-request.service';
import { WorkspaceService } from '../../workspace.service';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import { MatDialog } from '@angular/material/dialog';
import { InvitationDialogContentComponent } from '../invitation-dialog-content/invitation-dialog-content.component';
import { stringify } from 'querystring';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	constructor(public dialog: MatDialog, private authRssiService: AuthRssiService, private authCollaboratorService: AuthCollaboratorService, private webService: WebRequestService, private workspaceService: WorkspaceService) { }
	rssiId: string;
	rssiWorkspaceId: string;
	rssiName: string;
	rssiOrg: string;

	collaboratorId: string;
	collabWorkspaceId: string;
	collabName: string;
	collabOrg: string;
	invitationId: string;

	ngOnInit(): void {
		this.rssiId = this.authRssiService.getRssiId();
		this.rssiWorkspaceId = this.authRssiService.getWorkSpaceId();
		this.rssiName = this.authRssiService.getRssiName();
		this.rssiOrg = this.authRssiService.getRssiOrg();

		this.collaboratorId = this.authCollaboratorService.getCollaboratorId();
		this.collabWorkspaceId = this.authCollaboratorService.getWorkspaceId();
		this.collabName = this.authCollaboratorService.getCollaboratorName();
		this.collabOrg = this.authCollaboratorService.getCollaboratorOrg();
		this.invitationId = this.authCollaboratorService.getInvitationId();
	}

	getUserState() {
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
				return 'Bienvenue ' + this.rssiName + ' !\n\nResponsable Sécurité du Système d\'Information de ' + this.rssiOrg + ' !';
			}
			case '2': {
				return 'Bienvenue ' + this.rssiName + ' !\n\nVous n\'avez pas encore crée un espace de travail.';
			}
			case '3': {
				return 'Bienvenue ' + this.collabName + ' !\n\nCollaborateur chez ' + this.collabOrg;
			}
			case '4': {
				return 'Bienvenue ' + this.collabName + ' !';
			}
			case '5': {
				return 'Bienvenue ' + this.collabName + ' !';
			}
			default: {
				return '';
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
