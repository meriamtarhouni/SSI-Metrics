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
  

}
