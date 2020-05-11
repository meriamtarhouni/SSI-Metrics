import { Component, OnInit } from '@angular/core';
import { ExigenceService } from 'src/app/checkListServices/exigence.service';
import { ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCollaborateurComponent } from '../add-collaborateur/add-collaborateur.component';

@Component({
  selector: 'app-sous-tache',
  templateUrl: './sous-tache.component.html',
  styleUrls: ['./sous-tache.component.css']
})
export class SousTacheComponent implements OnInit {

  constructor(private exigenceService: ExigenceService,private route : ActivatedRoute,public dialog: MatDialog) { }
  sousTaches : any [];
  selectedTask : string;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        
        if (params.tacheId) {
          this.selectedTask=params.tacheId;
          //console.log(this.selectedTask);
          this.exigenceService.getSubTasks(this.selectedTask).subscribe((sousTaches: any[])=>{
           this.sousTaches=sousTaches;
           //console.log(this.sousTaches);
          })
           
   
        } 
     
       
      }
    )
  }
  onClick(){

    const dialogRef = this.dialog.open(AddCollaborateurComponent,{
      height: '400px',
      width: '600px',
    });

  }

}