import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PhaseService } from 'src/app/checkListServices/phase.service';
import { ExigenceService } from 'src/app/checkListServices/exigence.service';
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
 public phases : any[];
 exigences : any[];
 taches : any[];
  constructor(private phaseService: PhaseService,private exigenceService:ExigenceService) { }
  ngOnInit(): void {
    this.phaseService.getPhases().subscribe((phases: any[]) => {
      this.phases=phases;
      console.log(this.phases);
      console.log(this.phases[0].nom);
      this.exigenceService.getExigences(this.phases[0]).subscribe((exigences:any[])=>{
        this.exigences=exigences;
        console.log(this.exigences);

      this.exigenceService.getTasks(this.exigences[0]._id).subscribe((tasks:any[])=>{
        this.taches=tasks;
      })
      })
     
    })
    console.log(this.taches);
  }
todo =[
  '1111111111',
'2222222',
'33333333333'
]
inprogress = [
  '777777777',
  '99999999999',
  '1010110100'
]
done = [
  '444444444',
  '5555555',
  '66666666'
]


  


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


}

