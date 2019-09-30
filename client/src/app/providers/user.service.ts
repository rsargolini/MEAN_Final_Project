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

  loginUserId: number = 0;

  private isAuthenticated: boolean = false;
  private isAdmin: boolean = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string)  : Observable<any> {
    return this.http.post(`${this.usersEndpoint}login`, {username : username, password : password}, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }
  
  register(username: string, password: string, email: string) : Observable<any> {
    return this.http.post(`${this.usersEndpoint}register`, { username: username, password: password, email: email }, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }

  updateUser(userId: number, email: string) : Observable<any> {
    return this.http.put(`${this.usersEndpoint}data/${userId}`, { email: email }, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.usersEndpoint}data/${userId}`, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }

  getUsers() : Observable<any> {
    return this.http.get(`${this.usersEndpoint}data`, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }

  getUser(userId: number) : Observable<any> {
    return this.http.get(`${this.usersEndpoint}data/${userId}`, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }

  setAuth(isAuth: boolean): void {
    this.isAuthenticated = isAuth;
  }

  getAuth(): boolean {
    return this.isAuthenticated;
  }

  setAdmin(isAdmin: boolean): void {
    this.isAdmin = isAdmin;
  }

  getAdmin(): boolean {
    return this.isAdmin;
  }
}
