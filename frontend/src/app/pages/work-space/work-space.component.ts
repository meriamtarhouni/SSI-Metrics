import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WorkspaceService } from 'src/app/workspace.service';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {

  constructor(private route: ActivatedRoute,private workSpaceService : WorkspaceService) { }
  
  workSpaceId : string;
  workspace : any;

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.workSpaceId=params.workspaceId;
        //console.log(this.workSpaceId);
      }
    )
    
    this.workspace=this.workSpaceService.getWorkSpaceByid(this.workSpaceId).subscribe((workspace :any)=>{
      this.workspace=workspace[0];
      //console.log(this.workspace);
     
    })


  }

}
