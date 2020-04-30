import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthCollaboratorService } from 'src/app/auth-collaborator.service';
import { CollaboratorService } from 'src/app/collaborator.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup-page-collaborator',
  templateUrl: './signup-page-collaborator.component.html',
  styleUrls: ['./signup-page-collaborator.component.css']
})
export class SignupPageCollaboratorComponent implements OnInit {

  hide = true;
  collaborateur_id: string;
  password = new FormControl('', [Validators.required, Validators.minLength(5)]);
  email = new FormControl('', [Validators.required, Validators.email]);



  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Ce champ est obligatoire !';
    }

    return this.email.hasError('email') ? 'Adresse email non valide' : '';

  }
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Ce champ est obligatoire !';
    }

    return this.password.hasError('minlength') ? 'Le mot de passe doit contenir au moins 5 caractères' : '';

  }



  constructor(private authService: AuthCollaboratorService, private collaboratorService: CollaboratorService, private router: Router) { }

  ngOnInit(): void {
  }
  OnSignUpButtonClicked(email: string, password: string, org :string, nom : string, ville : string, pays : string, cp: string, motivation : string) {
    this.authService.signUp(email, password, org , nom, ville,pays, cp, motivation).subscribe((res: HttpResponse<any>) => {
      console.log(res);
  this.collaborateur_id = res.body._id;
   this.router.navigate(['/profil-collaborateur', this.collaborateur_id]);

    });
  }
  
  
}
