import { Component, OnInit } from '@angular/core';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authRssiService: AuthRssiService, private authCollaboratorService: AuthCollaboratorService) { }

  ngOnInit(): void {
  }

  getUserState(){                                     // MUST BE CHANGED TO AN EVENT LISTENER
	  let isRssi = this.authRssiService.isLoggedIn();
	  let isCollaborator = this.authCollaboratorService.isLoggedIn();

	  console.assert(!isRssi || !isCollaborator);

	  if(isRssi){
		return '1';
	  }
	  else if(isCollaborator){
		return '2';
	  }
	  else{
	  	return '3';
	  }
  }
  
  getUserStateMsg(){
	  switch(this.getUserState()) { 
		case '1': { 
			return 'Logged in as: RSSI';
		} 
		case '2': { 
			return 'Logged in as: Collaborator';
		} 
		default: { 
	  		return 'Not logged in';
		} 
	  } 
  }

}
