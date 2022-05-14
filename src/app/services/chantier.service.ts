import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChantierService {
  baseUrl = `${environment.baseUrl}chantier/`;
  constructor(private http: HttpClient) {}
  getAllChant() {
    return this.http.get<[]>('http://localhost:8080/chantier/show');
  }
  updateuation(id: number, uation: any) {
    return this.http.put<any>(`${this.baseUrl}update/${id}`, uation);
  }
  deleteuation(id: number) {
    return this.http.delete<any>(`${this.baseUrl}delete/${id}`);
  }
  adduation(id: number, uation: any) {
    console.log(id);

    return this.http.post<any>(`${this.baseUrl}add/${id}`, uation);
  }
  getUSers() {
    return this.http.get<[]>(`${this.baseUrl}users`);
  }
}
