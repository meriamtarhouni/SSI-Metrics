import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorkspaceService } from 'src/app/workspace.service';


@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {

  constructor(private route: ActivatedRoute, private workSpaceService: WorkspaceService, private router: Router) { }

  workspaceId: string;
  workspace: any;
  workSpaceNoun: string;
  collaborateurs: any;

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.workspaceId = params.workspaceId;
        console.log("Workspace ID: " + this.workspaceId);

        this.workspace = this.workSpaceService.getWorkSpaceByid(this.workspaceId).subscribe((workspace: any) => {
          this.workspace = workspace[0];
          console.log(this.workspace);
          this.workSpaceNoun = this.workspace.nom;
          console.log(this.workSpaceNoun);
        });

      }
    )
  }

  OnCollaboratorsClick() {
    this.router.navigate(['/workspace/rssi', this.workspaceId, 'collaborators']);
  }

  onReportingClick() {
    this.router.navigate(['/workspace/rssi', this.workspaceId, 'reporting']);
  }

  onPhasesClick() {
    this.router.navigate(['/phases']);
  }

}
