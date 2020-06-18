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
	constructor(private http: HttpClient, private webRequestService: WebRequestService) { }

	createWorkspace(nom: string) {
		let rssiId = this.getCurrentRssiId();
		return this.webRequestService.createWorkspace(nom, rssiId).pipe(
			tap((res: any) => {
				this.setWorkSpaceSession(res._id);
				this.sidebarState.emit('123456789');
				console.log("Workspace created!");
			})
		)
	}

	getWorkSpaceByid(id: string) {
		return this.webRequestService.getWorkSpaceById(id);
	}

	inviteCollab(collabId: string) {
		return this.webRequestService.inviteCollab(collabId);
	}

	acceptInvitation() {
		this.webRequestService.acceptInvitation().subscribe((res) => {
			this.sidebarState.emit('123456789');
		});
	}

	removeCollab(collabId: string) {
		return this.webRequestService.removeCollab(collabId);
	}

	setWorkSpaceSession(workspaceId: string) {
		localStorage.setItem('workspace-id', workspaceId);
	}

	getOrgCollaboratorsRssi(rssiOrg: string) {
		return this.webRequestService.getOrgCollaboratorsRssi(rssiOrg);
	}

	private getCurrentRssiId() {
		return localStorage.getItem('rssi-id');
	}
	removeWorkspaceSession() {

		localStorage.removeItem('workspace-id');
	}

	affectSubtaskCollab(subtaskId: string, stDate:string, enDate:string, collabId: string) {
		return this.webRequestService.patch(`soustaches/${subtaskId}/affect/${collabId}`, {stDate, enDate});
	}

}
