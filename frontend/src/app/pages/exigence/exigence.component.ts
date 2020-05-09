import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ExigenceService } from 'src/app/checkListServices/exigence.service';

@Component({
  selector: 'app-exigence',
  templateUrl: './exigence.component.html',
  styleUrls: ['./exigence.component.css']
})
export class ExigenceComponent implements OnInit {

  constructor(private route : ActivatedRoute,private exigenceService:ExigenceService) { }
  selectedPhase: string;
  exigences : any[];

  ngOnInit(): void {
     this.route.params.subscribe(
      (params: Params) => {
        
        if (params.phaseId) {
          this.selectedPhase = params.phaseId;
          console.log(this.selectedPhase);
          this.exigenceService.getExigences(this.selectedPhase).subscribe((exigences: any[])=>{
            this.exigences=exigences;
            console.log(this.exigences);
          })   
        } 
       
      }
    )
  }

}
