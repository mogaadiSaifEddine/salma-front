import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjetService {
  baseUrl = 'http://localhost:8080/p/';
  constructor(private http: HttpClient) {}
  getAllProjets() {
    return this.http.get<[]>('http://localhost:8080/p/show');
  }
  updateuation(id: number, uation: any) {
    return this.http.put<any>(`${this.baseUrl}update/${id}`, uation);
  }
  deleteProjet(id: number) {
    return this.http.delete<any>(`${this.baseUrl}Delete/${id}`);
  }
  addProjet(projet: any) {
    console.log(projet);
    projet.ISPDefultNames = [1];

    return this.http.post<any>(`${this.baseUrl}add`, projet);
  }
  updateProjet(id: number, projet: any) {
    return this.http.put<any>(`${this.baseUrl}update/${id}`, projet);
  }
  getUSers() {
    return this.http.get<[]>(`${this.baseUrl}users`);
  }
}
