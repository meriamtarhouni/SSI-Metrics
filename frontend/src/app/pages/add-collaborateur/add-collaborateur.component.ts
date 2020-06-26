import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Collaborateur } from 'src/app/models/collaborateur.model'
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { WorkspaceService } from 'src/app/workspace.service';

@Component({
	selector: 'app-add-collaborateur',
	templateUrl: './add-collaborateur.component.html',
	styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {
 
	sstacheId: string;
	organisationName: string;
	workspaceCollabs: Collaborateur[] = [];
	selectedCollabId: string;
	has_selected: boolean = false;
	startDate: string;
	endDate: string;

	constructor(private route: ActivatedRoute, private authRssiService: AuthRssiService, private workspaceService: WorkspaceService, public dialogRef: MatDialogRef<AddCollaborateurComponent>, @Inject(MAT_DIALOG_DATA) data) {
		this.sstacheId = data.sstacheId;
	}

	ngOnInit(): void {
		this.startDate = new Date().toISOString().split('T')[0];
		this.endDate = new Date().toISOString().split('T')[0];

		this.organisationName = this.authRssiService.getRssiOrg();
		this.workspaceService.getOrgCollaboratorsRssi(this.organisationName).subscribe((collaborateurs: Collaborateur[]) => {
			this.workspaceCollabs = collaborateurs.filter((collab: Collaborateur) => collab.has_workspace);
		});
	}

	selectCollab(collabId: string) {
		this.selectedCollabId = collabId;
		this.has_selected = true;
	}

	onAffectButtonClicked() {
		console.log("Affecting to: ", this.selectedCollabId, " with start date: ", this.startDate, " and with end date: ", this.endDate);
		this.workspaceService.affectSubtaskCollab(this.sstacheId, this.startDate, this.endDate, this.selectedCollabId).subscribe((res) => {});
		window.location.reload();
		this.onCloseButtonClicked();
	}

	onCloseButtonClicked() {
		this.dialogRef.close();
	}

}
