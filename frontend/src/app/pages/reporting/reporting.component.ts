import { PhaseService } from 'src/app/checkListServices/phase.service';
import { Component, OnInit } from '@angular/core';
import { SubTaskService } from 'src/app/checkListServices/sub-task.service';
import { Sous_tache } from 'src/app/models/sous_tache.model';
import { Chart } from 'chart.js';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { WorkspaceService } from 'src/app/workspace.service';
import { Collaborateur } from 'src/app/models/collaborateur.model'

@Component({
	selector: 'app-reporting',
	templateUrl: './reporting.component.html',
	styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {
	
	organisationName: string;
	phases: string[] = [];
	nbPasMisEnOeuvre: number[] = [];
	nbEnCours: number[] = [];
	nbTermine: number[] = [];
	tasksPieChart = [[]];

	nbAvantLimite: number[] = [];
	nbApresLimite: number[] = [];
	tasksDeliverdOnTimeChart = [[]]; 

	collaboratorsOrderMap: Map<String, number> = new Map<String, number>();
	collaboratorsArray1: String[] = [];
	collaboratorsArray2: number[] = [];

	collaboratorsIdNameMap: Map<String, String> = new Map<String, String>();

	constructor(private phaseService: PhaseService, private subTasksService: SubTaskService, private authRssiService: AuthRssiService, private workspaceService: WorkspaceService) { }
	
	ngOnInit(): void {
		this.organisationName = this.authRssiService.getRssiOrg();

		this.phaseService.getPhases().subscribe((phases: any[]) => {
			console.log('Phases = ', phases);
			phases.forEach((phase: any) => { this.phases.push(phase.nom); });
			
			let i = 0;
			phases.forEach((phase) => {
				this.subTasksService.getToDoSubTasksRssi(phase._id).subscribe((todo: Sous_tache[]) => {
					this.nbPasMisEnOeuvre.push(todo.length);

					this.subTasksService.getInProgressSubTasksRssi(phase._id).subscribe((inprogress: Sous_tache[]) => {
						this.nbEnCours.push(inprogress.length);
						
						this.subTasksService.getDoneSubTasksRssi(phase._id).subscribe((done: Sous_tache[]) => {
							this.nbTermine.push(done.length);
							this.updateChart1(i);
							++i;
						}); 
					});
				});
			});

			let j = 0;
			phases.forEach((phase) => {
				this.subTasksService.getDoneSubTasksRssi(phase._id).subscribe((done: Sous_tache[]) => {
					this.nbAvantLimite[j] = 0;
					this.nbApresLimite[j] = 0;

					done.forEach((sstache) => {
						console.log('Sous Tache = ', sstache);
						if(this.avantLimite(sstache)) ++this.nbAvantLimite[j];
						else ++this.nbApresLimite[j];
					});

					this.updateChart2(j);
					++j;
				});
			});

			this.workspaceService.getOrgCollaboratorsRssi(this.organisationName).subscribe((collaborateurs: Collaborateur[]) => {
				let nbCollabs = 0;
				collaborateurs.forEach((collab: Collaborateur) => {
					++nbCollabs;
					if (collab.has_workspace) {
						this.collaboratorsOrderMap.set(collab._id, 0);
						this.collaboratorsIdNameMap.set(collab._id, collab.nom);
					}
					
					if(nbCollabs == collaborateurs.length){
						// let nbPhases = 0;
						phases.forEach((phase) => {
							this.subTasksService.getDoneSubTasksRssi(phase._id).subscribe((done: Sous_tache[]) => {
								// console.log("Done = ", done);

								// ++nbPhases;
								let nbSubTasks = 0;
								done.forEach((sstache) => {
									++nbSubTasks;
									let collabId = sstache.collaborateur_id;
									if(collabId){
										console.log(collabId);
										this.collaboratorsOrderMap.set(collabId, this.collaboratorsOrderMap.get(collabId) + 1);
									}

									// console.log("INDEX = ", i);
								});

								if(phase._id == "5eedf82db4e55b10de2db30d" && nbSubTasks == done.length){
									this.collaboratorsOrderMap.forEach((val, key, map) => {
										this.collaboratorsArray1.push(this.collaboratorsIdNameMap.get(key));
										this.collaboratorsArray2.push(val);
									});
									this.collaboratorsArray1.reverse();
									this.collaboratorsArray2.reverse();

									console.log("Collabs map = ", this.collaboratorsOrderMap);
									console.log("Collabs array 1 = ", this.collaboratorsArray1);
									console.log("Collabs array 2 = ", this.collaboratorsArray2);
								}
							});
						});
					}
				});

			});
		});
	}

	avantLimite(sstache: Sous_tache): boolean{
		if(sstache.date_fin == '') return false;
		let date_fin = sstache.date_fin.split('-').map(Number);
		let date_reele = sstache.date_reele.split('-').map(Number);
		
		for (let i = 0; i < date_fin.length; i++) {
			if(date_fin[i] < date_reele[i]) return false;
		}
		return true;
	}

	updateChart1(i: number){
		console.log('1) Phase ', i, ' numbers = ', this.nbPasMisEnOeuvre[i], this.nbEnCours[i], this.nbTermine[i]);
		
		this.tasksPieChart.push(new Chart('pieChart1_' + i.toString() , {
			type: 'pie',
			data: {
				labels: ["Pas mis en oeuvre", "En Cours", "Terminé "], 
				datasets:[{
					label:'Vote Now', 
					data : [this.nbPasMisEnOeuvre[i], this.nbEnCours[i], this.nbTermine[i]], 
					backgroundColor:[
						'#f44336', 
						'#2BA8FF', 
						'#4CAF50', 
					],
				}]
			},
			options: {
				title : {
					Text: "Bar Chart ",
					display:true
				}
			}
		}));
	}

	updateChart2(i: number){
		console.log('2) Phase ', i, ' numbers = ', this.nbAvantLimite[i], this.nbApresLimite[i]);

		this.tasksDeliverdOnTimeChart.push(new Chart('pieChart2_' + i.toString() , {
			type: 'pie',
			data: {
				labels: ["Tâches Non Terminés Avant la date limite ",  "Tâches Terminés Aprés la date limite "], 
				datasets:[{
					label:'Vote Now', 
					data : [this.nbAvantLimite[i], this.nbApresLimite[i]], // 10 : nbr de Taches Non Terminés Avant la date limite , 15 : nbr de Taches  Terminés Avant la date limite
					backgroundColor:[
						'#4CAF50', 
						'#f44336', 
					],
				}]
			},
			options: {
				title : {
					Text: "Bar Chart ",
					display:true
				}
			}
		}));
	}
	
}
