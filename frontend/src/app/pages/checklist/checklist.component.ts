import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { SubTaskService } from 'src/app/checkListServices/sub-task.service';
import { Sous_tache } from 'src/app/models/sous_tache.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
import { AuthCollaboratorService } from '../.././auth-collaborator.service'
import { WebRequestService } from '../.././web-request.service'
import { Collaborateur } from 'src/app/models/collaborateur.model';


@Component({
	selector: 'app-checklist',
	templateUrl: './checklist.component.html',
	styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
	phases : any[];
	todo : Sous_tache [];
	inprogress : Sous_tache[];
	done : Sous_tache[];
	exigences: any[];
	selectedPhase: string;
	phase : any;
	nomPhase : string;
	mySubscription: any;
	tache :any;
	color :string;
	collabId: string;
	collabTasks: string[] = [];
	
	
	constructor(private webRequestService: WebRequestService, private authCollaboratorService: AuthCollaboratorService, private route : ActivatedRoute, private subTasksService: SubTaskService, private router: Router,public dialog: MatDialog) { }
	ngOnInit(): void {
		this.route.params.subscribe((params:Params)=>{
			if (params.phaseId){
				this.selectedPhase = params.phaseId;
				
				//get phase by id 
				this.subTasksService.getPhaseById(this.selectedPhase).subscribe((phase : any )=>{
					this.phase = phase ;
					this.nomPhase= this.phase[0].nom ; 
					if(this.nomPhase =="Plan") {this.color="#21296E"};
					if(this.nomPhase =="Do") {this.color="#000FB0"};
					if(this.nomPhase =="Check") {this.color="#2BA8FF"};
					if(this.nomPhase=="Act") {this.color="#4CAF50"};
					
				})
			}
		})
		this.collabId = this.authCollaboratorService.getCollaboratorId();
		this.webRequestService.getCollaboratorById(this.collabId).subscribe((collabs: Collaborateur[]) => {
			if(collabs.length == 1){
				this.collabTasks = collabs[0].sous_taches;
				console.log('Collaborator tasks = ', this.collabTasks);
			}
		});
		this.toDoSubTasks();
		this.inProgressSubTasks();
		this.doneSubTasks();
	}
	
	ngOnDestroy() {
		if (this.mySubscription) {
			this.mySubscription.unsubscribe();
		}
	}
	
	// get to do sub tasks 
	toDoSubTasks(){
		this.subTasksService.getToDoSubTasks(this.selectedPhase).subscribe((todo: Sous_tache[]) => {
			console.log(todo);
			this.todo=todo;    
		}); 
	}
	// get in progress sub tasks 
	inProgressSubTasks(){
		this.subTasksService.getInProgressSubTasks(this.selectedPhase).subscribe((inprogress: Sous_tache[]) => {
			this.inprogress=inprogress;
		}); 
	}
	// get done sub tasks
	doneSubTasks(){
		this.subTasksService.getDoneSubTasks(this.selectedPhase).subscribe((done: Sous_tache[]) => {
			this.done=done;
		}); 
	}
	
	
	drop(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
			// console.log(event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
			if (event.previousContainer.id=="cdk-drop-list-0"){
				status="en cours";
			} else if (event.previousContainer.id=="cdk-drop-list-1"){
				status="terminé"; 
			} 

			console.log('here');

			let sstacheId = event.item.element.nativeElement.id;
			this.subTasksService.updateSubTaskStatus(sstacheId, status).subscribe((res) => {
				console.log('sstacheId = ', sstacheId);
				this.subTasksService.getSousTacheById(sstacheId).subscribe((res: Sous_tache) => {
					let tacheId = res.tache_id;
					console.log('res = ', res, ' tacheId = ', tacheId);
					
					let newStatus = '';
					this.subTasksService.getSousTacheByTacheId(tacheId).subscribe((res: Sous_tache[]) => {
						let nbPasMisEnOeuvre = 0;
						let nbEnCours = 0;
						let nbTerminees = 0;
						res.forEach((sstache: Sous_tache) => {
							if(sstache.etat == 'pas mis en oeuvre'){
								++nbPasMisEnOeuvre;
							} else if(sstache.etat == 'en cours'){
								++nbEnCours;
							} else ++nbTerminees;
						})

						if(nbPasMisEnOeuvre == 0 && nbEnCours == 0) newStatus = 'termin?�';
						else if(nbEnCours == 0 && nbTerminees == 0) newStatus = 'pas mis en oeuvre';
						else newStatus = 'en cours';
						
						this.webRequestService.updateTaskStatus(tacheId, newStatus).subscribe((res) => {});
					});
				});
			});
			
		}
		/**
		* cdk-drop-list-0 == pas mis en oeuvre
		* cdk-drop-list-1 == en cours
		* cdk-drop-list-2 == termié
		*/
	}
	detailClick(tacheId:string, exigenceId:string, collaborateurId){
		const dialogRef = this.dialog.open(DetailsComponent, {
			height: '300px',
			width: '500px',
			data: {tache_id: tacheId,exigence_id:exigenceId,collaborateur_id:collaborateurId}
		});
	}
	
}