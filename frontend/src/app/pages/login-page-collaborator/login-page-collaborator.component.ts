import { Component, OnInit } from '@angular/core';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page-collaborator',
  templateUrl: './login-page-collaborator.component.html',
  styleUrls: ['./login-page-collaborator.component.css']
})
export class LoginPageCollaboratorComponent implements OnInit {
  collaborateur_id: string;

  constructor( private authCollaboratorService : AuthCollaboratorService, private router: Router) { }

  ngOnInit(): void {
  }
  onLoginButtonClicked(email : string,password: string){
    this.authCollaboratorService.login(email, password).subscribe((res: HttpResponse<any>) => {
   
      if (res.status === 200) {
        // we have logged in successfully
        console.log("Great");
      }
      console.log(res);
      this.collaborateur_id = res.body._id;
      this.router.navigate(['/profil-collaborateur', this.collaborateur_id]);
      
    });
  }
}
