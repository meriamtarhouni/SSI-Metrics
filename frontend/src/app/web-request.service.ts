import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collaborateur } from './models/collaborateur.model';

@Injectable({
	providedIn: 'root'
})
export class WebRequestService {
	readonly ROOT_URL;
	constructor(private http: HttpClient) {
		this.ROOT_URL = 'http://localhost:3000';
	}


	/*WorkSpace Methods */
	createWorkspace(nom: string, rssiId: string) {
		return this.http.post(`${this.ROOT_URL}/workspaces`, {
			nom: nom,
			rssiId: rssiId
		});
	}
	getWorkSpaceById(id: String) {
		return this.http.get(`${this.ROOT_URL}/workspaces/${id}`);
	}

	getInvitationById(id: string) {
		return this.http.get(`${this.ROOT_URL}/invitations/${id}`);
	}

	inviteCollab(collabId: string) {
		console.log("Inviting collab: " + collabId);
		return this.http.post(`${this.ROOT_URL}/rssis/invite/${collabId}`, {});
	}

	acceptInvitation() {
		console.log("Accepting invitation");
		return this.http.patch(`${this.ROOT_URL}/accept_invitation`, {});
	}

	removeCollab(collabId: string) {
		return this.http.patch(`${this.ROOT_URL}/rssis/remove_collaborator/${collabId}`, {});
	}

	/* Rssi Methods */
	loginRssi(email: string, password: string) {
		return this.http.post(`${this.ROOT_URL}/rssis/login`, {
			email,
			password
		}, {
			observe: 'response'
		});
	}

	signUpRSSI(nom: string, raison: string, adresse: string, org: string, email: string, password: string, motivation: string) {
		return this.http.post(`${this.ROOT_URL}/rssis`, {
			nom,
			raison,
			adresse,
			org,
			email,
			password,
			motivation
		}, {
			observe: 'response'
		});

	}

	getRssiById(id: String) {
		return this.http.get(`${this.ROOT_URL}/rssis/${id}`);
	}

	patch(uri: string, payload: Object) {
		return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
	}
	delete(uri: string) {
		return this.http.delete(`${this.ROOT_URL}/${uri}`);
	}

	hasWorkSpace(id: String) {
		return this.http.get(`${this.ROOT_URL}/rssis/${id}/workspace`);
	}


	/*Collaborator Methods*/

	loginCollaborator(email: string, password: string) {
		return this.http.post(`${this.ROOT_URL}/collaborateurs/login`, {
			email,
			password
		}, {
			observe: 'response'
		});
	}

	signUpCollaborator(email: string, password: string, org: string, nom: string, ville: string, pays: string, cp: string, motivation: string) {
		return this.http.post(`${this.ROOT_URL}/collaborateurs`, {
			email,
			password,
			org,
			nom,
			ville,
			pays,
			cp,
			motivation
		}, {
			observe: 'response'
		});
	}

	getCollaboratorByIdRssi(id: String) {
		return this.http.get(`${this.ROOT_URL}/collaborateurs/${id}/rssi`);
	}
	getCollaboratorById(id: String) {
		return this.http.get(`${this.ROOT_URL}/collaborateurs/${id}`);
	}

	getCollaborators() {
		return this.http.get(`${this.ROOT_URL}/collaborateurs`);
	}

	getOrgCollaborators(collabOrg: string) {
		return this.http.get(`${this.ROOT_URL}/collaborateurs/org/${collabOrg}`);
	}

	getOrgCollaboratorsRssi(rssiOrg: string) {
		return this.http.get(`${this.ROOT_URL}/collaborateurs/org/rssi/${rssiOrg}`);
	}


	updateSubTaskStatus(subTaskId: string, status: string) {
		console.log('statussssss =', status);
		return this.http.patch(`${this.ROOT_URL}/sousTache/${subTaskId}`, { status });
	}

	get(uri: string) {
		return this.http.get(`${this.ROOT_URL}/${uri}`);
	}


}
