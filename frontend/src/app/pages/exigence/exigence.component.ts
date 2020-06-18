import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ExigenceService } from 'src/app/checkListServices/exigence.service';
import { PhaseService } from 'src/app/checkListServices/phase.service';

@Component({
	selector: 'app-exigence',
	templateUrl: './exigence.component.html',
	styleUrls: ['./exigence.component.css']
})
export class ExigenceComponent implements OnInit {
	
	selectedPhase: string;
	exigences : any[];
	taches : any[];
	color :string;
	phase : any;
	
	constructor(private route : ActivatedRoute,private exigenceService:ExigenceService,private phaseService:PhaseService) { }
	
	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			
			if (params.phaseId) {
				this.selectedPhase = params.phaseId;
				console.log(this.selectedPhase);
				this.exigenceService.getExigences(this.selectedPhase).subscribe((exigences: any[])=>{
					this.exigences=exigences;
					// console.log(this.exigences);
				})
				
				this.phaseService.getPhasesById(this.selectedPhase).subscribe((phase : any)=>{
					this.phase=phase;
					// console.log(this.phase);
					if(this.phase[0].nom =="Plan") {this.color="#21296E"};
					if(this.phase[0].nom =="Do") {this.color="#000FB0"};
					if(this.phase[0].nom =="Check") {this.color="#2BA8FF"};
					if(this.phase[0].nom =="Act") {this.color="#4CAF50"};
					
				})
			} 
			if(params.exigenceId){
				this.exigenceService.getTasks(params.exigenceId).subscribe((tasks:any[])=>{
					this.taches=tasks;
					console.log(this.taches);
				});
			}
			
		});
	}
	
}
