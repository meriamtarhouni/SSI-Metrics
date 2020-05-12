import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

	constructor(private authRssiService: AuthRssiService, private http : HttpClient, private webService:WebRequestService) { }

	createWorkspace(nom: string, password: string){
		let rssiId = this.authRssiService.getRssiId();
		return this.webService.createWorkspace(nom, password, rssiId).pipe(
			tap((res: HttpResponse<any>) => {
				console.log("Workspace created!");
			})
		)
	}
}
