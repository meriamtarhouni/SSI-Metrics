import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { PhaseService } from 'src/app/checkListServices/phase.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ExigenceService } from 'src/app/checkListServices/exigence.service';
import { SubTaskService } from 'src/app/checkListServices/sub-task.service';
import {Sous_tache} from 'src/app/models/sous_tache.model';
import { CdkDragEnter, CdkDragExit, CdkDragStart } from '@angular/cdk/drag-drop';
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

  tache :any;

  constructor(private route : ActivatedRoute,private phaseService: PhaseService,private exigenceService:ExigenceService, private subTasksService: SubTaskService) { }
  ngOnInit(): void {
this.route.params.subscribe((params:Params)=>{
  if (params.phaseId){
    this.selectedPhase = params.phaseId;

    //get phase by id 
    this.subTasksService.getPhaseById(this.selectedPhase).subscribe((phase : any )=>{
      this.phase = phase ;
      this.nomPhase= this.phase[0].nom ; 
    })
  }


})
this.toDoSubTasks();
this.inProgressSubTasks();
this.doneSubTasks();
}


    // get to do sub tasks 
  toDoSubTasks(){

    this.subTasksService.getToDoSubTasks(this.selectedPhase).subscribe((todo: Sous_tache[]) => {
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
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

  console.log(event.item.element.nativeElement.id)  ;
  console.log(event.previousContainer.id );
   
    /**
     * cdk-drop-list-0 == pas mis en oeuvre
     * cdk-drop-list-1 == en cours
     * cdk-drop-list-2 == termié
     */
    if (event.previousContainer.id=="cdk-drop-list-0"){
      status="en cours";
     
    }
    else if (event.previousContainer.id=="cdk-drop-list-1"){
      status="terminé"; 
    
    } 
    console.log(status);



    this.subTasksService.updateSubTaskStatus(event.item.element.nativeElement.id, status).subscribe(() => {
      this.toDoSubTasks();
      this.inProgressSubTasks();
      this.doneSubTasks();
   });

}
}
