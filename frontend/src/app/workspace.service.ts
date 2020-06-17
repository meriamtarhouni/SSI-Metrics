import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class WorkspaceService {

	@Output() sidebarState = new EventEmitter<string>();
	constructor(private http: HttpClient, private webService: WebRequestService) { }

	createWorkspace(nom: string) {
		let rssiId = this.getCurrentRssiId();
		return this.webService.createWorkspace(nom, rssiId).pipe(
			tap((res: any) => {
				this.setWorkSpaceSession(res._id);
				console.log("Workspace created!");
			})
		)
	}

	getWorkSpaceByid(id: string) {
		return this.webService.getWorkSpaceById(id);
	}

	inviteCollab(collabId: string) {
		return this.webService.inviteCollab(collabId);
	}

	acceptInvitation() {
		this.webService.acceptInvitation().subscribe((res) => {
			this.sidebarState.emit('123456789');
		});
	}

	removeCollab(collabId: string) {
		return this.webService.removeCollab(collabId);
	}

	setWorkSpaceSession(workspaceId: string) {
		localStorage.setItem('workspace-id', workspaceId);
	}

	getOrgCollaboratorsRssi(rssiOrg: string) {
		return this.webService.getOrgCollaboratorsRssi(rssiOrg);
	}

	private getCurrentRssiId() {
		return localStorage.getItem('rssi-id');
	}
	removeWorkspaceSession() {

		localStorage.removeItem('workspace-id');
	}

	affectSubtaskCollab(subtaskId: string, collabId: string) {
		return this.webService.patch(`soustaches/${subtaskId}/affect/${collabId}`, {});
	}

}
