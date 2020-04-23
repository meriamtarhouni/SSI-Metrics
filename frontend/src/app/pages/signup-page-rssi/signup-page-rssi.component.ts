import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup-page-rssi',
  templateUrl: './signup-page-rssi.component.html',
  styleUrls: ['./signup-page-rssi.component.css']
})
export class SignupPageRssiComponent implements OnInit {
  hide = true;

  nom = new FormControl('', [Validators.required]);
  code = new FormControl('', [Validators.required]);
  adresse = new FormControl('', [Validators.required]);
  password =new FormControl('', [Validators.required, Validators.minLength(5)]);
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.nom.hasError('required') || this.code.hasError('required')|| this.adresse.hasError('required')|| this.password.hasError('required')) {
      return 'Ce champ est obligatoire !';
    }  
  }
  getErrorMessageEmail(){
    if (this.email.hasError('required')) {
      return 'Ce champ est obligatoire !';
    }

    return this.email.hasError('email') ? 'Adresse email non valide' : '';

  }
  getErrorMessagePassword(){
    if (this.password.hasError('required')) {
      return 'Ce champ est obligatoire !';
    }

    return this.password.hasError('minlength') ? 'Le mot de passe doit contenir au moins 5 caractères' : '';

  }

  constructor() { }

  ngOnInit(): void {
   
  }
  
  OnConnectButtonClicked(name : string, raison_sociale: string,email : string,code : string,adresse : string,password : string,motivation:string)
  {
    console.log(name,raison_sociale,email,code,adresse,password,motivation);
  }
}
