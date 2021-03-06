import { Component, OnInit } from '@angular/core';
import { PhaseService } from 'src/app/checkListServices/phase.service';
declare var $: any;
@Component({
	selector: 'app-phase',
	templateUrl: './phase.component.html',
	styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit {
	phases : any[];
	
	constructor(private phaseService: PhaseService) { }
	
	showNotification(from, align, type){
		
		$.notify({
			icon: "notifications",
			message: "<br/>PDCA est une méthode de gestion itérative.Vous ne pouvez entamer une phase que lorsque la phase précedente est mise en oeuvre<br/>"
			
		},{
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
		
		this.phaseService.getPhases().subscribe((phases: any[]) => {
			this.phases=phases;
			console.log(this.phases);
			
		})
		
	}
	
	
	
	
	
}
