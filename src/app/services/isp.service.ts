import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ISPService {
  baseUrl = 'http://localhost:8080/p/';
  constructor(private http: HttpClient) {}

  getNamesIspByProject(id?: number) {
    return this.http.get<[]>(`${this.baseUrl + id}`);
  }
}
