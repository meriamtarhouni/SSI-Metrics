import { Component, OnInit } from '@angular/core';
import { AuthRssiService } from './auth-rssi.service';
import { AuthCollaboratorService } from './auth-collaborator.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'frontend';
	show: boolean;
	
	constructor(private authRssiService: AuthRssiService, private authCollaboratorService: AuthCollaboratorService) {

	}

	ngOnInit(){
		let isRssi = this.authRssiService.isLoggedIn();
		let isCollaborator = this.authCollaboratorService.isLoggedIn();
		this.show = isRssi || isCollaborator;
	}
	
	onClickStartButton(){
		this.show = true;
	}
}
