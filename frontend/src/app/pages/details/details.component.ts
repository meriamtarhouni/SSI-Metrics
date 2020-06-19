import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubTaskService } from 'src/app/checkListServices/sub-task.service';


export interface DialogData {
	tache_id: string;
	exigence_id: string;
	collaborateur_id: string;
}


@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	
	exigenceNom : string;
	tacheNom: string;
	collaborateurNom:string;
	constructor( public dialogRef: MatDialogRef<DetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,private subTasksService: SubTaskService) { }
	
	ngOnInit(): void {
		
		this.subTasksService.getSousTacheById(this.data.tache_id).subscribe((tache : any)=>{
			
			this.tacheNom= tache[0].label;
			console.log(this.tacheNom);
		});
		
		this.subTasksService.getExigenceById(this.data.exigence_id).subscribe((exigence:any)=>{
			
			this.exigenceNom=exigence[0].nom;
			console.log(this.exigenceNom);
			
		})
		this.subTasksService.getCollaborateurById(this.data.collaborateur_id).subscribe((collaborateur:any)=>{
			this.collaborateurNom=collaborateur[0].nom;
			console.log(collaborateur);
		})
		
	}
	
	onCloseButtonClicked(){
		
		this.dialogRef.close();
	}
}
