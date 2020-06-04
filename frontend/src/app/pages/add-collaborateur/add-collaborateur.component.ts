import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collaborateur } from 'src/app/models/collaborateur.model';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { WorkspaceService } from 'src/app/workspace.service';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {
 
  workspaceCollabs: Collaborateur[] = [];
  organisationName: string;
  constructor(public dialogRef: MatDialogRef<AddCollaborateurComponent>,private authRssiService: AuthRssiService, private workspaceService: WorkspaceService) {

    this.organisationName = this.authRssiService.getRssiOrg();
		this.workspaceService.getOrgCollaboratorsRssi(this.organisationName).subscribe((collaborateurs: Collaborateur[]) => {
	
			collaborateurs.forEach((collab: Collaborateur) => {
				if (collab.has_workspace) {
					this.workspaceCollabs.push(collab);
				}			
			});

			console.log('WorkspaceCollabs: ', this.workspaceCollabs);

		});

   }

  ngOnInit(): void {
  }
  onCloseButtonClicked(){
   
    this.dialogRef.close();
  }

}
