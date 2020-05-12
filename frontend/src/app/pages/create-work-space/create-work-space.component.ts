import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from 'src/app/workspace.service';
import { HttpResponse } from '@angular/common/http';

@Component({
	selector: 'app-create-work-space',
	templateUrl: './create-work-space.component.html',
	styleUrls: ['./create-work-space.component.css']
})
export class CreateWorkSpaceComponent implements OnInit {

	constructor(private workspaceService: WorkspaceService) { }

	ngOnInit(): void {
	}

	onCreateButtonClicked(nom: string, password: string){
		this.workspaceService.createWorkspace(nom, password).subscribe((res: HttpResponse<any>) => {
			console.log(res);
		});
	}

}
