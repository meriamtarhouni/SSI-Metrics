import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
      this.ROOT_URL = 'http://localhost:3000';
   }


   /*RSSI Methods*/

   loginRssi(email: string,password: string)
   {
    return this.http.post(`${this.ROOT_URL}/rssis/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
   }
   signUpRSSI(nom : string,  raison: string,adresse : string,code : string,email : string,password : string,motivation:string){
    return this.http.post(`${this.ROOT_URL}/rssis`, {
      nom,
      raison,
      adresse,
      code,
      email,
      password,
      motivation
    }, {
        observe: 'response'
      });
  
   }
   getRssiById(id :String) {
    return this.http.get(`${this.ROOT_URL}/rssis/${id}`);
   }

    patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
    }




}
