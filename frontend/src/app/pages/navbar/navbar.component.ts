import { Component, OnInit } from '@angular/core';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authCollaboratorService : AuthCollaboratorService, private authRssiService : AuthRssiService ) { }
  rssi :string;
  collaborator: string;

  ngOnInit(): void {
    this.rssi=this.authRssiService.getRssiId();
	  this.collaborator=this.authCollaboratorService.getCollaboratorId();
  }

  getUserState(){                                     // MUST BE CHANGED TO AN EVENT LISTENER FOR PERFORMANCE
	  let isRssi = this.authRssiService.isLoggedIn();
	  let isCollaborator = this.authCollaboratorService.isLoggedIn();
	 
	 

	  console.assert(!isRssi || !isCollaborator);

	
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
