import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';
@Injectable({
  providedIn: 'root'
})
export class SubTaskService {

  constructor(private webReqService : WebRequestService) { }

  getToDoSubTasks(phaseId : string){
    return this.webReqService.get(`sousTaches/${phaseId}/pas_mis_en_oeuvre`);
  }
  getInProgressSubTasks(phaseId : string){
    return this.webReqService.get(`sousTaches/${phaseId}/en_cours`);
  }
  getDoneSubTasks(phaseId : string){
    return this.webReqService.get(`sousTaches/${phaseId}/termine`);
  }
  getTacheById(tacheId){
    return this.webReqService.get(`sousTaches/tache/${tacheId}/`);
  }
   getExigenceById(exigenceId){
     return this.webReqService.get(`sousTaches/exigence/${exigenceId}/`);
   }

   getCollaborateurById(collaborateurId){
    return this.webReqService.get(`sousTaches/collaborateur/${collaborateurId}/`);
  }



}
