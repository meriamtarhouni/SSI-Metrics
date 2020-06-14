import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { WorkspaceService } from './workspace.service';

@Injectable({
	providedIn: 'root'
})
export class AuthRssiService {
	
	@Output() loggedIn = new EventEmitter<string>();
	constructor(private http: HttpClient, private webService: WebRequestService, private router: Router, private workspaceService: WorkspaceService) { }
	
	login(email: string, password: string) {
		
		return this.webService.loginRssi(email, password).pipe(
				shareReplay(),
				tap((res: HttpResponse<any>) => {
					// the auth tokens will be in the header of this response
					this.setSession(res.body._id, res.body.nom, res.body.org, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));

					//Verify whether this Rssi has already a workspace
					this.webService.hasWorkSpace(res.body._id).subscribe((res: any) => {
						
						this.workspaceService.setWorkSpaceSession(res[0]._id);
						
						this.loggedIn.emit('123456789');
					})
					// console.log("LOGGED IN!");
				}),
		);
	}
		
	signUp(nom: string, raison: string, adresse: string, org: string, email: string, password: string, motivation: string) {
		
		return this.webService.signUpRSSI(nom, raison, adresse, org, email, password, motivation).pipe(
			shareReplay(),
			tap((res: HttpResponse<any>) => {
				// the auth tokens will be in the header of this response
				this.setSession(res.body._id, res.body.nom, res.body.org, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
				this.loggedIn.emit('123456789');
				
				console.log("Successfully signed up!");
			})
		);
	}
	
	getRssiById(rssiId: string) {
		return this.webService.getRssiById(rssiId);
	}
	
	updateRssi(rssiId: string, nom: string, raison: string, adresse: string, org: string, email: string, motivation: string) {
		
		return this.webService.patch(`rssis/${rssiId}`, { nom, raison, adresse, org, email, motivation });
	}
	
	deleteRssi(rssiId: string) {
		return this.webService.delete(`rssis/${rssiId}`);
	}
	
	
	logout() {
		this.removeSession();
		this.workspaceService.removeWorkspaceSession();
		this.loggedIn.emit('123456789');
		this.router.navigate(['/login-rssi']);
	}
	
	isLoggedIn() {
		return localStorage.hasOwnProperty('rssi-id');
	}
	
	hasWorkspace() {
		return localStorage.hasOwnProperty('workspace-id');
	}
	getWorkSpaceId() {
		return localStorage.getItem('workspace-id');
	}
	getAccessToken() {
		return localStorage.getItem('x-access-token');
	}
	
	setAccessToken(accessToken: string) {
		localStorage.setItem('x-access-token', accessToken)
	}
	
	getRefreshToken() {
		return localStorage.getItem('x-refresh-token');
	}
	
	getRssiId() {
		return localStorage.getItem('rssi-id');
	}
	
	getRssiName(){
		return localStorage.getItem('rssi-name');
	}
	
	getRssiOrg() {
		return localStorage.getItem('rssi-org');
	}
	
	private setSession(rssiId: string, rssiName:string, rssiOrg: string, accessToken: string, refreshToken: string) {
		localStorage.setItem('rssi-id', rssiId);
		localStorage.setItem('rssi-name', rssiName);
		localStorage.setItem('rssi-org', rssiOrg);
		localStorage.setItem('x-access-token', accessToken);
		localStorage.setItem('x-refresh-token', refreshToken);
	}
	
	private removeSession() {
		localStorage.removeItem('rssi-id');
		localStorage.removeItem('rssi-name');
		localStorage.removeItem('rssi-org');
		localStorage.removeItem('x-access-token');
		localStorage.removeItem('x-refresh-token');
	}
	
	getNewAccessToken() {
		return this.http.get(`${this.webService.ROOT_URL}/rssis/me/access-token`, {
			headers: {
				'x-refresh-token': this.getRefreshToken(),
				'_id': this.getRssiId()
			},
			observe: 'response'
		}).pipe(
			tap((res: HttpResponse<any>) => {
				this.setAccessToken(res.headers.get('x-access-token'));
			})
		);
	}
		
}