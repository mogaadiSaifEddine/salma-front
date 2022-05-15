import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8080/user/';
  loginUrl = 'http://localhost:8080/auth/login';
  constructor(private http: HttpClient) {}

  getAllUSers() {
    return this.http.get<[]>(this.baseUrl);
  }
  login(loginData: any): any {
    return this.http.post<[]>(this.loginUrl, loginData);
  }
}
