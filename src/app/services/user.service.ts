import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8080/user/';
  constructor(private http: HttpClient) {}

  getAllUSers() {
    return this.http.get<[]>(this.baseUrl);
  }
}
