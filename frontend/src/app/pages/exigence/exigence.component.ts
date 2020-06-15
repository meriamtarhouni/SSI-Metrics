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

  constructor(private route : ActivatedRoute,private exigenceService:ExigenceService,private phaseService:PhaseService) { }
  selectedPhase: string;
  exigences : any[];
  taches : any[];
  color :string;
  phase : any;
  selectedPhaseEnabled : boolean; 
  selectedPhaseName : string; 
  ngOnInit(): void {
     this.route.params.subscribe(
      (params: Params) => {
        
        if (params.phaseId) {
          this.selectedPhase = params.phaseId;
          console.log(this.selectedPhase);
          this.exigenceService.getExigences(this.selectedPhase).subscribe((exigences: any[])=>{
            this.exigences=exigences;
           // console.log(this.exigences);
          })
           
           this.phaseService.getPhasesById(this.selectedPhase).subscribe((phase : any)=>{
             this.phase=phase;
             this.selectedPhaseEnabled=this.phase[0].enabled; 
             this.selectedPhaseName= this.phase[0].nom;
            console.log(this.selectedPhaseEnabled);
            console.log(this.selectedPhaseName);
             if(this.phase[0].nom =="Plan") {this.color="#21296E" };
             if(this.phase[0].nom =="Do") {this.color="#000FB0"};
             if(this.phase[0].nom =="Check") {this.color="#2BA8FF"};
             if(this.phase[0].nom =="Act") {this.color="#4CAF50"};

           })
        } 
        if(params.exigenceId){
          this.exigenceService.getTasks(params.exigenceId).subscribe((tasks:any[])=>{
            this.taches=tasks;
            console.log(this.taches);
          })
        }
       
      }
    )
  }

    
  onEnableButtonClicked(){
  this.phaseService.enablePhase(this.selectedPhase, true) ; 
  window.location.reload(); 
  
  }

 
}
