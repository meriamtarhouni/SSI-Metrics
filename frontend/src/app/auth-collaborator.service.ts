import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthCollaboratorService {

  constructor(private http : HttpClient, private webService:WebRequestService,private router: Router ) { }



  signUp(email : string,password : string){
    return this.webService.signUpCollaborator(email,password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("Successfully signed up!");
      })
    )
 


  }

  login(email : string,password :string){
    return this.webService.loginCollaborator(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
        console.log("LOGGED IN!");
      })
    )
       
  }

  logout(){
    this.removeSession();
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

  private setSession(collaborateurId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('collaborateur-id', collaborateurId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }


  private removeSession() {
    localStorage.removeItem('collaborateur-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
  
}
