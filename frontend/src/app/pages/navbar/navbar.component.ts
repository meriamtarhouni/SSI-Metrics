import { Component, OnInit } from '@angular/core';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authCollaboratorService : AuthCollaboratorService) { }

  ngOnInit(): void {
  }
  onLogoutClicked(){
    this.authCollaboratorService.logout()
        // we have logged out successfully
        console.log("Great");
      
  }
}
