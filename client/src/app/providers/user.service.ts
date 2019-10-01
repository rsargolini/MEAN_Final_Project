// Imports
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

  // Post Login (Username and Password) 
  login(username: string, password: string)  : Observable<any> {
    return this.http.post(`${this.usersEndpoint}login`, {username : username, password : password}, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }
  
  // Post Register (Username, Password and Email) 
  register(username: string, password: string, email: string) : Observable<any> {
    return this.http.post(`${this.usersEndpoint}register`, { username: username, password: password, email: email }, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }

  // Put Update User Profile (User Id and Email) 
  updateUser(userId: number, email: string) : Observable<any> {
    return this.http.put(`${this.usersEndpoint}data/${userId}`, { email: email }, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }

  // Delete One User Profile by User Id 
  deleteUser(userId: number) {
    return this.http.delete(`${this.usersEndpoint}data/${userId}`, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }

  // Get All Users 
  getUsers() : Observable<any> {
    return this.http.get(`${this.usersEndpoint}data`, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }

  // Get One User by User Id 
  getUser(userId: number) : Observable<any> {
    return this.http.get(`${this.usersEndpoint}data/${userId}`, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }

  // Set User Authentication Status 
  setAuth(isAuth: boolean): void {
    this.isAuthenticated = isAuth;
  }

  // Get User Authentication Status 
  getAuth(): boolean {
    return this.isAuthenticated;
  }

  // Set User Admin Status 
  setAdmin(isAdmin: boolean): void {
    this.isAdmin = isAdmin;
  }

  // Get User Admin Status 
  getAdmin(): boolean {
    return this.isAdmin;
  }
}
