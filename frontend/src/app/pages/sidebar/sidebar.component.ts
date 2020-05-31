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
   rssi :string;
   workspace : string;
   collaborator: string;
   
  ngOnInit(): void {
	  this.rssi=this.authRssiService.getRssiId();
	  this.workspace=this.authRssiService.getWorkSpace();
	  this.collaborator=this.authCollaboratorService.getCollaboratorId();
	  
  }

  getUserState(){                                     // MUST BE CHANGED TO AN EVENT LISTENER FOR PERFORMANCE
	  let isRssi = this.authRssiService.isLoggedIn();
	  let isCollaborator = this.authCollaboratorService.isLoggedIn();
	  let hasWorkspace=this.authRssiService.hasWorkSpace();
	 

	  console.assert(!isRssi || !isCollaborator);

	  if (isRssi && hasWorkspace){
		 return '0' ;
	  }
	  if(isRssi){
		return '1';
	  }
	  if(isCollaborator){
		return '2';
	  }
	  
	  else{
	  	return '3';
	  }
  }
  
  getUserStateMsg(){
	  switch(this.getUserState()) { 
		case '0':{
			return 'Logged in as: RSSI';
		}
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
  onLogoutCollaborateurClicked(){
    this.authCollaboratorService.logout()
        // we have logged out successfully
        console.log("Great");
        
      
  }
  onLogoutRssiClicked(){
    this.authRssiService.logout()
        // we have logged out successfully
        console.log("Great");
      
  }

}
