import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
	selector: 'app-signup-page-rssi',
	templateUrl: './signup-page-rssi.component.html',
	styleUrls: ['./signup-page-rssi.component.css']
})
export class SignupPageRssiComponent implements OnInit {
	hide = true;
	rssi_id: string;
	nom = new FormControl('', [Validators.required]);
	org = new FormControl('', [Validators.required]);
	adresse = new FormControl('', [Validators.required]);
	password = new FormControl('', [Validators.required, Validators.minLength(5)]);
	email = new FormControl('', [Validators.required, Validators.email]);

	getErrorMessage() {
		if (this.nom.hasError('required') || this.org.hasError('required') || this.adresse.hasError('required') || this.password.hasError('required')) {
			return 'Ce champ est obligatoire !';
		}
	}
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

	constructor(private authService: AuthRssiService, private router: Router) { }

	ngOnInit(): void {

	}

	OnSignUpButtonClicked(nom: string, raison: string, adresse: string, org: string, email: string, password: string, motivation: string) {
		this.authService.signUp(nom, raison, adresse, org, email, password, motivation).subscribe((res: HttpResponse<any>) => {

			console.log(res);
			this.rssi_id = res.body._id;

			this.router.navigate(['/edit-rssi', this.rssi_id]);

		});
	}
}
