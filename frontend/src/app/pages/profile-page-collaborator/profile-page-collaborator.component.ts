import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import {CollaboratorService } from 'src/app/collaborator.service' ; 
import { FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-page-collaborator',
  templateUrl: './profile-page-collaborator.component.html',
  styleUrls: ['./profile-page-collaborator.component.css']
})
export class ProfilePageCollaboratorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private collaboratorService: CollaboratorService, private router: Router) { }

  collaborateurId: string;
  collaborateur : any;

  hide = true;


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.collaborateurId = params.collaborateurId;
        console.log(params.collaborateurId);
      }
    )

    this.collaborateur=this.collaboratorService.getCollaboratorById(this.collaborateurId).subscribe((collaborateur: any) => {
      this.collaborateur=collaborateur[0];
      console.log(this.collaborateur);      
    })
   
  }
  onEditButtonClicked(email : string){
    this.collaboratorService.updateCollaborator(this.collaborateurId,email).subscribe((res: HttpResponse<any>) => {
     
      console.log(res);
      
    });
  }
  onDeleteButtonClicked(){
    this.collaboratorService.deleteCollaborator(this.collaborateurId).subscribe((res: HttpResponse<any>) => {
     
      console.log(res);
      this.router.navigate(['/signup-collab']);
    });

  }
}
