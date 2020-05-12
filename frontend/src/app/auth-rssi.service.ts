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
        // console.log("LOGGED IN!");
		// console.log(res.body._id);
      })
    )
       
  }

  signUp(nom : string,  raison: string,adresse : string,org : string,email : string,password : string,motivation:string){
    
    return this.webService.signUpRSSI(nom,  raison,adresse,org,email,password,motivation).pipe(
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

  updateRssi(rssiId : string,nom : string,  raison: string,adresse : string,org : string,email : string,motivation:string){

    return this.webService.patch(`rssis/${rssiId}`,{nom,raison,adresse,org,email,motivation});
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

  getRssiId() {
    return localStorage.getItem('rssi-id');
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

  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/rssis/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        'rssi-id': this.getRssiId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }
  
   
 

}

