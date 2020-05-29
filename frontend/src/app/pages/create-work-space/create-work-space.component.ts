import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/workspace.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { MatDialog } from '@angular/material/dialog';
import { PageListCollaboratorsComponent } from '../page-list-collaborators/page-list-collaborators.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create-work-space',
	templateUrl: './create-work-space.component.html',
	styleUrls: ['./create-work-space.component.css']
})
export class CreateWorkSpaceComponent implements OnInit {

	constructor(private workspaceService: WorkspaceService,private authRssiService: AuthRssiService,public dialog: MatDialog, private router: Router) { }
	
	currentRssiId: string;
	organisation : string;
	workspaceId : string;
	ngOnInit(): void {
		this.currentRssiId=this.authRssiService.getRssiId();
		//console.log(this.currentRssiId);
        this.authRssiService.getRssiById(this.currentRssiId).subscribe((rssi:any)=>{
			  this.organisation=rssi[0].org;
			 // console.log(this.organisation);
	 
		})
	}

	onCreateButtonClicked(nom: string){
		this.workspaceService.createWorkspace(nom).subscribe((res: any) => {
			//console.log(res);
			console.log(res._id);
			this.workspaceId=res._id;
			console.log("WorkspaceId",this.workspaceId);
			this.router.navigate(['/workspace/rssi',this.workspaceId]);

		});
	}

	onClick(){

		const dialogRef = this.dialog.open(PageListCollaboratorsComponent,{
		  height: '500px',
		  width: '800px',
		});
	
	  }

}
