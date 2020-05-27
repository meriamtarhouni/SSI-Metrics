import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import {CollaboratorService } from 'src/app/collaborator.service' ; 
import { FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import {Collaborateur} from 'src/app/models/collaborateur.model'
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-page-list-collaborators',
  templateUrl: './page-list-collaborators.component.html',
  styleUrls: ['./page-list-collaborators.component.css']
})
export class PageListCollaboratorsComponent implements OnInit {
  collaborateurs: Collaborateur[];
  organisationName: string;

  constructor(private route: ActivatedRoute, private authCollaboratorService: AuthCollaboratorService,private collaboratorService: CollaboratorService, private router: Router ) {}

  ngOnInit() {
	this.organisationName = this.authCollaboratorService.getCollaboratorOrg();
	this.collaboratorService.getOrgCollaborators(this.organisationName).subscribe((collaborateurs: Collaborateur[]) => {
		this.collaborateurs = collaborateurs;
		// console.log(this.collaborateurs);
	});
  }
}
