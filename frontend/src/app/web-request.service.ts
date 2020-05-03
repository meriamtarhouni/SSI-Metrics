import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn: 'root'
})
export class WebRequestService {
readonly ROOT_URL;
constructor(private http: HttpClient) {
	this.ROOT_URL = 'http://localhost:3000';
}


/*RSSI Methods*/

loginRssi(email: string,password: string)
{
return this.http.post(`${this.ROOT_URL}/rssis/login`, {
	email,
	password
}, {
	observe: 'response'
	});
}

createWorkspace(nom: string, password: string, rssiId: any){
	return this.http.post(`${this.ROOT_URL}/workspaces`, {
		nom,
		password,
		// rssiId
	});
}



}
