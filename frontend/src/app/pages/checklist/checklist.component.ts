import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PhaseService } from 'src/app/checkListServices/phase.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ExigenceService } from 'src/app/checkListServices/exigence.service';
import { SubTaskService } from 'src/app/checkListServices/sub-task.service';

import {Sous_tache} from 'src/app/models/sous_tache.model'
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

  constructor(private route : ActivatedRoute,private phaseService: PhaseService,private exigenceService:ExigenceService, private subTasksService: SubTaskService) { }
  ngOnInit(): void {
this.route.params.subscribe((params:Params)=>{
  if (params.phaseId){
    this.selectedPhase = params.phaseId;
  }
})
 
   // this.selectedPhase= '5ed2c8e59bc1e62db17a77e3';  // plan 
  

    // get to do sub tasks 
    // get in progress sub tasks 
    // get done sub taskd 
    this.subTasksService.getToDoSubTasks(this.selectedPhase).subscribe((todo: Sous_tache[]) => {

      this.todo=todo;    
      console.log(this.todo);
      //console.log(this.todo[0].label);

    }); 

    this.subTasksService.getInProgressSubTasks(this.selectedPhase).subscribe((inprogress: Sous_tache[]) => {
      this.inprogress=inprogress;
    }); 

    this.subTasksService.getDoneSubTasks(this.selectedPhase).subscribe((done: Sous_tache[]) => {
      this.done=done;
    }); 
  }


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

