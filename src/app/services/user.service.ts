import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8080/user/';
  authUrl = 'http://localhost:8080/auth/';
  loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('role')); // {1}

  constructor(private http: HttpClient) {}

  getAllUSers() {
    return this.http.get<[]>(this.baseUrl);
  }
  login(loginData: any): any {
    return this.http.post<[]>(this.authUrl + 'login', loginData);
  }
  signup(signupData: any): any {
    return this.http.post<[]>(this.authUrl + 'signup', signupData);
  }
  deleteUser(id: any) {
    return this.http.delete(this.baseUrl + id);
  }
}
