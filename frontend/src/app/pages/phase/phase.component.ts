import { Component, OnInit } from '@angular/core';
import { PhaseService } from 'src/app/checkListServices/phase.service';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit {
  phases : any;
  constructor(private phaseService: PhaseService) { }

  ngOnInit(): void {

    this.phaseService.getPhases().subscribe((phases) => {
      this.phases=phases;
      console.log(this.phases);
     
    })
  }

  getData() {
    this.phases.forEach(element => {
     
        console.log(element.nom);
        console.log(element.enabled);
        console.log(element.etat);
      
      
    });
  }

}
