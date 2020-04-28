import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthRssiService {

  constructor(private http : HttpClient, private webService:WebRequestService,private router: Router ) { }

  login(email : string,password :string){
    return this.webService.loginRssi(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("LOGGED IN!");
      })
    )
       
  }

  signUp(nom : string,  raison: string,adresse : string,code : string,email : string,password : string,motivation:string){
    
    return this.webService.signUpRSSI(nom,  raison,adresse,code,email,password,motivation).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("Successfully signed up!");
      })
    )


  }

  getRssiById(rssiId: string)
  {
    return this.webService.getRssiById(rssiId);
  }

  updateRssi(rssiId : string,nom : string,  raison: string,adresse : string,code : string,email : string,motivation:string){

    return this.webService.patch(`rssis/${rssiId}`,{nom,raison,adresse,code,email,motivation});
  }

  deleteRssi(rssiId : string){
      return this.webService.delete(`rssis/${rssiId}`);
  }


  logout(){
    this.removeSession();
    this.router.navigate(['/login-rssi']);
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

  private setSession(rssiId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('rssi-id', rssiId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('rssi-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
  
   
 

}

