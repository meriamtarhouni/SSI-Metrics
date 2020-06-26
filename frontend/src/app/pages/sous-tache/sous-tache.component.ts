import { Component, OnInit } from '@angular/core';
import { ExigenceService } from 'src/app/checkListServices/exigence.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCollaborateurComponent } from '../add-collaborateur/add-collaborateur.component';
import { CollaboratorService } from '../../collaborator.service';
import { Collaborateur } from 'src/app/models/collaborateur.model'
import { Sous_tache } from 'src/app/models/sous_tache.model';


@Component({
	selector: 'app-sous-tache',
	templateUrl: './sous-tache.component.html',
	styleUrls: ['./sous-tache.component.css']
})
export class SousTacheComponent implements OnInit {
	
	constructor(private exigenceService: ExigenceService, private route: ActivatedRoute, public dialog: MatDialog, private collaboratorService: CollaboratorService) { }
	sousTaches: Sous_tache[] = [];
	affected: boolean[] = [];
	selectedTaskId: string;
	affectedCollabsNames: string[] = [];
	
	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			if (params.tacheId) {
				this.selectedTaskId = params.tacheId;
				//console.log(this.selectedTask);
				this.exigenceService.getSubTasks(this.selectedTaskId).subscribe((sousTaches: Sous_tache[]) => {
					this.sousTaches = sousTaches;
					console.log('Sous taches = ', this.sousTaches);
					
					this.sousTaches.forEach((sst) => {
						if (sst.collaborateur_id) {
							console.log('collab id = ', sst.collaborateur_id);
							this.collaboratorService.getCollaboratorByIdRssi(sst.collaborateur_id).subscribe((collab: Collaborateur) => {
								console.log('collab = ', collab);
								
								let has_sst: boolean = false;
								this.sousTaches.forEach((sst2) => {
									if (sst2.collaborateur_id == collab._id) has_sst = true;
								});
								
								this.affected.push(has_sst);
								
								if (has_sst) {
									this.affectedCollabsNames.push(collab.nom);
								}
								else {
									this.affectedCollabsNames.push('');
								}
							});
						}
					});
					
					console.log('Affected array = ', this.affected);
				})
			}
		})
	}
	
	onAddCollaboratorClick(sstacheId: string) {
		
		const dialogRef = this.dialog.open(AddCollaborateurComponent, {
			height: '525px',
			width: '800px',
			data: {
				sstacheId: sstacheId,
			}
		});
		
		
		
	}
	onClickResetButton(sousTacheId : string , sousTacheEtat: string) {
		if (sousTacheEtat == "en cours"){
			let status= "pas mis en oeuvre"
			this.exigenceService.resetSubTaskStatus(sousTacheId, status).subscribe((res) => {} );
			window.location.reload(); 
		}
		
		else if (sousTacheEtat == "terminé"){
			let status= "pas mis en oeuvre"
			this.exigenceService.resetSubTaskStatus(sousTacheId, status).subscribe((res) => {} );
			window.location.reload(); 
			
		} else {
			console.log("not started yet")
			
		}
		
	}
}