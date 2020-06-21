import { Injectable } from '@angular/core';
import { WebRequestService } from '../web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ExigenceService {

  constructor(private webReqService : WebRequestService) {}
  
  getExigences(phaseId : string){
   
    return this.webReqService.get(`phases/${phaseId}/exigences`);
    
  }
 
  getTasks(exigenceId : string){
    return this.webReqService.get(`exigences/${exigenceId}/taches`);
  }
  
  getSubTasks(taskId : string){
    return this.webReqService.get(`taches/${taskId}/sousTaches`);
  }

  resetSubTaskStatus(subTaskId : string, status : string){

    return this.webReqService.resetSubTaskStatusRssi(subTaskId,status);
  }

}
