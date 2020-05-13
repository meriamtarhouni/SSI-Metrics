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

  createWorkspace(nom: string, password: string, rssiId: string) {
    return this.http.post(`${this.ROOT_URL}/workspaces`, {
      nom: nom,
      password: password,
      rssiId: rssiId
    });
  }

  loginRssi(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/rssis/login`, {
      email,
      password
    }, {
      observe: 'response'
    });
  }

  signUpRSSI(nom: string, raison: string, adresse: string, org: string, email: string, password: string, motivation: string) {
    return this.http.post(`${this.ROOT_URL}/rssis`, {
      nom,
      raison,
      adresse,
      org,
      email,
      password,
      motivation
    }, {
      observe: 'response'
    });

  }
  
  getRssiById(id: String) {
    return this.http.get(`${this.ROOT_URL}/rssis/${id}`);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }
  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }



  /*Collaborator Methods*/

  loginCollaborator(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/collaborateurs/login`, {
      email,
      password
    }, {
      observe: 'response'
    });
  }

  signUpCollaborator(email: string, password: string, org: string, nom: string, ville: string, pays: string, cp: string, motivation: string) {
    return this.http.post(`${this.ROOT_URL}/collaborateurs`, {
      email,
      password,
      org,
      nom,
      ville,
      pays,
      cp,
      motivation
    }, {
      observe: 'response'
    });
  }

  getCollaboratorById(id: String) {
    return this.http.get(`${this.ROOT_URL}/collaborateurs/${id}`);
  }
  
  getCollaborators() {
    return this.http.get(`${this.ROOT_URL}/collaborateurs`);
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

}
