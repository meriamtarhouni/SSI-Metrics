import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthCollaboratorService {

	constructor(private http: HttpClient, private webService: WebRequestService, private router: Router) { }



	signUp(email: string, password: string, org: string, nom: string, ville: string, pays: string, cp: string, motivation: string) {

		console.log("auth service");
		return this.webService.signUpCollaborator(email, password, org, nom, ville, pays, cp, motivation).pipe(
			shareReplay(),
			tap((res: HttpResponse<any>) => {
				// the auth tokens will be in the header of this response
				this.setSession(res.body._id, res.body.nom, res.body.org, res.body.has_workspace, res.body.workspaceId, res.body.has_invitation, res.body.InvitationId, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
				console.log("Successfully signed up!");
				console.log(res.headers.get('x-refresh-token'));

			})
		)



	}

	login(email: string, password: string) {
		return this.webService.loginCollaborator(email, password).pipe(
			shareReplay(),
			tap((res: HttpResponse<any>) => {
				// the auth tokens will be in the header of this response
				this.setSession(res.body._id, res.body.nom, res.body.org, res.body.has_workspace, res.body.workspaceId, res.body.has_invitation, res.body.invitationId, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
				// console.log("LOGGED IN!");
			})
		)

	}

	logout() {
		this.removeSession();
		this.router.navigate(['/login']);
	}

	isLoggedIn() {
		return localStorage.hasOwnProperty('collaborateur-id');
	}

	hasInvitation() {
		return localStorage.hasOwnProperty('invitation-id');
	}

	getInvitationId() {
		return localStorage.getItem('invitation-id');
	}

	getInvitationById(id: string) {
		return this.webService.getInvitationById(id);
	}

	setWorkspace(workspaceId: string) {
		localStorage.removeItem('invitation-id');
		localStorage.setItem('workspace-id', workspaceId);
	}

	hasWorkspace() {
		return localStorage.hasOwnProperty('workspace-id');
	}

	getWorkspaceId() {
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

	getCollaboratorId() {
		return localStorage.getItem('collaborateur-id');
	}

	getCollaboratorName(){
		return localStorage.getItem('collaborateur-name');
	}

	getCollaboratorOrg() {
		return localStorage.getItem('collaborateur-org');
	}

	private setSession(collaborateurId: string, collaborateurName: string, collaborateurOrg: string, hasWorkspace: boolean, collaborateurWorkspace: string, hasInvitation: boolean, collaborateurInvitation: string, accessToken: string, refreshToken: string) {
		localStorage.setItem('collaborateur-id', collaborateurId);
		localStorage.setItem('collaborateur-name', collaborateurName);
		localStorage.setItem('collaborateur-org', collaborateurOrg);
		if (hasWorkspace) {
			localStorage.setItem('workspace-id', collaborateurWorkspace);
		}
		if (hasInvitation) {
			localStorage.setItem('invitation-id', collaborateurInvitation);
		}
		localStorage.setItem('x-access-token', accessToken);
		localStorage.setItem('x-refresh-token', refreshToken);
	}

	private removeSession() {
		localStorage.removeItem('collaborateur-id');
		localStorage.removeItem('collaborateur-name');
		localStorage.removeItem('collaborateur-org');
		localStorage.removeItem('workspace-id');
		localStorage.removeItem('invitation-id');
		localStorage.removeItem('x-access-token');
		localStorage.removeItem('x-refresh-token');
	}

	getNewAccessToken() {
		return this.http.get(`${this.webService.ROOT_URL}/collaborateurs/collaborateur/access-token`, {
			headers: {
				'x-refresh-token': this.getRefreshToken(),
				'_id': this.getCollaboratorId()
			},
			observe: 'response'
		}).pipe(
			tap((res: HttpResponse<any>) => {
				this.setAccessToken(res.headers.get('x-access-token'));
			})
		)
	}

}
