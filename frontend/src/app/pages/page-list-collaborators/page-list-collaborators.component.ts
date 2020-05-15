import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import {CollaboratorService } from 'src/app/collaborator.service' ; 
import { FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import {Collaborateur} from 'src/app/models/collaborateur.model'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-page-list-collaborators',
  templateUrl: './page-list-collaborators.component.html',
  styleUrls: ['./page-list-collaborators.component.css']
})
export class PageListCollaboratorsComponent implements OnInit {
  collaborateurs: Collaborateur[];

  constructor(private route: ActivatedRoute, private collaboratorService: CollaboratorService, private router: Router,public dialogRef: MatDialogRef<PageListCollaboratorsComponent>) { }
  

 
  selectedcollaborateurId: string;
  organisationName : string;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.collaborateurId) {
          this.selectedcollaborateurId = params.collaborateurId;
          this.collaboratorService.getOrgCollaborators().subscribe((collaborateurs: Collaborateur[]) => {
            this.collaborateurs = collaborateurs;
          })
        } else {
          this.collaborateurs = undefined;
        }
      }
    )

    this.collaboratorService.getOrgCollaborators().subscribe((collaborateurs: Collaborateur[]) => {
      this.collaborateurs = collaborateurs;
      this.organisationName=this.collaborateurs[0].org;
    
    })
    
  }
  onCloseButtonClicked(){
   
    this.dialogRef.close();
  }
}
