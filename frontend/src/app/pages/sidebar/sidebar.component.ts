import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { WebRequestService } from '../../web-request.service';
import { WorkspaceService } from '../../workspace.service';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import { MatDialog } from '@angular/material/dialog';
import { InvitationDialogContentComponent } from '../invitation-dialog-content/invitation-dialog-content.component';
import { CollaboratorService } from 'src/app/collaborator.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	
	isRssi: boolean;
	isCollaborator: boolean;
	hasWorkspace: boolean;
	isInvited: boolean;

	rssiId: string;
	rssiWorkspaceId: string;
	rssiName: string;
	rssiOrg: string;
	
	collaboratorId: string;
	collabWorkspaceId: string;
	collabName: string;
	collabOrg: string;
	invitationId: string;
	
	userStateNbr: string = '';
	userStateMsg: string = '';
	
	constructor(public dialog: MatDialog, private authRssiService: AuthRssiService, private authCollaboratorService: AuthCollaboratorService, private workspaceService: WorkspaceService) { }
	
	ngOnInit(): void {
		this.updateAllInfo();
		console.log(this.userStateMsg);
		
		this.authRssiService.sidebarState.subscribe((res) => {
			this.updateAllInfo();
			console.log('Updated sidebar from rssi');
		});

		this.authCollaboratorService.sidebarState.subscribe((res) => {
			this.updateAllInfo();
			console.log('Updated sidebar from collaborator');
		});

		this.workspaceService.sidebarState.subscribe((res) => {
			this.updateAllInfo();
			console.log('Updated sidebar from collaborator');
		});
	}

	updateAllInfo(){
		this.updateFields();
		this.updateUserStateNbr();
		this.updateUserStateMsg();
	}

	ngOnDestroy(): void{
		this.authRssiService.sidebarState.unsubscribe();
		this.authCollaboratorService.sidebarState.unsubscribe();
		this.workspaceService.sidebarState.unsubscribe();
	}

	updateFields(){
		this.isRssi = this.authRssiService.isLoggedIn();
		this.isCollaborator = this.authCollaboratorService.isLoggedIn();

		this.hasWorkspace = this.authCollaboratorService.hasWorkspace();
		this.isInvited = this.authCollaboratorService.hasInvitation();

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

	updateUserStateNbr() {
		if (this.isRssi) {
			if (this.hasWorkspace) this.userStateNbr = '1';
			else this.userStateNbr = '2';
		}
		else if (this.isCollaborator) {
			if (this.hasWorkspace) this.userStateNbr = '3';
			else if (this.isInvited) this.userStateNbr = '4';
			else this.userStateNbr = '5';
		}
		else this.userStateNbr = '0';
	}

	updateUserStateMsg(){
		switch (this.userStateNbr) {
			case '1': {
				this.userStateMsg = 'Bienvenue:  <u>' + this.rssiName + '</u><br><br>Responsable Sécurité du Système d\'Information de:  <u>' + this.rssiOrg + '</u>';
				return;
			}
			case '2': {
				this.userStateMsg = 'Bienvenue:  <u>' + this.rssiName + '</u>' + '<br><br>Responsable Sécurité du Système d\'Information de:  <u>' + this.rssiOrg + '</u>' + '<br><br>' + 'Vous n\'avez pas encore crée un espace de travail.';
				return;
			}
			case '3': {
				this.userStateMsg = 'Bienvenue:  <u>' + this.collabName + '</u><br>Collaborateur chez:  <u>' + this.collabOrg + '</u>';
				return;
			}
			case '4': {
				this.userStateMsg = 'Bienvenue:  <u>' + this.collabName + '</u>';
				return;
			}
			case '5': {
				this.userStateMsg = 'Bienvenue:  <u>' + this.collabName + '</u>';
				return;
			}
			default: {
				this.userStateMsg = '';
				return;
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
