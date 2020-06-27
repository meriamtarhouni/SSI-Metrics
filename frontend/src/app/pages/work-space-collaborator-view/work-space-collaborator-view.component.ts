import { Component, OnInit } from '@angular/core';
import { PhaseService } from 'src/app/checkListServices/phase.service';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
declare var $: any;

@Component({
  selector: 'app-work-space-collaborator-view',
  templateUrl: './work-space-collaborator-view.component.html',
  styleUrls: ['./work-space-collaborator-view.component.css']
})
export class WorkSpaceCollaboratorViewComponent implements OnInit {
  phases: any[];
  collabOrg: string;

  constructor(private phaseService: PhaseService, private authCollaboratorService: AuthCollaboratorService) { }

  showNotificationPlan(from, align, type) {

    $.notify({
      icon: "notifications",
      message: "<br/>PDCA est une méthode de gestion itérative.Vous ne pouvez entamer une phase que lorsque la phase PLAN est mise en oeuvre<br/>"

    }, {
      type: type,
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">error_outline</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });

  }
  showNotificationDo(from, align, type) {

    $.notify({
      icon: "notifications",
      message: "<br/>PDCA est une méthode de gestion itérative.Vous ne pouvez entamer une phase que lorsque la phase DO est mise en oeuvre<br/>"

    }, {
      type: type,
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">error_outline</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });

  }

  showNotificationCheck(from, align, type) {

    $.notify({
      icon: "notifications",
      message: "<br/>PDCA est une méthode de gestion itérative.Vous ne pouvez entamer une phase que lorsque la phase CHECK est mise en oeuvre<br/>"

    }, {
      type: type,
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">error_outline</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });

  }

  ngOnInit(): void {

    this.phaseService.getAllPhases().subscribe((phases: any[]) => {
      this.phases = phases;
      console.log(this.phases);

    })

	this.collabOrg = this.authCollaboratorService.getCollaboratorOrg();


  }


}
