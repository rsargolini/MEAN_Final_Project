import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersEndpoint: string = 'http://localhost:3000/users/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private authenticated: boolean = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(`${this.usersEndpoint}login`, {username : username, password : password}, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }
  
  register(username: string, password: string, email: string) {
    return this.http.post(`${this.usersEndpoint}register`, { username: username, password: password, email: email }, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }

  setAuthStatus(status: boolean) {
    this.authenticated = status;
  }
}
