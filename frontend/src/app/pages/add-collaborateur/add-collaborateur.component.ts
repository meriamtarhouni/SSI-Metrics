import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCollaborateurComponent>) { }

  ngOnInit(): void {
  }
  onCloseButtonClicked(){
   
    this.dialogRef.close();
  }

}
