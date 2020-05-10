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
            // console.log(this.phase);
             if(this.phase[0].nom =="Plan") {this.color="card-header card-header-tabs card-header-danger"};
             if(this.phase[0].nom =="Do") {this.color="card-header card-header-tabs card-header-warning"};
             if(this.phase[0].nom =="Check") {this.color="card-header card-header-tabs card-header-success"};
             if(this.phase[0].nom =="Act") {this.color="card-header card-header-tabs card-header-info"};

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




}
