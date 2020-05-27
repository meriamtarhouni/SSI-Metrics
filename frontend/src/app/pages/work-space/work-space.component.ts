import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorkspaceService } from 'src/app/workspace.service';


@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {

  constructor(private route: ActivatedRoute,private workSpaceService : WorkspaceService,private router: Router) { }
  
  workSpaceId : string;
  workspace : any;
  workSpaceNoun : string;
  collaborateurs :any;
  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.workSpaceId=params.workspaceId;
        //console.log(this.workSpaceId);
      }
    )
    
    this.workspace=this.workSpaceService.getWorkSpaceByid(this.workSpaceId).subscribe((workspace :any)=>{
      this.workspace=workspace[0];
      console.log(this.workspace);
      this.workSpaceNoun=this.workspace.nom;
      console.log(this.workSpaceNoun);
    })
    
    

  }

   onPhasesClick(){
     this.router.navigate(['/phases']);
   }
 
}
