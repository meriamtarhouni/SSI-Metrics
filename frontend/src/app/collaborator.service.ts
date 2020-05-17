import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import {AuthCollaboratorService} from './auth-collaborator.service'
import { AuthRssiService } from 'src/app/auth-rssi.service';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private authRssiService: AuthRssiService, private webService:WebRequestService, private authCollaboratorService : AuthCollaboratorService) { }

  // prendre une tache 
  getCollaboratorById(collaborateurId: string)
  {
    return this.webService.getCollaboratorById(collaborateurId);
  }
  getCollaborators()
  {
    return this.webService.getCollaborators();
  }
  getOrgCollaborators(){
		let rssiId = this.authRssiService.getRssiId();
		return this.webService.getOrgCollaborators(rssiId);
  }

  updateCollaborator(collaborateurId : string,email: string, org :string, nom : string, ville : string, pays : string, cp: string, motivation : string ){

    return this.webService.patch(`collaborateurs/${collaborateurId}`,{email,org,nom,ville,pays,cp,motivation});
  }

  deleteCollaborator(collaborateurId : string){
      return this.webService.delete(`collaborateurs/${collaborateurId}`);
  }

}
