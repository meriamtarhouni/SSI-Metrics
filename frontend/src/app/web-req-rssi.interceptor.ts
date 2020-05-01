import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { AuthRssiService } from './auth-rssi.service';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptorRssi implements HttpInterceptor {
 
  refreshingAccessToken: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();

  constructor(private authService: AuthRssiService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    request = this.addAuthHeader(request);
     // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
           console.log(error);
           if (error.status === 401 && !this.refreshingAccessToken) {
                   
            return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                request = this.addAuthHeader(request);
                return next.handle(request);
              }),
              catchError((err: any) => {
                console.log(err);
                this.authService.logout();
                return empty();
              })
            )
           }
           return throwError(error);
      }
    ))
  
  }
   
  refreshAccessToken() { 
    this.refreshingAccessToken = true;
    return this.authService.getNewAccessToken().pipe(
      tap(() => {
        this.refreshingAccessToken = false;
        console.log("Access Token Refreshed!");
      })
    )
  }

 /* refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.refreshingAccessToken = true;
      // we want to call a method in the auth service to send a request to refresh the access token
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          console.log("Access Token Refreshed!");
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
        })
      )
    }  
  }*/





   addAuthHeader(request: HttpRequest<any>) {
    // get the access token
    const token = this.authService.getAccessToken();

    if (token) {
      // append the access token to the request header
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }

}

